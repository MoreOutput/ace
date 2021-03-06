import http from 'http';
import path from 'path';
import WebSocket from 'ws';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import fs from 'fs';

const PAGE_CACHE = {
    // sessionId : {active: page, 'route': page, ...}
};
let Pages;

class Ace {
    constructor(pages, config = {port: 3000}) {
        Pages = pages;

        const ws = new WebSocket.Server({ port: 3001 });
        
        this.rootURL = this.getDir(import.meta.url).replace('core', '');
        this.server = http.createServer();
        this.express = express();
        this.io;
        this.config = config;
        this.express.use(bodyParser.json());
        this.express.use('/styles', express.static(this.rootURL + '/public/styles'));
        this.express.use('/js', express.static(this.rootURL + '/public/js'));
        this.express.use('/polymer', express.static(this.rootURL + '/bower_components'));
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

        this.setupAce(() => {
            this.setupRoutes();
        });

        this.express.listen(this.config.port);
    }

    setupAce(callback) {
        const pageDir = this.rootURL + '../../pages';
        let source = this.rootURL + '../../components';

        if (fs.lstatSync(source).isDirectory() ) {
            const files = fs.readdirSync(source);

            files.forEach(( file ) => {
                if (fs.lstatSync(source + '/' + file).isDirectory() ) {
                    this.copyResources(source + '/' + file, this.rootURL + 'public/styles', '.css');
                    this.copyResources(source + '/' + file, this.rootURL + 'public/js', '.js');
                }
            });
        }

        source = this.rootURL + '../../pages';

        if (fs.lstatSync(source).isDirectory() ) {
            this.copyResources(source, this.rootURL + 'public/styles', '.css');
            this.copyResources(source, this.rootURL + 'public/js', '.js');
        }

        callback();
    }

    setupRoutes(route) {
        let prop;
        let i = 0;

        this.express.get('/get-ace-sessionid', (req, res) => {
            // send styling data
            this.io.send(JSON.stringify({
                meta: {
                    styles: PAGE_CACHE[req.sessionID].active.layout
                }
            }));

            return res.json({
                id: req.sessionID
            });
        });

        for (prop in Pages) {
            let page = Pages[prop];

            if (page.route) {
                this.express.get(page.route, (req, res) => {
                    let activePage;

                    if (!PAGE_CACHE[req.sessionID]) {
                        PAGE_CACHE[req.sessionID] = {};
                    }

                    // TODO: page level persists
                    if (!PAGE_CACHE[req.sessionID][page.route] || PAGE_CACHE[req.sessionID][page.route].persists === false) {
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

    copyFile( source, target ) {
        let targetFile = target;
    
        if (fs.existsSync(target)) {
            if (fs.lstatSync(target).isDirectory()) {
                targetFile = path.join( target, path.basename( source ) );
            }
        }

        fs.writeFileSync(targetFile, fs.readFileSync(source));
    }

    copyResources(source, target, fileType = '') {
        let files = [];
    
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }
    
        if (fs.lstatSync(source).isDirectory() ) {
            files = fs.readdirSync(source);
    
            files.forEach(( file ) => {
                if (file.indexOf(fileType) !== -1) {
                    const curSource = path.join(source, file);
    
                    if (fs.lstatSync(curSource).isDirectory()) {
                        this.copyDir(curSource, target);
                    } else {
                        this.copyFile(curSource, target);
                    }
                }
            });
        }
    }

    getDir(url) {
        const moduleURL = new URL(url);
        const __dirname = path.dirname(moduleURL.pathname).replace('/', '');

        return __dirname;
    }
}

export default Ace;
