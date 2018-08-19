import pug from 'pug';

const rootTemplate = './core/root.template.pug';
const rootFooterTemplate = './core/root-footer.template.pug';

class AcePage {
    constructor(req, res) {
        this.req = req;
        this.res = res;

        this.title = 'Ace Page';

        this.components = [];
        this.clientScripts = [];
    }

    add() {
        this.components = [...arguments];
    }

    beforeRender() {
        let i = 0;

        this.setup();

        this.components.forEach(component => {
            if (component.script && this.clientScripts.indexOf(component.script) === -1) {
                this.clientScripts.push(component.script);
            }
        });
    }

    compile() {
        let baseTemplate = pug.compileFile(rootTemplate)({
            title: this.title
        });
        let footerTemplate = pug.compileFile(rootFooterTemplate)({
            scripts: this.clientScripts
        });
        let i = 0;

        for (i; i < this.components.length; i += 1) {
            baseTemplate += this.components[i].compile()(this.components[i]);
        }

        return baseTemplate + footerTemplate;
    }

    render() {
        this.beforeRender();

        this.res.type('text/html');
        this.res.status(200);
        this.res.send(this.compile());
    }

    getComponentById(id) {
        let result;

        this.components.forEach(component => {
            if (component.cmpId === id) {
                result = component;
            }
        });

        return result;
    }
};

export default AcePage;
