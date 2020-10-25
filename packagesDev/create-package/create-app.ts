/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import { URL } from 'url'
import chalk from 'chalk'
import { sync } from 'rimraf'
import { getRepoInfo, hasExample, hasRepo, RepoInfo } from './helpers/examples'
import install from './helpers/install'
import isFolderEmpty from './helpers/is-folder-empty'
import getOnline from './helpers/is-online'
import isWriteable from './helpers/is-writeable'
import makeDir from './helpers/make-dir'
import shouldUseYarn from './helpers/should-use-yarn'
import updateJson from './helpers/update-json'

export class DownloadError extends Error {}

export async function createApp({
  appPath,
  useNpm,
  example,
  examplePath,
}: {
  appPath: string
  useNpm: boolean
  example?: string
  examplePath?: string
}): Promise<void> {
  let repoInfo: RepoInfo | undefined

  if (example) {
    let repoUrl: URL | undefined

    try {
      repoUrl = new URL(example)
    } catch (error) {
      if (error.code !== 'ERR_INVALID_URL') {
        console.error(error)
        process.exit(1)
      }
    }

    if (repoUrl) {
      if (repoUrl.origin !== 'https://github.com') {
        console.error(
          `Invalid URL: ${chalk.red(
            `"${example}"`,
          )}. Only GitHub repositories are supported. Please use a GitHub URL and try again.`,
        )
        process.exit(1)
      }

      repoInfo = await getRepoInfo(repoUrl, examplePath)

      if (!repoInfo) {
        console.error(
          `Found invalid GitHub URL: ${chalk.red(
            `"${example}"`,
          )}. Please fix the URL and try again.`,
        )
        process.exit(1)
      }

      const found = await hasRepo(repoInfo)

      if (!found) {
        console.error(
          `Could not locate the repository for ${chalk.red(
            `"${example}"`,
          )}. Please check that the repository exists and try again.`,
        )
        process.exit(1)
      }
    } else if (example !== '__internal-testing-retry') {
      const found = await hasExample(example)

      if (!found) {
        console.error(
          `Could not locate an example named ${chalk.red(
            `"${example}"`,
          )}. Please check your spelling and try again.`,
        )
        process.exit(1)
      }
    }
  }

  const root = path.resolve(appPath)

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      `The application path ${path.dirname(
        root,
      )} is not writable, please check folder permissions and try again.`,
    )
    console.error('It is likely you do not have write permissions for this folder.')
    process.exit(1)
  }

  const appName = path.basename(root)

  await makeDir(root)
  const isNotEmpty = !isFolderEmpty(root, appName)

  const useYarn = useNpm ? false : shouldUseYarn()
  const isOnline = !useYarn || (await getOnline())
  const originalDirectory = process.cwd()

  const displayedCommand = useYarn ? 'yarn' : 'npm'

  await makeDir(root)
  process.chdir(root)

  const parentFolder = path.dirname(root).split(path.sep).pop()

  if (example) {
    console.log('example repo installation not added yet')
    process.exit(1)
    // try {
    //   if (repoInfo) {
    //     const repoInfo2 = repoInfo
    //     console.log(`Downloading files from repo ${chalk.cyan(example)}. This might take a moment.`)
    //     console.log()
    //     await retry(() => downloadAndExtractRepo(root, repoInfo2), {
    //       retries: 3,
    //     })
    //   } else {
    //     console.log(
    //       `Downloading files for example ${chalk.cyan(example)}. This might take a moment.`,
    //     )
    //     console.log()
    //     await retry(() => downloadAndExtractExample(root, example), {
    //       retries: 3,
    //     })
    //   }
    // } catch (reason) {
    //   throw new DownloadError(reason)
    // }
    // // Copy our default `.gitignore` if the application did not provide one
    // const ignorePath = path.join(root, '.gitignore')
    // if (!fs.existsSync(ignorePath)) {
    //   fs.copyFileSync(path.join(__dirname, 'templates', 'default', 'gitignore'), ignorePath)
    // }
    // console.log('Installing packages. This might take a couple of minutes.')
    // console.log()
    // await install(root, null, { useYarn, isOnline })
    // console.log()
  } else {
    console.log(
      isNotEmpty
        ? `Updating package in ${chalk.green(root)}`
        : `Creating a new package in ${chalk.green(root)}.`,
    )

    updateJson(
      path.join(root, 'tsconfig.json'),
      {
        exclude: ['node_modules'],
        include: ['**/*.ts', '**/*.tsx'],
        extends: '@reachdigital/typescript-config-pwa/nextjs.json',
      },
      {},
    )

    updateJson(
      path.join(root, 'package.json'),
      {
        name: `@reachdigital/${appName}`,
        version: '0.1.0',
        private: true,
      },
      {
        sideEffects: false,
        engines: { node: '12.x' },
        prettier: '@reachdigital/prettier-config-pwa',
        browserslist: ['extends @reachdigital/browserslist-config-pwa'],
        eslintConfig: {
          extends: '@reachdigital/eslint-config-pwa',
          parserOptions: {
            project: './tsconfig.json',
          },
        },
      },
    )

    const devDependencies = [
      // todo: remove version constraint when actual versions are being published
      '@reachdigital/typescript-config-pwa@^0.1.0',
      '@reachdigital/eslint-config-pwa@^0.1.0',
      '@reachdigital/browserslist-config-pwa@^0.1.0',
      '@reachdigital/prettier-config-pwa@^0.1.0',
    ]

    console.log(
      `Installing ${devDependencies
        .map((val) => chalk.cyan(val))
        .join(', ')} using ${displayedCommand}...`,
    )
    await install(root, devDependencies, { useYarn, isOnline, isDev: true })

    // console.log()
    // await cpy('**', root, {
    //   parents: true,
    //   cwd: path.join(__dirname, 'templates', 'default'),
    //   rename: (name) => {
    //     switch (name) {
    //       case 'gitignore': {
    //         return '.'.concat(name)
    //       }
    //       // README.md is ignored by webpack-asset-relocator-loader used by ncc:
    //       // https://github.com/zeit/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
    //       case 'README-template.md': {
    //         return 'README.md'
    //       }
    //       default: {
    //         return name
    //       }
    //     }
    //   },
    // })
  }

  // if (tryGitInit(root)) {
  //   console.log('Initialized a git repository.')
  //   console.log()
  // }

  if (path.join(originalDirectory, appName) === appPath) {
  } else {
  }

  if (isNotEmpty) console.log(`${chalk.green('Success!')} Updated ${appName} at ${appPath}`)
  else console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`)
  // console.log('Inside that directory, you can run several commands:')
  // console.log()
  // console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}dev`))
  // console.log('    Starts the development server.')
  // console.log()
  // console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`))
  // console.log('    Builds the app for production.')
  // console.log()
  // console.log(chalk.cyan(`  ${displayedCommand} start`))
  // console.log('    Runs the built app in production mode.')
  // console.log()
  // console.log('We suggest that you begin by typing:')
  // console.log()
  // console.log(chalk.cyan('  cd'), cdpath)
  // console.log(`  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}dev`)}`)
  // console.log()
}
