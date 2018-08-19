import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import bodyParser from 'body-parser';
import IndexPage from './pages/index.page';

const server = http.createServer();
const app = express();
const io = new WebSocket.Server({ port: 3001 });
let activePage;

app.use(bodyParser.json());
app.use('/js',express.static('public/js'));

// local development
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    activePage = new IndexPage(req, res);

    activePage.render();
});

io.on('connection', function connection (s) {
    s.on('message', function (r) {
        r = JSON.parse(r);

        processReponse(r);
    });
});

const processReponse = r => {
    let component = activePage.getComponentById(r.cmpId);
    component.update(r);

    if (r.event) {
        component[r.event](component);
    }
};

app.listen(3000);
