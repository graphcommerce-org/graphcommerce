import githubDefault from '@changesets/changelog-github'
// eslint-disable-next-line import/no-extraneous-dependencies
import { getInfo, getInfoFromPullRequest } from '@changesets/get-github-info'

const changelogFunctions: typeof githubDefault = {
  getDependencyReleaseLine: () => Promise.resolve(''),
  getReleaseLine: async (changeset, type, options) => {
    if (!options || !options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]',
      )
    }

    let prFromSummary: number | undefined
    let commitFromSummary: string | undefined
    const usersFromSummary: string[] = []

    const replacedChangelog = changeset.summary
      .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
        const num = Number(pr)
        if (!Number.isNaN(num)) prFromSummary = num
        return ''
      })
      .replace(/^\s*commit:\s*([^\s]+)/im, (_, commit) => {
        commitFromSummary = commit
        return ''
      })
      .replace(/^\s*(?:author|user):\s*@?([^\s]+)/gim, (_, user: string) => {
        usersFromSummary.push(user)
        return ''
      })
      .trim()

    const [firstLine, ...futureLines] = replacedChangelog.split('\n').map((l) => l.trimRight())

    const linksNew = await (async () => {
      if (prFromSummary !== undefined) {
        let { links } = await getInfoFromPullRequest({
          repo: options.repo,
          pull: prFromSummary,
        })
        if (commitFromSummary) {
          links = {
            ...links,
            commit: `[\`${commitFromSummary}\`](https://github.com/${options.repo}/commit/${commitFromSummary})`,
          }
        }
        return links
      }
      const commitToFetchFrom = commitFromSummary || changeset.commit
      if (commitToFetchFrom) {
        const { links } = await getInfo({
          repo: options.repo,
          commit: commitToFetchFrom,
        })
        return links
      }
      return {
        commit: null,
        pull: null,
        user: null,
      }
    })()

    const users = usersFromSummary.length
      ? usersFromSummary
          .filter((u) => !u.startsWith('apps'))
          .map((userFromSummary) => `[@${userFromSummary}](https://github.com/${userFromSummary})`)
          .join(', ')
      : linksNew.user

    const prefix = [
      linksNew.pull === null ? '' : ` ${linksNew.pull}`,
      linksNew.commit === null ? '' : ` ${linksNew.commit}`,
    ].join('')

    return `\n\n-${prefix ? `${prefix} -` : ''} ${firstLine}\n${futureLines
      .map((l) => `  ${l}`)
      .join('\n')} (${users})`
  },
}

export default changelogFunctions
