'use strict';
const fs = require('fs');
const iterm2Version = require('iterm2-version');
const ansiEscapes = require('ansi-escapes');

class UnsupportedTerminal extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
		this.message = 'iTerm >=2.9 required';
	}
}

function unsupported() {
	throw new UnsupportedTerminal();
}

module.exports = (img, opts) => {
	opts = opts || {};
        let imagePath = null;

	const fallback = typeof opts.fallback === 'function' ? opts.fallback : unsupported;

	if (!(img && img.length > 0)) {
		throw new TypeError('Image required');
	}

	if (process.env.TERM_PROGRAM !== 'iTerm.app') {
		return fallback();
	}

	const version = iterm2Version();

	if (Number(version[0]) < 2 && Number(version[2]) < 9) {
		return fallback();
	}

	if (typeof img === 'string') {
                imagePath = img;
		img = fs.readFileSync(img);
	}

        opts.preRender && opts.preRender({imagePath, img, opts, termVersion: version});

	const ansi = ansiEscapes.image(img, opts);
       
        opts.postRender && opts.postRender({imagePath, img, opts, termVersion: version, output: ansi});

	if (opts.log) {
		console.log(ansi);
	}
	return ansi;
};
