const { join } = require('path')
const { copy } = require('fs-extra')
const { promisify } = require('util')
const exec = require('child_process').exec
const promisifiedExec = promisify(exec)

const SRC = join(__dirname, '..', 'src')
const DIST = join(__dirname, '..', 'dist')

function copyFromSrcToDist(inputPath, outputPath = inputPath) {
  return copy(join(SRC, inputPath), join(DIST, outputPath))
}

function buildPackageWithDeps(packageName) {
  return promisifiedExec(
    `cd ${join(SRC, packageName)} && npm i && npm run build`
  )
}

module.exports = { SRC, DIST, copyFromSrcToDist, buildPackageWithDeps }
