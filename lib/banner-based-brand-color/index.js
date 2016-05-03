/*jshint node:true*/
var sass = require('node-sass');
var Jimp = require('jimp');
var deasync = require('deasync');
var fs = require('fs');

const imagesDirectory = "public/assets/images"

module.exports = {
  name: 'banner-based-brand-color',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app, parentAddon) {
    var _this = this;
    var red = undefined;
    var green = undefined;
    var blue = undefined;

    app.options.sassOptions = {
      functions: {
        "brand_color_from_banner": function() {
          var files = fs.readdirSync(imagesDirectory);
          var fileName = undefined;

          files.forEach(function (file_name){
            if( file_name.indexOf("banner") > -1 ) {
              fileName = file_name;
            }
          });

          Jimp.read(imagesDirectory+"/"+fileName, function(err, banner) {
            _this.ui.writeLine("Calculating Brand Color");
            if(err){
              _this.ui.writeLine(err);
              red = 0;
              green = 0;
              blue = 0;
            } else {
              // Calculate the average of the RGB values
              var red_total = 0;
              var green_total = 0;
              var blue_total = 0;

              banner.scan(0, 0, banner.bitmap.width, banner.bitmap.height, function (x, y, idx) {
                red_total   = red_total + this.bitmap.data[ idx + 0 ];
                green_total = green_total + this.bitmap.data[ idx + 1 ];
                blue_total  = blue_total + this.bitmap.data[ idx + 2 ];
              });
              var pixel_count = banner.bitmap.width * banner.bitmap.height;
              red = red_total/pixel_count;
              green = green_total/pixel_count;
              blue = blue_total/pixel_count;
              _this.ui.writeLine("Brand Color: rgb("+red+","+green+","+blue+")");
            }
          });
          // Wait for the async fileRead methods to complete before returning a value
          deasync.loopWhile( function() {
            return (red === undefined || green === undefined || blue === undefined);
          });

          return new sass.types.Color(red, green, blue);
        }
      }
    };

  }
};
