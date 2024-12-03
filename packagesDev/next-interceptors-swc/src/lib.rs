use serde::Deserialize;
use std::collections::HashMap;
use std::env;
use std::path::{Path, PathBuf};
use swc_core::common::{input::SourceFileInput, sync::Lrc, FileName, SourceMap};
use swc_core::ecma::{
    ast::*,
    atoms::JsWord,
    parser::{Parser, Syntax, TsSyntax},
    visit::{Fold, FoldWith},
};
use swc_core::plugin::{plugin_transform, proxies::TransformPluginProgramMetadata};

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Config {
    module_suffixes: Option<Vec<String>>,
    workspace_root: Option<String>,
    package_mapping: Option<HashMap<String, String>>,
}

struct SourceResolver {
    resolved_cache: HashMap<String, PathBuf>,
    ast_cache: HashMap<PathBuf, Module>,
    workspace_root: PathBuf,
    source_map: Lrc<SourceMap>,
    package_mapping: HashMap<String, PathBuf>,
}

impl SourceResolver {
    fn new(workspace_root: PathBuf, package_mapping: Option<HashMap<String, String>>) -> Self {
        eprintln!(
            "🔍 Initializing SourceResolver with workspace root: {}",
            workspace_root.display()
        );

        // Convert the string paths in package_mapping to PathBuf
        let package_mapping = package_mapping
            .unwrap_or_default()
            .into_iter()
            .map(|(k, v)| (k, workspace_root.join(v)))
            .collect();

        Self {
            resolved_cache: HashMap::new(),
            ast_cache: HashMap::new(),
            workspace_root,
            source_map: Default::default(),
            package_mapping,
        }
    }

    fn resolve_import(&mut self, import_path: &str, current_file: &Path) -> Option<PathBuf> {
        // Check cache first
        if let Some(cached) = self.resolved_cache.get(import_path) {
            return Some(cached.clone());
        }

        let resolved = if import_path.starts_with('@') {
            self.resolve_package_import(import_path)
        } else {
            self.resolve_relative_import(import_path, current_file)
        }?;

        // Cache the result
        self.resolved_cache
            .insert(import_path.to_string(), resolved.clone());
        Some(resolved)
    }

    fn resolve_relative_import(
        &mut self,
        import_path: &str,
        current_file: &Path,
    ) -> Option<PathBuf> {
        let current_dir = current_file.parent()?;
        let source_path = current_dir.join(import_path);

        // First try direct interceptor
        let possible_paths = vec![
            source_path.with_extension("ts"),
            source_path.with_extension("tsx"),
        ];

        for path in &possible_paths {
            let interceptor_path = path.with_extension(format!(
                "interceptor.{}",
                path.extension().unwrap_or_default().to_string_lossy()
            ));

            if interceptor_path.exists() {
                eprintln!("✅ Found interceptor at: {}", interceptor_path.display());
                return Some(interceptor_path);
            }
        }

        // If no direct interceptor, follow the export chain
        self.find_interceptor_in_exports(current_file)
    }

    fn resolve_package_import(&self, import_path: &str) -> Option<PathBuf> {
        // First try to find the package in our mapping
        if let Some(base_path) = self.package_mapping.get(import_path) {
            eprintln!(
                "📦 Found package mapping for {}: {}",
                import_path,
                base_path.display()
            );
            return Some(base_path.clone());
        }

        // Fallback to workspace root resolution
        let package_path = self
            .workspace_root
            .join(import_path.trim_start_matches('@'));
        if package_path.exists() {
            eprintln!("📦 Found package in workspace: {}", package_path.display());
            Some(package_path)
        } else {
            eprintln!("❌ Package not found: {}", import_path);
            None
        }
    }

    fn parse_and_cache_ast(&mut self, file_path: &Path) -> Option<&Module> {
        if !self.ast_cache.contains_key(file_path) {
            let source = std::fs::read_to_string(file_path).ok()?;
            let source_file = self
                .source_map
                .new_source_file(Lrc::new(FileName::Real(file_path.to_path_buf())), source);

            let mut parser = Parser::new(
                Syntax::Typescript(TsSyntax {
                    tsx: true,
                    ..Default::default()
                }),
                SourceFileInput::from(&*source_file),
                None,
            );

            match parser.parse_module() {
                Ok(module) => {
                    self.ast_cache.insert(file_path.to_path_buf(), module);
                }
                Err(err) => {
                    eprintln!("Failed to parse {}: {:?}", file_path.display(), err);
                    return None;
                }
            }
        }
        self.ast_cache.get(file_path)
    }

    fn find_interceptor_in_exports(&mut self, current_file: &Path) -> Option<PathBuf> {
        let module = self.parse_and_cache_ast(current_file)?;
        let mut export_paths = Vec::new();

        // Collect all export paths first
        for item in &module.body {
            if let ModuleItem::ModuleDecl(ModuleDecl::ExportAll(export_all)) = item {
                let source = export_all.src.value.to_string();
                let current_dir = current_file.parent()?;
                let new_path = current_dir.join(&source);
                export_paths.push((source, new_path));
            }
        }

        // Then process them
        for (source, new_path) in export_paths {
            if let Some(resolved) = self.resolve_relative_import(&source, &new_path) {
                return Some(resolved);
            }
        }

        None
    }
}

pub struct InterceptorPlugin {
    config: Config,
    source_file: Option<PathBuf>,
    resolver: Option<SourceResolver>,
}

impl InterceptorPlugin {
    fn new(config: Config, metadata: TransformPluginProgramMetadata) -> Self {
        let source_file = metadata.source_map.source_file.get().map(|f| {
            let path = PathBuf::from(f.name.to_string());
            eprintln!("🔍 Processing file: {}", path.display());
            path
        });

        let workspace_root = config
            .workspace_root
            .clone()
            .map(PathBuf::from)
            .or_else(|| {
                source_file.as_ref().and_then(|f| {
                    f.ancestors()
                        .find(|p| p.join("package.json").exists())
                        .map(|p| p.to_path_buf())
                })
            })
            .or_else(|| {
                env::current_dir().ok().and_then(|cwd| {
                    eprintln!(
                        "🔍 Using current working directory as workspace root: {}",
                        cwd.display()
                    );
                    Some(cwd)
                })
            });

        let resolver = workspace_root.map(|root| SourceResolver::new(root, config.package_mapping));

        if resolver.is_none() {
            eprintln!("⚠️ Could not initialize SourceResolver: workspace root not found");
        }

        Self {
            config,
            source_file,
            resolver,
        }
    }

    fn try_resolve_import(&mut self, source: &str) -> Option<String> {
        eprintln!("🔍 Resolving import: {}", source);

        // Don't transform imports that are already interceptors
        if source.contains(".interceptor") {
            eprintln!("❌ Already contains .interceptor");
            return None;
        }

        let source_file = self.source_file.as_ref()?;
        let resolver = self.resolver.as_mut()?;

        if let Some(resolved) = resolver.resolve_import(source, source_file) {
            eprintln!("✅ Resolved to: {}", resolved.display());

            // Get the first suffix from the config (usually ".interceptor")
            if let Some(suffixes) = &self.config.module_suffixes {
                if let Some(suffix) = suffixes.first() {
                    return Some(format!("{}{}", source, suffix));
                }
            }
        }

        None
    }
}

impl Fold for InterceptorPlugin {
    fn fold_import_decl(&mut self, mut import: ImportDecl) -> ImportDecl {
        let source = import.src.value.to_string();
        eprintln!("🔍 Import source: {}", source);

        if let Some(resolved_path) = self.try_resolve_import(&source) {
            eprintln!("✅ Transformed to: {}", resolved_path);
            import.src.value = JsWord::from(resolved_path);
        }
        import
    }

    fn fold_call_expr(&mut self, mut call: CallExpr) -> CallExpr {
        // Handle dynamic imports
        if let Callee::Import(_) = call.callee {
            if let Some(arg) = call.args.first_mut() {
                if let Expr::Lit(Lit::Str(str_lit)) = &mut *arg.expr {
                    let source = str_lit.value.to_string();
                    eprintln!("🔍 Dynamic import source: {}", source);

                    if let Some(resolved_path) = self.try_resolve_import(&source) {
                        eprintln!("✅ Transformed to: {}", resolved_path);
                        str_lit.value = JsWord::from(resolved_path);
                    }
                }
            }
        }
        call
    }
}

#[plugin_transform]
pub fn process_transform(program: Program, metadata: TransformPluginProgramMetadata) -> Program {
    let config = serde_json::from_str::<Config>(
        &metadata
            .get_transform_plugin_config()
            .unwrap_or_else(|| r#"{"moduleSuffixes":[".interceptor"],"packageMapping":{}}"#.into()),
    )
    .unwrap_or_else(|e| panic!("Configuration error: Failed to parse plugin config - {}. Please ensure your Next.js config has a valid moduleSuffixes array.", e));

    program.fold_with(&mut InterceptorPlugin::new(config, metadata))
}

#[cfg(test)]
mod tests {
    use super::*;
    use swc_core::ecma::transforms::testing::test_inline;

    #[testing::fixture("tests/fixture/**/input.js")]
    fn test_fixture(input: String) -> String {
        let config = Config {
            module_suffixes: Some(vec![".interceptor".to_string()]),
            workspace_root: None,
            package_mapping: None,
        };
        test_inline(
            &input,
            None,
            |metadata| InterceptorPlugin::new(config.clone(), metadata),
            false,
        )
    }
}
