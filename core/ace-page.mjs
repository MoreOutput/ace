import pug from 'pug';

import AceComponent from './ace.component';

class AcePage extends AceComponent {
    constructor(route = '') {
        super();

        this.req;
        this.res;
        this.ace; 
        this.route = route;
        this.title = 'Ace Page';
        this.baseElement = 'div';
        this.persists = false;
        this.css = '';
        const rootUrl = this.getDir(import.meta.url);

        this.rootTemplate =  rootUrl + '/root.template.pug';
        this.rootHeaderTemplate = rootUrl + '/root-header.template.pug';
        this.rootFooterTemplate = rootUrl + '/root-footer.template.pug';

        this.components = [];
        this.clientStyles = [];
        this.clientScripts = [];
        this.clientLinks = [];
    }

    renderComponent(component) {
        component.parent = this;
        component.page = this;

        if (component.script && this.clientScripts.indexOf(component.script) === -1) {
            this.clientScripts.push(component.script);
        }

        if (component.scripts.length) {
            this.clientScripts = this.clientScripts.concat(component.scripts);
        }

        if (component.link && this.clientLinks.indexOf(component.link) === -1) {
            this.clientLinks.push(component.link);
        }

        if (component.links.length) {
            this.clientLinks = this.clientLinks.concat(component.links);
        }

        if (component.style) {
            this.clientStyles.push(component.style);
        }

        if (component.styles.length) {
            this.clientStyles = this.clientStyles.concat(component.styles);
        }

        if (component.layout === true) {
            const clientStyle = component.writeLayout();

            this.clientStyles.push(clientStyle);
        }

        component.components.forEach(nestedComponent => {
           this.renderComponent(nestedComponent);
        });

        component.update(component);
    }

    // TODO: make recursive, remove page reference use sessionId and cache.
    beforeRender() {
        this.setup();

        if (this.script && this.clientScripts.indexOf(this.script) === -1) {
            this.clientScripts.push(component.script);
        }

        if (this.scripts.length) {
            this.clientScripts = this.clientScripts.concat(this.scripts);
        }

        if (this.link && this.clientLinks.indexOf(this.link) === -1) {
            this.clientLinks.push(this.link);
        }

        if (this.links.length) {
            this.clientLinks = this.clientLinks.concat(this.links);
        }

        if (this.style) {
            this.clientStyles.push(this.style);
        }

        if (this.styles.length) {
            this.clientStyles = this.clientStyless.concat(this.styles);
        }

        this.components.forEach(component => {
           this.renderComponent(component);
        });
    }

    compileComponent(component) {
        if (!component.template) {
            // TODO, default component template
            return '<' + this.baseElement + ' data-ace-' + component.cmpType + '="' + component.cmpId + '">';
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
                wrapperStr = '</' + this.baseElement + '>';
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
                resultStr += '</' + this.baseElement + '>'
            }
        }

        return resultStr;
    }

    compile() {
        let headerTemplate = pug.compileFile(this.rootHeaderTemplate)({
            title: this.title,
            styles: this.clientStyles
        });
        let baseTemplate = pug.compileFile(this.rootTemplate)({
            title: this.title
        });
        let footerTemplate = pug.compileFile(this.rootFooterTemplate)({
            links: this.clientLinks,
            scripts: this.clientScripts
        });
        let i = 0;

        for (i; i < this.components.length; i += 1) {
            let component = this.components[i];

            baseTemplate += this.compileComponentRescursive(component);
        }

        return headerTemplate + baseTemplate + footerTemplate;
    }

    render(req, res, ace) {
        this.req = req;
        this.res = res;

        if (!this.template) {
            this.ace = ace;

            this.beforeRender();
        }

        this.template = this.compile();

        this.res.type('text/html');
        this.res.status(200);
        this.res.send(this.template);
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

    addStyle(stylePath) {
        if (this.clientStyles.indexOf(stylePath) === -1) {
            this.clientStyles.push(stylePath);
        }
    }
};

export default AcePage;
