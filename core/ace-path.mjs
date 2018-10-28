// Getting root reference while __dirName is broken for node modules
import path from 'path';

class AcePath {
    constructor() {}

    getDir(url) {
        const moduleURL = new URL(url);
        const __dirname = path.dirname(moduleURL.pathname).replace('/', '');
    
        return __dirname;
    };
}

export default new AcePath();
