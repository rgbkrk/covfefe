var path = require('path');

var Player = require('player');

var musicPath = path.join(__dirname, 'trump.mp3');
var player = new Player([musicPath]);

for (var i = 0; i < 1000; i++) {
	player.add(musicPath);
}

player.play();
