const { globSync } = require('glob')

const getVenvPackagesPath = () => {
  const venvSitePackages = globSync(".venv/lib/*/site-packages/")

  if (venvSitePackages.length > 1) {
    throw "More than one venv detected, exiting"
  }

  if (venvSitePackages.length === 0) {
    return ""
  }

  return venvSitePackages[0]
}

module.exports = {getVenvPackagesPath}