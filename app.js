const express = require('express')
  , stylus = require('stylus')
  , nib = require('nib');

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
//diz onde vamos manter nossas views
app.set('views', __dirname + '/views');
//diz qual engine será utilizado
app.set('view engine', 'jade');
//
app.use(express.logger('dev'));

app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index',
  	{title: 'Home'}
  )
})
app.listen(3000)
