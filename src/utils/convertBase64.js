import fs from "fs";
import path from "path";

/**
 * Thenable function for converting base64 to PNG and rewriting to local filepath from within CEP
 * @param {String} data The raw base64 data to convert
 * @param {String} filename The name (with or without ".png") of the resulting PNG file
 * @param {String} filepath The path to the parent folder of the result (for fs checking it exists before writing to disk)
 * @returns {Object} with key/value pairs of "okay" reporting if successful, and "error" containing any issue
 */
function convertBase64ToPNG(data, filename, filepath) {
  return new Promise((resolve, reject) => {
    try {
      let prefix = data.match(/data.*\,/)[0];
      data = data.replace(prefix, "");
      if (!exists(filepath))
        reject({ okay: false, error: "Folder path does not exist" });
      // Create a temporary canvas
      const canvas = document.createElement("canvas");

      // Gather data about image, dimensions, and set canvas to paint at fullsize
      const dimensions = getPngDimensions(data);
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      // Get drawing context, then set source.src to base64 dynamically
      const context = canvas.getContext("2d");
      const img = new Image();
      img.onload = function() {
        // This gets called after the src overwrite. Paint the image with our data
        context.drawImage(this, 0, 0, canvas.width, canvas.height);

        // Write the new data to disk, replacing potential redundant pieces of filepath string to ensure uniformity:
        fs.writeFileSync(
          `${filepath.replace(/(\\|\/)$/, "")}/${filename.replace(
            /\.png$/,
            ""
          )}.png`,
          new Buffer(
            canvas.toDataURL().replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          )
        );

        // If you want to change this function to a fullFilePath parameter:
        // fs.writeFileSync(
        //   fullFilePath, // < Then supply a new argument and delete references to filepath and filename above
        //   new Buffer(
        //     canvas.toDataURL().replace(/^data:image\/\w+;base64,/, ""),
        //     "base64"
        //   )
        // );

        // Remove our temporary canvas and resolve
        canvas.remove();
        resolve({
          okay: true,
        });
      };
      img.src = `data:image/png;base64,${data}`;
    } catch (err) {
      reject({
        okay: false,
        error: err,
      });
    }
  });
}

// Just to check if this folder path exists
function exists(targetPath) {
  return fs.existsSync(path.resolve(targetPath));
}

// Determine the correct dimensions for the resulting PNG to get width/height of final result file
function getPngDimensions(base64) {
  // dase64 variable must not contain image:data prefix, must be rawdata
  const header = atob(base64.slice(0, 50)).slice(16, 24);
  const uint8 = Uint8Array.from(header, (c) => c.charCodeAt(0));
  const dataView = new DataView(uint8.buffer);
  return {
    width: dataView.getInt32(0),
    height: dataView.getInt32(4),
  };
}

// In case you need reverse conversion, from PNG (or any image) > base64. This does not include an image:data prefix
function encodeAsBase64(filepath) {
  return new Buffer(fs.readFileSync(filepath)).toString("base64");
}

export { convertBase64ToPNG, getPngDimensions, encodeAsBase64 };
