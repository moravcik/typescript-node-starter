const fs = require('fs-extra');
const klawSync = require('klaw-sync');
const path = require('path');

const buildMainDirs = () => klawSync('build/main', { nofile: true, depthLimit: 1 }).map(f => f.path);

module.exports.copyBuildMainDirs = function() {
  buildMainDirs().forEach(dir => fs.copySync(dir, './' + path.basename(dir)));
};

module.exports.cleanBuildMainDirs = function() {
  buildMainDirs().forEach(dir => fs.removeSync('./' + path.basename(dir)));
};
