'use strict';
const termImg = require('./');

const image = termImg('fixture.jpg', {
	width: 50,
	log: true
});

console.log(image);
