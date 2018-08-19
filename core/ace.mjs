import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import bodyParser from 'body-parser';

class Ace {
    constructor(config) {
        const ws = new WebSocket.Server({ port: 3001 });

        this.config = config;
        this.server = http.createServer();
        this.express = express();
        this.io;
        this.activePage;

        this.express.use(bodyParser.json());
        this.express.use('/js',express.static('public/js'));

        // local development
        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        ws.on('connection', (s) => {
            this.io = s;

            s.on('message', (r) => {
                r = JSON.parse(r);

                this.processReponse(r);
            });
        });

        this.express.listen(this.config.port);
    }

    get(route, page) {
        this.express.get('/', (req, res) => {
            this.activePage = page;

            page.render(req, res, this);
        });
    }

    processReponse(r) {
        let component = this.activePage.getComponentById(r.cmpId);
        component.update(r);
    
        if (r.event) {
            component.processEvent(r.event);
        }
    };
}

export default Ace;
