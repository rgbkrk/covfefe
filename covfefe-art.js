var childProcess = require('child_process');
var path = require('path');

var async = require('async');
var colorConvert = require('color-convert');
var giphy = require('giphy-api')();
var pixelGif = require('pixel-gif');
var shuffleArray = require('shuffle-array');
var supportsColor = require('supports-color');

childProcess.fork(path.join(__dirname, 'music.js'));

function updateFrame(frame, cb) {
	var covfefe = [];
	var skipped = false;
	for (var y = 0; y < frame.height; y += 2) {
		for (var x = 0; x < frame.width; x += 2) {
			var offset = ((y * frame.width) + x) * 4;
			if (frame.data[offset + 3] === 0) {
				skipped = true;
			} else {
				if (skipped) {
					skipped = false;
					covfefe.push('\x1b[' + (y / 2 + 1) + ';' + (x / 2 + 1) + 'H');
				}

				switch (supportsColor.level) {
				case 0: // lol we're still gonna' try
				case 1:
					var ansi16 = colorConvert.rgb.ansi16(
						frame.data[offset],
						frame.data[offset + 1],
						frame.data[offset + 2]) + 10;
					covfefe.push('\x1b[' + ansi16 + 'm ');
					break;
				case 2:
					var ansi256 = colorConvert.rgb.ansi256(
						frame.data[offset],
						frame.data[offset + 1],
						frame.data[offset + 2]);
					covfefe.push('\x1b[48;5;' + ansi256 + 'm ');
					break;
				case 3:
					var r = frame.data[offset];
					var r = frame.data[offset + 1];
					var r = frame.data[offset + 2];
					covfefe.push('\x1b[48;2;' + r + ';' + g + ';' + b + 'm ');
					break;
				}
			}
		}
		covfefe.push('\x1b[m\n');
	}
	var cx = Math.floor(Math.random() * 70);
	var cy = Math.floor(Math.random() * 30);
	covfefe.push('\x1b[' + cy + ';' + cx + 'H\x1b[0mCOVFEFE!');
	process.stdout.write(covfefe.join(''));
	setTimeout(cb, frame.delay);
}

giphy.search('trump', function (err, res) {
	if (err) {
		throw err;
	}

	var images = res.data
		.filter(function (img) { return img.type === 'gif'; })
		.map(function (img) { return img.images.fixed_height_small.url });
	
	shuffleArray(images);
	var imageData = {};

	async.forever(function (cb) {
		async.each(images,
			function (imgUrl, cb) {
				var getImageData = function (cb) {
					if (imgUrl in imageData) {
						cb(null, imageData[imgUrl]);
					} else {
						pixelGif.parse(imgUrl)
							.then(function (data) {
								imageData[imgUrl] = data;
								cb(null, data);
							})
							.catch(cb);
					}
				};
	
				getImageData(function (err, data) {
					if (err) {
						return cb(err);
					}
	
					process.stdout.write('\x1b[2J\x1b[H\x1b[f');
					async.each(data, updateFrame, cb);
				});
			},
			cb);
	}, function (err) {
		if (err) {
			throw err;
		}
	});
});

