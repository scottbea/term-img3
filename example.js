'use strict';
const termImg = require('./');
const imageInfo = require('image-info');
const filename = process.argv[2];


// Implement a new option called 'scale' that overrides the 'height' or 'width' properties and use the image details instead
var preRenderHandler = function(ctx, cb) {
  let newOpts = Object.assign({}, ctx.opts);
  if (newOpts.scale && ctx.imagePath) {
    imageInfo(ctx.imagePath, (err, info) => {
      if (!err) {
          newOpts.width = Math.round(info.width * newOpts.scale, 0) + 'px';
          newOpts.height = Math.round(info.height * newOpts.scale, 0) + 'px';
      }
      cb && cb(err, ctx.img, newOpts);
    });
  }
  else {
   cb && cb(null, ctx.img, newOpts);
  }
}

const opts = {
  height: 'auto',
  log: true,
  scale: 0.5,
  preRender: preRenderHandler
}

termImg(filename, opts);
