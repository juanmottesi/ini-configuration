const fs = require('fs');
const ini = require('ini');
const merge = require('lodash/fp/merge');

function readConfigFile(file) {
  if (fs.existsSync(file)) {
    return ini.parse(fs.readFileSync(file, 'utf-8'));
  }
  return {};
}

function readConfigFiles(configFiles, defaultObject) {
  if (configFiles === undefined || configFiles.length === 0) {
    throw new Error('Faltan archivos de configuracion');
  }
  if (!configFiles.some(fs.existsSync)) {
    throw new Error(`No existe ningun archivo de configuración: ${configFiles.join(', ')}`);
  }
  const iniFiles = configFiles.map(readConfigFile);
  return iniFiles.reverse().reduce((newObj, oldObj) => merge(newObj, oldObj), defaultObject || {});
}

module.exports = {
  config(configFiles, defaultObject) {
    process.configuration = readConfigFiles(configFiles, defaultObject);
  }
};

