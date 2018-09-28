var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('json spaces', 40);
app.use(express.static('./public'));
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// console.log


app.get('/', function(req, res) {
    res.render('chat', {title: 'My chat'});
})

app.post('/', function(req, res) {
  console.log(req.body);
  res.json({"name": req.body});
})


io.on('connection', function (socket) {
    console.log('you are connected');

    socket.on('my other event', function (data) {
        io.emit('news', data.textVal);

    });
    socket.on('disconnect', function() {
        console.log('you are disconnected');
    });
});

server.listen(3000, function(){
    console.log('The server is run on port 3000');
})
