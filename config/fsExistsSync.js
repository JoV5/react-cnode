const fs = require('fs');

module.exports = function fsExistsSync(path) {
  try{
    fs.accessSync(path, fs.F_OK);
  }catch(e){
    return false;
  }
  return true;
};