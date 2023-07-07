type PathCount = { path: string; count: number }

export const packageRoots = (packagePaths: string[]): string[] => {
  const pathMap: { [key: string]: PathCount } = {}

  // Iterate over each path in the array
  packagePaths.forEach((singlePath) => {
    const parts = singlePath.split('/')

    // Iterate through each part of the path
    for (let i = 1; i < parts.length; i++) {
      const subPath = parts.slice(0, i + 1).join('/')

      // Increment the count of this subPath
      if (pathMap[subPath]) {
        pathMap[subPath].count += 1
      } else {
        pathMap[subPath] = { path: subPath, count: 1 }
      }
    }
  })

  // Filter the paths that appear more than once
  const roots: string[] = []
  Object.values(pathMap).forEach(({ path, count }) => {
    if (count > 1) {
      roots.push(path)
    }
  })

  // Filter out the sub-paths which are part of another longer sub-path
  return roots.filter(
    (root, index, self) => self.findIndex((r) => r !== root && r.startsWith(root + '/')) === -1,
  )
}
