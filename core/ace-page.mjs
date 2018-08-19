import pug from 'pug';

const rootTemplate = './core/root.template.pug';
const rootHeaderTemplate = './core/root-header.template.pug';
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

    compileComponent(component) {
        if (!component.template) {
            return '<span data-ace-' + component.cmpType + '="' + component.cmpId + '">';
        } else {
            return component.compile()(component);
        }
    }

    compileComponentRescursive(component) {
        let resultStr = '';
        let wrapperStr = '';
    
        if (component.components.length) {
            component.components.forEach(nestedComponent => {
                resultStr += this.compileComponent(nestedComponent);

                if (nestedComponent.components.length > 0) {
                    let wrapperRegEx = /(<\/.*?>)/;
                    let match = wrapperRegEx.exec(resultStr)[0];

                    wrapperStr = match;

                    resultStr = resultStr.replace(match, '');
                    
                    resultStr += this.compileComponentRescursive(nestedComponent) + wrapperStr;
                }

                if (!component.template) {
                    wrapperStr = '</span>';
                }
            });
        }

        if (!component.template) {
            resultStr += '</span>'
        }

        return resultStr;
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
            let component = this.components[i];

            if (component.components.length > 0) {
                baseTemplate += this.compileComponentRescursive(component);
            } else {
                baseTemplate += this.compileComponentRescursive(component);
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
