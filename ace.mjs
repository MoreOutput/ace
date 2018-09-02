import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

const PAGE_CACHE = {
    // sessionId : {active: page, 'route': page, ...}
};
const Pages;

class Ace {
    constructor(pages) {
        Pages = pages;

        const ws = new WebSocket.Server({ port: 3001 });

        this.server = http.createServer();
        this.express = express();
        this.io;

        this.express.use(bodyParser.json());
        this.express.use('/js',express.static('public/js'));
        this.express.use('/polymer',express.static('bower_components'));
        this.express.use(session({
            secret: 'h3sdgsp8223e23x234tgddxcxdfdsasdsG',
            resave: false,
            saveUninitialized: true
        }));
        this.express.use((req, res, next) => {
            // currently we dont cache, may be better to trigger active route update on a browser
            // event related to history (loading from cache)
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });

        ws.on('connection', (s) => {
            this.io = s;

            s.on('message', (r) => {
                r = JSON.parse(r);

                this.processReponse(r);
            });
        });

        this.setupRoutes();

        this.express.listen(this.config.port);
    }

    setupRoutes(route) {
        let prop;
        let i = 0;

        this.express.get('/get-ace-sessionid', (req, res) => {
            return res.json({id: req.sessionID});
        });

        for (prop in Pages) {
            let page = Pages[prop];

            if (page.route) {
                this.express.get(page.route, (req, res) => {
                    let activePage;

                    if (!PAGE_CACHE[req.sessionID]) {
                        PAGE_CACHE[req.sessionID] = {};
                    }

                    if (!PAGE_CACHE[req.sessionID][page.route]) {
                        PAGE_CACHE[req.sessionID][page.route] = new page.page(page.route);

                        PAGE_CACHE[req.sessionID].active = PAGE_CACHE[req.sessionID][page.route];
                    } else {
                        PAGE_CACHE[req.sessionID].active = PAGE_CACHE[req.sessionID][page.route];
                    }

                    return PAGE_CACHE[req.sessionID].active.render(req, res, this);
                });
            }
        }
    }

    processReponse(r) {
        let component = PAGE_CACHE[r.id].active.getComponentById(r.cmpId);

        if (component) {
            component.update(r);
        
            if (r.event) {
                component.processEvent(r.event);
            }
        } else {
            console.warn('Component Reference not found', r);
        }
    };
}

export default Ace;
