import githubDefault from '@changesets/changelog-github'

const changelogFunctions: typeof githubDefault = {
  getDependencyReleaseLine: () => Promise.resolve(''),
  getReleaseLine: githubDefault.getReleaseLine,
}

export default changelogFunctions
