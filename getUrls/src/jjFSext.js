module.exports = {
  deleteFolder: function (path, debug) {
    deleteFolder(path, debug);
  }
};

var fs = require('fs');
var deleteFolder = function(path, debug) {
  if(path == "" || path == "/" || path == "\\" || path.length < 3) 
  {
    console.log("make sure you don't delete your entire harddrive");
  }
  else if (fs.existsSync(path)) {
    if(debug)
    {
      console.log("deleting " + path + " (debug)");    
      deleteFolderRecursiveDebug(path);
    }
    else
    {
      deleteFolderRecursive(path);    
    }
  }
  else 
  {
    console.log("path not found");
  }
};

var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

var deleteFolderRecursiveDebug = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursiveDebug(curPath);
      } else { // delete file
        //fs.unlinkSync(curPath);
        console.log("would remove file " + curPath);
      }
    });
    //fs.rmdirSync(path);
    console.log("would remove dir " + path);
  }
};