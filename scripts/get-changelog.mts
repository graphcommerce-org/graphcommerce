#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { getPackages } from '@manypkg/get-packages'
import { Link, ListItem, Paragraph, PhrasingContent, Root } from 'mdast'
import { toString } from 'mdast-util-to-string'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

const versionArg = process.argv[2]

const processor = unified().use(remarkParse).use(remarkGfm).use(remarkStringify, {
  bullet: '-',
  fences: true,
  listItemIndent: 'one',
  rule: '-',
  tightDefinitions: true,
})

/**
 * Please run this script from the root:
 *
 * ```bash
 * node scripts/get-changelog.mts 9.0.0
 * ```
 *
 * It outputs a RELEASE.md file in the root.
 */
if (!versionArg) {
  console.error('Please provide a version number. Example: node scripts/get-changelog.mts 9.0.0')
  process.exit(1)
}

function getInnerText(node: PhrasingContent): string {
  if (node.type !== 'link') throw Error(`Not a link: ${node.type}`)
  const allLinks = node.children.map((child) => processor.stringify(child as unknown as Root))
  return allLinks.join(' ')
}

type ChangeType = 'major' | 'minor' | 'patch'
type Changes = Record<ChangeType, Array<{ item: ListItem; package: string }>>
type AllChanges = Record<ChangeType, Map<string, { item: ListItem; packages: Set<string> }>>

function transformListItem(listItem: ListItem, packageNames: string[]): ListItem {
  if (!listItem.children.length) return listItem

  const packageRefs = packageNames.map((pkg) => ({
    type: 'link' as const,
    url: `#package-${pkg.replace('@graphcommerce/', '')}`,
    children: [{ type: 'text' as const, value: pkg.replace('@graphcommerce/', '') }],
  }))

  return {
    ...listItem,
    children: listItem.children.map((paragraph, index) => {
      if (paragraph.type !== 'paragraph') return paragraph

      const isFirstParagraph = index === 0
      const isLastParagraph = index === listItem.children.length - 1

      const newParagraph: Paragraph = { ...paragraph, children: [...paragraph.children] }

      const links = paragraph.children.filter((child): child is Link => child.type === 'link')

      if (isFirstParagraph) {
        const prLink = links.find((link) => link.url?.includes('/pull/'))
        const commitLink = links.find((link) => link.url?.includes('/commit/'))

        let startIdx = 1
        if (prLink) startIdx += 1
        if (commitLink) startIdx += 1

        newParagraph.children.splice(0, startIdx)

        const startContent = newParagraph.children[0]
        if (startContent?.type === 'text') {
          startContent.value = startContent.value.replace(/^[ -]+/, '')
        }
      }

      if (newParagraph.children.length === 0) newParagraph.children.push(...paragraph.children)

      if (isLastParagraph) {
        const authorLink = links.find((link) =>
          link.children.some((child) => child.type === 'text' && child.value?.includes('@')),
        )

        if (authorLink) {
          const authorIdx = newParagraph.children.indexOf(authorLink)
          const beforeAuthor = newParagraph.children[authorIdx - 1]

          newParagraph.children.splice(
            authorIdx - 1,
            3,
            beforeAuthor?.type === 'text'
              ? { type: 'text', value: beforeAuthor.value.slice(0, -1) }
              : (beforeAuthor ?? { type: 'text', value: '' }),
            { type: 'text', value: `(${toString(authorLink)})` },
          )
        }

        // Add package references at the end with brackets and newline
        newParagraph.children.push({ type: 'text' as const, value: '\n' })
        newParagraph.children.push(
          ...packageRefs.flatMap((ref, i) =>
            i > 0 ? [{ type: 'text' as const, value: ' ' }, ref] : [ref],
          ),
        )
        newParagraph.children.push({ type: 'text' as const, value: '\n' })
      }

      return newParagraph.children.length ? newParagraph : paragraph
    }),
  }
}

function findVersionSection(ast: Root, targetVersion: string, packageName: string): Changes | null {
  const changes: Changes = {
    major: [],
    minor: [],
    patch: [],
  }

  let foundVersion = false
  let currentType: ChangeType | undefined

  for (const node of ast.children) {
    if (node.type === 'heading' && node.depth === 2) {
      const headingText = toString(node)

      if (foundVersion && headingText.match(/^\d+\.\d+\.\d+/)) {
        break
      }

      if (!foundVersion) {
        foundVersion = headingText.includes(targetVersion)
      }
    }

    if (foundVersion) {
      if (node.type === 'heading' && node.depth === 3) {
        const headingText = toString(node)
        if (headingText.includes('Major Changes')) currentType = 'major'
        else if (headingText.includes('Minor Changes')) currentType = 'minor'
        else if (headingText.includes('Patch Changes')) currentType = 'patch'
      } else if (node.type === 'list' && currentType) {
        node.children.forEach((item) => {
          changes[currentType!].push({ item: item as ListItem, package: packageName })
        })
      }
    }
  }

  return foundVersion ? changes : null
}

function createReleaseNotesAST(targetVer: string, allChanges: AllChanges): Root {
  const children: Root['children'] = [
    {
      type: 'heading',
      depth: 1,
      children: [{ type: 'text', value: `GraphCommerce ${targetVer} Release Notes` }],
    },
  ]

  const sections = [
    { type: 'major' as const, emoji: '🚀', title: 'New Features' },
    { type: 'minor' as const, emoji: '✨', title: 'Small Improvements' },
    { type: 'patch' as const, emoji: '🐛', title: 'Fixes' },
  ]

  const allPackages = new Set<string>()

  sections.forEach(({ type, emoji, title }) => {
    const changes = [...allChanges[type].values()]
    if (changes.length > 0) {
      children.push(
        {
          type: 'heading',
          depth: 2,
          children: [{ type: 'text', value: `${emoji} ${title}` }],
        },
        {
          type: 'list',
          ordered: false,
          spread: false,
          children: changes.map(({ item, packages }) => {
            packages.forEach((pkg) => allPackages.add(pkg))
            return transformListItem(item, Array.from(packages))
          }),
        },
      )
    }
  })

  // Add package reference section
  children.push({
    type: 'heading',
    depth: 2,
    children: [{ type: 'text', value: 'Packages' }],
  })

  // Add package definitions as a list
  const packageList = {
    type: 'list',
    ordered: false,
    spread: false,
    children: Array.from(allPackages).map((pkgName) => {
      const shortName = pkgName.replace('@graphcommerce/', '')
      const packagePath = shortName.startsWith('magento-')
        ? `packages/${shortName}`
        : shortName.startsWith('next-')
          ? `packagesDev/${shortName}`
          : `packages/${shortName}`

      return {
        type: 'listItem',
        spread: false,
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'html', value: `<a name="package-${shortName}"></a>` },
              { type: 'text', value: pkgName },
              { type: 'text', value: ': (' },
              {
                type: 'link',
                url: `https://github.com/graphcommerce-org/graphcommerce/tree/main/${packagePath}`,
                children: [{ type: 'text', value: 'source' }],
              },
              { type: 'text', value: ' • ' },
              {
                type: 'link',
                url: `https://github.com/graphcommerce-org/graphcommerce/blob/main/${packagePath}/CHANGELOG.md`,
                children: [{ type: 'text', value: 'CHANGELOG.md' }],
              },
              { type: 'text', value: ')' },
            ],
          },
        ],
      }
    }),
  }

  children.push(packageList)

  return { type: 'root', children }
}

async function getChangelogEntry(targetVersion: string): Promise<string> {
  const cwd = process.cwd()
  const packages = await getPackages(cwd)

  packages.packages.sort((a, b) => {
    const getGroupPriority = (dir: string): number => {
      if (dir.includes('/packages/magento-')) return 1
      if (dir.includes('/packages/')) return 2
      if (dir.includes('/packagesDev/')) return 3
      if (dir.includes('/examples/')) return 4
      return 5
    }

    const groupA = getGroupPriority(a.dir)
    const groupB = getGroupPriority(b.dir)

    if (groupA !== groupB) {
      return groupA - groupB
    }

    return a.dir.toLowerCase().localeCompare(b.dir.toLowerCase())
  })

  const changelogPromises = packages.packages.map(async (pkg) => {
    const changelogPath = path.join(pkg.dir, 'CHANGELOG.md')
    if (!fs.existsSync(changelogPath)) return null

    try {
      const fileContent = await fs.promises.readFile(changelogPath, 'utf8')
      const ast = processor.parse(fileContent)
      return {
        changes: findVersionSection(ast, targetVersion, pkg.packageJson.name),
        packageName: pkg.packageJson.name,
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error reading changelog for ${pkg.packageJson.name}:`, error.message)
      }
      return null
    }
  })

  const changelogs = (await Promise.all(changelogPromises)).filter(Boolean)

  if (!changelogs.length) {
    console.log(`No changelog entries found for version ${targetVersion}`)
    process.exit(0)
  }

  const allChanges: AllChanges = {
    major: new Map(),
    minor: new Map(),
    patch: new Map(),
  }

  const types: ChangeType[] = ['major', 'minor', 'patch']
  changelogs.forEach(({ changes, packageName }) => {
    if (!changes) return
    types.forEach((type) => {
      changes[type].forEach(({ item }) => {
        const key = toString(item as unknown as Root)
        if (!allChanges[type].has(key)) {
          allChanges[type].set(key, { item, packages: new Set([packageName]) })
        } else {
          allChanges[type].get(key)?.packages.add(packageName)
        }
      })
    })
  })

  const releaseNotesAST = createReleaseNotesAST(targetVersion, allChanges)
  return processor.stringify(releaseNotesAST)
}

getChangelogEntry(versionArg)
  .then((changelog) => {
    const outputPath = path.join(process.cwd(), `./.changeset/RELEASE-${versionArg}.md`)
    fs.writeFileSync(outputPath, changelog, 'utf8')
    console.log(`Release notes have been written to ${outputPath}`)
  })
  .catch((error) => {
    console.error('Error generating changelog:', error)
    process.exit(1)
  })
