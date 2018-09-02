import pug from 'pug';

import AceComponent from './ace.component';

const rootTemplate = './core/root.template.pug';
const rootHeaderTemplate = './core/root-header.template.pug';
const rootFooterTemplate = './core/root-footer.template.pug';

class AcePage extends AceComponent {
    constructor(route = '') {
        super();

        this.req;
        this.res;
        this.ace;
        this.route = route;
        this.title = 'Ace Page';

        this.components = [];
        this.clientScripts = [];
        this.clientLinks = [];
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

                if (nestedComponent.link && this.clientLinks.indexOf(nestedComponent.link) === -1) {
                    this.clientLinks.push(nestedComponent.link);
                }

                nestedComponent.page = this;
                nestedComponent.parent = component;

                nestedComponent.setup();

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
            let dataMap = component.getPugMap(component.getData());

            return component.compile()({
                dataMap: dataMap
            });
        }
    }

    compileComponentRescursive(component) {
        let resultStr = '';
        let wrapperStr = '';

        if (component.components.length) {
            resultStr += this.compileComponent(component);

            if (!component.template) {
                wrapperStr = '</span>';
            } else {
                let wrapperRegEx = /(<\/.*?>)/;
                const matches = wrapperRegEx.exec(resultStr);
                const match = matches[0];

                wrapperStr = match;

                resultStr = resultStr.replace(wrapperStr, '');
            }

            component.components.forEach(nestedComponent => {
                if (nestedComponent.components.length > 0) {
                    resultStr += this.compileComponentRescursive(nestedComponent);
                } else {
                    resultStr += this.compileComponent(nestedComponent);
                }
            });

            resultStr += wrapperStr;
        } else {
            resultStr += this.compileComponent(component);
            
            if (!component.template) {
                resultStr += '</span>'
            }
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
            links: this.clientLinks,
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

        this.components = [];

        this.beforeRender();

        this.res.type('text/html');
        this.res.status(200);

        this.res.send(this.compile());
    }

    redirect(route) {
        this.ace.io.send(JSON.stringify({
            route: {
                url: route,
                data: {},
                title: 'Routing'
            },
        }));
    }
};

export default AcePage;
