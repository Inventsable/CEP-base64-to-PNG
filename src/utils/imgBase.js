// Found at:
// https://github.com/douzi8/base64-img
//
var fs = require("fs");
var path = require("path");

function fromBase64(filename, data) {
  var extname = path.extname(filename).substr(1);
  extname = extname || "png";

  if (extname === "svg") {
    extname = "svg+xml";
  }
  return "data:image/" + extname + ";base64," + data.toString("base64");
}

function fromImg(data) {
  var reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  var match = data.match(reg);
  var baseType = {
    jpeg: "jpg",
  };
  baseType["svg+xml"] = "svg";
  if (!match) {
    throw new Error("image base64 data error");
  }
  var extname = baseType[match[1]] ? baseType[match[1]] : match[1];

  return {
    extname: "." + extname,
    base64: match[2],
  };
}

/**
 * @description
 * Get image file base64 data
 * @example
 * base64Img.base64('path/demo.png', function(err, data) {})
 */
base64 = function(filename, callback) {
  if (!callback) callback = util.noop;

  fs.readFile(filename, function(err, data) {
    if (err) return callback(err);

    callback(null, fromBase64(filename, data));
  });
};

/**
 * @description
 * The api same as base64, but it's synchronous
 * @example
 * var data = base64Img.base64Sync('path/demo.png');
 */
base64Sync = function(filename) {
  var data = fs.readFileSync(filename);

  return fromBase64(filename, data);
};

/**
 * @description
 * Convert image base64 data to img
 * @example
 * base64Img.img('data:image/png;base64,...', 'dest', '1', function(err, filepath) {});
 */

/**
 * @param {String} data Base64 rawdata
 * @param {String} destpath Absolute path to parent folder
 * @param {String} name Name of resulting file
 * @param {Function} callback Function to execute on completion
 */
function convertBase64ToImage(data, destpath, name, callback) {
  name = name.replace(/\.(png|jpg)$/, "");
  var result = fromImg(data);
  var filepath = path.join(destpath, name + result.extname);

  fs.writeFile(filepath, result.base64, { encoding: "base64" }, function(err) {
    callback(err, filepath);
  });
}

/**
 * @description
 * The api same as img, but it's synchronous
 * @example
 * var filepath = base64Img.imgSync('data:image/png;base64,...', 'dest', '1');
 */
convertBase64ToImageSync = function(data, destpath, name) {
  var result = img(data);
  var filepath = path.join(destpath, name + result.extname);

  fs.writeFileSync(filepath, result.base64, { encoding: "base64" });
  return filepath;
};
