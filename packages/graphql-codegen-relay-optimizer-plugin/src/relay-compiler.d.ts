declare module "relay-compiler/lib/GraphQLIR" {
  import {
    Source,
    GraphQLInputType,
    GraphQLOutputType,
    GraphQLCompositeType,
    GraphQLLeafType,
    GraphQLList,
    GraphQLNonNull
  } from "graphql";

  export type Metadata = { [key: string]: unknown } | undefined;

  export interface SourceLocation {
    kind: "Source";
    start: number;
    end: number;
    source: Source;
  }

  export interface GeneratedLocation {
    kind: "Generated";
  }

  export interface DerivedLocation {
    kind: "Derived";
    source: Location;
  }
  export interface UnknownLocation {
    kind: "Unknown";
  }

  export type Location =
    | SourceLocation
    | GeneratedLocation
    | DerivedLocation
    | UnknownLocation;

  export interface Argument {
    kind: "Argument";
    loc: Location;
    metadata: Metadata;
    name: string;
    type?: GraphQLInputType;
    value: ArgumentValue;
  }

  export type ArgumentDefinition =
    | LocalArgumentDefinition
    | RootArgumentDefinition;

  export type ArgumentValue = ListValue | Literal | ObjectValue | Variable;

  export interface Condition {
    condition: Literal | Variable;
    kind: "Condition";
    loc: Location;
    metadata: Metadata;
    passingValue: boolean;
    selections: ReadonlyArray<Selection>;
  }

  export interface Directive {
    args: ReadonlyArray<Argument>;
    kind: "Directive";
    loc: Location;
    metadata: Metadata;
    name: string;
  }

  export type Field = LinkedField | ScalarField | ConnectionField;

  export interface Fragment {
    argumentDefinitions: ReadonlyArray<ArgumentDefinition>;
    directives: ReadonlyArray<Directive>;
    kind: "Fragment";
    loc: Location;
    metadata: Metadata;
    name: string;
    selections: ReadonlyArray<Selection>;
    type: GraphQLCompositeType;
  }

  export interface FragmentSpread {
    args: ReadonlyArray<Argument>;
    directives: ReadonlyArray<Directive>;
    kind: "FragmentSpread";
    loc: Location;
    metadata: Metadata;
    name: string;
  }

  export interface Defer {
    kind: "Defer";
    loc: Location;
    metadata: Metadata;
    selections: ReadonlyArray<Selection>;
    label: string;
    if: ArgumentValue | null;
  }

  export interface Stream {
    kind: "Stream";
    loc: Location;
    metadata: Metadata;
    selections: ReadonlyArray<Selection>;
    label: string;
    if: ArgumentValue | null;
    initialCount: ArgumentValue;
  }

  export interface InlineDataFragmentSpread {
    kind: "InlineDataFragmentSpread";
    loc: Location;
    metadata: Metadata;
    name: string;
    selections: ReadonlyArray<Selection>;
  }

  export type IR =
    | Argument
    | ClientExtension
    | Condition
    | Defer
    | ConnectionField
    | Directive
    | Fragment
    | FragmentSpread
    | InlineFragment
    | LinkedField
    | ListValue
    | Literal
    | LocalArgumentDefinition
    | ModuleImport
    | ObjectFieldValue
    | ObjectValue
    | Request
    | Root
    | RootArgumentDefinition
    | ScalarField
    | SplitOperation
    | Stream
    | InlineDataFragmentSpread
    | Variable;

  export interface RootArgumentDefinition {
    kind: "RootArgumentDefinition";
    loc: Location;
    metadata: Metadata;
    name: string;
    type: GraphQLInputType;
  }

  export interface InlineFragment {
    directives: ReadonlyArray<Directive>;
    kind: "InlineFragment";
    loc: Location;
    metadata: Metadata;
    selections: ReadonlyArray<Selection>;
    typeCondition: GraphQLCompositeType;
  }

  export type Handle = {
    name: string;
    key: string;
    dynamicKey: Variable | null;
    filters?: Readonly<string>;
  };

  export interface ClientExtension {
    kind: "ClientExtension";
    loc: Location;
    metadata: Metadata;
    selections: ReadonlyArray<Selection>;
  }

  export interface ConnectionField {
    alias: string;
    args: ReadonlyArray<Argument>;
    directives: ReadonlyArray<Directive>;
    kind: "ConnectionField";
    label: string;
    loc: Location;
    metadata: Metadata;
    name: string;
    resolver: string;
    selections: ReadonlyArray<Selection>;
    type: GraphQLOutputType;
  }

  export interface LinkedField {
    alias: string;
    args: ReadonlyArray<Argument>;
    directives: ReadonlyArray<Directive>;
    handles?: ReadonlyArray<Handle>;
    kind: "LinkedField";
    loc: Location;
    metadata: Metadata;
    name: string;
    selections: ReadonlyArray<Selection>;
    type: GraphQLOutputType;
  }

  export interface ListValue {
    kind: "ListValue";
    items: ReadonlyArray<ArgumentValue>;
    loc: Location;
    metadata: Metadata;
  }

  export interface Literal {
    kind: "Literal";
    loc: Location;
    metadata: Metadata;
    value: unknown;
  }

  export interface LocalArgumentDefinition {
    defaultValue: unknown;
    kind: "LocalArgumentDefinition";
    loc: Location;
    metadata: Metadata;
    name: string;
    type: GraphQLInputType;
  }

  export interface ModuleImport {
    kind: "ModuleImport";
    loc: Location;
    documentName: string;
    module: string;
    id: string;
    name: string;
    selections: ReadonlyArray<Selection>;
  }

  export type Node =
    | ClientExtension
    | Condition
    | Defer
    | ConnectionField
    | Fragment
    | InlineDataFragmentSpread
    | InlineFragment
    | LinkedField
    | ModuleImport
    | Root
    | SplitOperation
    | Stream;

  export interface ObjectFieldValue {
    kind: "ObjectFieldValue";
    loc: Location;
    metadata: Metadata;
    name: string;
    value: ArgumentValue;
  }

  export interface ObjectValue {
    kind: "ObjectValue";
    fields: ReadonlyArray<ObjectFieldValue>;
    loc: Location;
    metadata: Metadata;
  }

  export interface Request {
    kind: "Request";
    fragment: Fragment;
    id?: string;
    loc: Location;
    metadata: Metadata;
    name: string;
    root: Root;
    text?: string;
  }

  export interface Root {
    argumentDefinitions: Readonly<LocalArgumentDefinition>;
    directives: Readonly<Directive>;
    kind: "Root";
    loc: Location;
    metadata: Metadata;
    name: string;
    operation: "query" | "mutation" | "subscription";
    selections: Readonly<Selection>;
    type: GraphQLCompositeType;
  }

  // workaround for circular reference
  export interface ScalarFieldTypeGraphQLList
    extends GraphQLList<ScalarFieldType> {}

  export type ScalarFieldType =
    | GraphQLLeafType
    | ScalarFieldTypeGraphQLList
    | GraphQLNonNull<GraphQLLeafType | ScalarFieldTypeGraphQLList>;

  export interface ScalarField {
    alias: string;
    args: ReadonlyArray<Argument>;
    directives: ReadonlyArray<Directive>;
    handles?: ReadonlyArray<Handle>;
    kind: "ScalarField";
    loc: Location;
    metadata: Metadata;
    name: string;
    type: ScalarFieldType;
  }

  export type Selection =
    | ClientExtension
    | Condition
    | Defer
    | ConnectionField
    | FragmentSpread
    | InlineFragment
    | LinkedField
    | ModuleImport
    | ScalarField
    | InlineDataFragmentSpread
    | Stream;

  export type Definition = Fragment | Root | SplitOperation;
  export type GeneratedDefinition = Fragment | Request | SplitOperation;

  export interface SplitOperation {
    kind: "SplitOperation";
    name: string;
    selections: ReadonlyArray<Selection>;
    loc: Location;
    metadata: Metadata;
    type: GraphQLCompositeType;
  }

  export interface Variable {
    kind: "Variable";
    loc: Location;
    metadata: Metadata;
    variableName: string;
    type?: GraphQLInputType;
  }
}

declare module "relay-compiler/lib/GraphQLCompilerContext" {
  import { GraphQLSchema } from "graphql";
  import {
    Root,
    Fragment,
    SplitOperation,
    Location
  } from "relay-compiler/lib/GraphQLIR";
  import { GraphQLReporter } from "relay-compiler/lib/GraphQLReporter";

  export type IRTransform = (
    context: GraphQLCompilerContext
  ) => GraphQLCompilerContext;
  export type IRValidation = (contect: GraphQLCompilerContext) => void;

  export type CompilerContextDocument = Fragment | Root | SplitOperation;

  export class GraphQLCompilerContext {
    constructor(serverSchema: GraphQLSchema, clientSchema?: GraphQLSchema);
    documents(): ReadonlyArray<CompilerContextDocument>;
    forEachDocument(fn: (doc: CompilerContextDocument) => void): void;
    replace(node: CompilerContextDocument): GraphQLCompilerContext;
    add(node: CompilerContextDocument): GraphQLCompilerContext;
    addAll(
      nodes: ReadonlyArray<CompilerContextDocument>
    ): GraphQLCompilerContext;
    applyTransforms(
      transforms: ReadonlyArray<IRTransform>,
      reporter?: GraphQLReporter
    ): GraphQLCompilerContext;
    applyTransform(
      transform: IRTransform,
      reporter?: GraphQLReporter
    ): GraphQLCompilerContext;
    applyValidations(
      validations: ReadonlyArray<IRValidation>,
      reporter?: GraphQLReporter
    ): void;
    get(name: string): CompilerContextDocument | undefined;
    getFragment(name: string, referencedFrom?: Location): Fragment;
    getRoot(name: string): Root;
    remove(name: string): GraphQLCompilerContext;
    withMutations(
      fn: (context: GraphQLCompilerContext) => GraphQLCompilerContext
    ): GraphQLCompilerContext;
  }
}

declare module "relay-compiler" {
  import { GraphQLCompilerContext } from "relay-compiler/lib/GraphQLCompilerContext";
  import { transformASTSchema } from "relay-compiler/lib/ASTConvert";
  import * as Parser from "relay-compiler/lib/RelayParser";
  import * as Printer from "relay-compiler/lib/GraphQLIRPrinter";
  import ConsoleReporter from "relay-compiler/lib/GraphQLConsoleReporter";
  import MultiReporter from "relay-compiler/lib/GraphQLMultiReporter";

  export {
    GraphQLCompilerContext,
    transformASTSchema,
    Parser,
    Printer,
    ConsoleReporter,
    MultiReporter
  };
}

declare module "relay-compiler/lib/RelayParser" {
  import { GraphQLSchema, DefinitionNode } from "graphql";
  import { Root, Fragment } from "relay-compiler/lib/GraphQLIR";

  export function parse(
    schema: GraphQLSchema,
    text: string,
    filename?: string
  ): ReadonlyArray<Root | Fragment>;

  export function transform(
    schema: GraphQLSchema,
    documents: DefinitionNode[]
  ): ReadonlyArray<Root | Fragment>;
}

declare module "relay-compiler/lib/ASTConvert" {
  import { GraphQLSchema } from "graphql";
  export function transformASTSchema(
    schema: GraphQLSchema,
    transforms: string[]
  ): GraphQLSchema;
}

declare module "relay-compiler/lib/InlineFragmentsTransform" {
  import { GraphQLCompilerContext } from "relay-compiler";

  export function transform(
    context: GraphQLCompilerContext
  ): GraphQLCompilerContext;
}

declare module "relay-compiler/lib/SkipRedundantNodesTransform" {
  import { GraphQLCompilerContext } from "relay-compiler";

  export function transform(
    context: GraphQLCompilerContext
  ): GraphQLCompilerContext;
}

declare module "relay-compiler/lib/RelayApplyFragmentArgumentTransform" {
  import { GraphQLCompilerContext } from "relay-compiler";

  export function transform(
    context: GraphQLCompilerContext
  ): GraphQLCompilerContext;
}

declare module "relay-compiler/lib/FlattenTransform" {
  import { GraphQLCompilerContext } from "relay-compiler";

  export type FlattenOptions = {
    flattenAbstractTypes?: boolean;
  };

  export function transformWithOptions(
    options: FlattenOptions
  ): (context: GraphQLCompilerContext) => GraphQLCompilerContext;
}

declare module "relay-compiler/lib/GraphQLIRPrinter" {
  import { CompilerContextDocument } from "relay-compiler/lib/GraphQLCompilerContext";
  export function print(node: CompilerContextDocument): string;
}

declare module "relay-compiler/lib/GraphQLReporter" {
  export interface GraphQLReporter {
    reportMessage(message: string): void;
    reportTime(name: string, ms: number): void;
    reportError(caughtLocation: string, error: Error): void;
  }
}

declare module "relay-compiler/lib/GraphQLMultiReporter" {
  import { GraphQLReporter } from "relay-compiler/lib/GraphQLReporter";
  export default class GraphQLMultiReporter implements GraphQLReporter {
    reportMessage(message: string): void;
    reportTime(name: string, ms: number): void;
    reportError(caughtLocation: string, error: Error): void;
  }
}

declare module "relay-compiler/lib/GraphQLConsoleReporter" {
  import { GraphQLReporter } from "relay-compiler/lib/GraphQLReporter";
  export default class GraphQLMultiReporter implements GraphQLReporter {
    reportMessage(message: string): void;
    reportTime(name: string, ms: number): void;
    reportError(caughtLocation: string, error: Error): void;
  }
}
