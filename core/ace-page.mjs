import pug from 'pug';

const rootTemplate = './core/root.template.pug';
const rootHeaderTemplate = './core/root-header.template.pug';
const rootComponentTemplate = './core/root-component.template.pug';
const rootFooterTemplate = './core/root-footer.template.pug';

class AcePage {
    constructor() {
        this.req;
        this.res;
        this.ace;

        this.title = 'Ace Page';

        this.components = [];
        this.clientScripts = [];
    }

    add() {
        console.log('adding', arguments.length);
        this.components = [...arguments];
    }

    beforeRender() {
        this.setup();

        this.components.forEach(component => {
            if (component.script && this.clientScripts.indexOf(component.script) === -1) {
                this.clientScripts.push(component.script);
            }

            component.components.forEach(nestedComponent => {
                if (nestedComponent.script && this.clientScripts.indexOf(nestedComponent.script) === -1) {
                    this.clientScripts.push(nestedComponent.script);
                }

                nestedComponent.page = this;

                nestedComponent.update(nestedComponent);
            });

            component.page = this;

            component.update(component);
        });
    }

    compile() {
        let headerTemplate = pug.compileFile(rootHeaderTemplate)({
            title: this.title
        });
        let baseTemplate = pug.compileFile(rootTemplate)({
            title: this.title
        });
        let footerTemplate = pug.compileFile(rootFooterTemplate)({
            scripts: this.clientScripts
        });
        let i = 0;

        for (i; i < this.components.length; i += 1) {
            if (this.components[i].components.length > 0) {
                let cmpTemplate;

                if (!this.components[i].template) {
                    cmpTemplate = pug.compileFile(rootComponentTemplate)({
                        cmpId: this.components[i].cmpId,
                        cmpType: this.components[i].cmpType,
                        template: ''
                    });
                } else {
                    cmpTemplate = pug.compileFile(rootComponentTemplate)({
                        cmpId: this.components[i].cmpId,
                        cmpType: this.components[i].cmpType,
                        template: this.components[i].compile()(this.components[i])
                    });
                }

                baseTemplate += cmpTemplate;

                this.components[i].components.forEach(component => {
                    if (!component.template) {
                        cmpTemplate = pug.compileFile(rootComponentTemplate)({
                            cmpId: component.cmpId,
                            cmpType: component.cmpType,
                            template: component.compile()(component)
                        });

                        baseTemplate += cmpTemplate;
                    } else {
                        baseTemplate += component.compile()(component);
                    }
                });
            } else {
                let cmpTemplate = pug.compileFile(rootComponentTemplate)({
                    cmpId: component.cmpId,
                    cmpType: component.cmpType,
                    template: this.components[i].compile()(component)
                });

                baseTemplate += cmpTemplate;
            }
        }

        return headerTemplate + baseTemplate + footerTemplate;
    }

    render(req, res, ace) {
        this.req = req;
        this.res = res;
        this.ace = ace;

        this.beforeRender();

        this.res.type('text/html');
        this.res.status(200);
        this.res.send(this.compile());
    }

    getComponentById(id) {
        let result;

        this.components.forEach(component => {
            if (component.cmpId === id && !result) {
                result = component;
            }

            component.components.forEach(nestedComponent => {
                if (nestedComponent.cmpId === id && !result) {
                    result = nestedComponent;
                }
            });
        });

        return result;
    }
};

export default AcePage;
