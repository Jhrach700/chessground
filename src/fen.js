var _ = require('lodash');
var util = require('./util');

var initial = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

var roles = {
  p: "pawn",
  r: "rook",
  n: "knight",
  b: "bishop",
  q: "queen",
  k: "king"
};

var letters = {
  pawn: "p",
  rook: "r",
  knight: "n",
  bishop: "b",
  queen: "q",
  king: "k"
};

function read(fen) {
  var pieces = {};
  _.forEach(fen.replace(/ .+$/, '').split('/'), function(row, y) {
    var x = 0;
    _.forEach(row, function(v) {
      var nb = parseInt(v);
      if (nb) x += nb;
      else {
        x++;
        pieces[util.pos2key([x, 8 - y])] = {
          role: roles[v.toLowerCase()],
          color: v === v.toLowerCase() ? 'black' : 'white'
        };
      }
    });
  });

  return pieces;
}

function write(pieces) {
    return _.reduce(
      _.range(8, 1, -1),
      function(str, nb) {
        return str.replace(new RegExp(Array(nb + 1).join('1'), 'g'), nb);
      },
      _.map(_.range(8, 0, -1), function(y) {
        return _.map(_.range(1, 9), function(x) {
          var piece = pieces[util.pos2key([x, y])];
          if (piece) {
            var letter = letters[piece.role];
            return piece.color === 'white' ? letter.toUpperCase() : letter;
          } else return '1';
        }).join('')
      }).join('/'));
  }

module.exports = {
  initial: initial,
  read: read,
  write: write
};
