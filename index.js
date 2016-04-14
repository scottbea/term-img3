'use strict';
const fs = require('fs');
const iterm2Version = require('iterm2-version');
const ansiEscapes = require('ansi-escapes');

module.exports = (img, opts) => {
	opts = opts || {};

	if (!(img && img.length > 0)) {
		throw new TypeError('Image required');
	}

	if (process.env.TERM_PROGRAM !== 'iTerm.app') {
		return null;
	}

	const version = iterm2Version();

	if (Number(version[0]) < 2 && Number(version[2]) < 9) {
		return null;
	}

	if (typeof img === 'string') {
		img = fs.readFileSync(img);
	}

	const ansi = ansiEscapes.image(img, opts);

	if (opts.log) {
		console.log(ansi);
	}
	return ansi;
};
