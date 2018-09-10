import path from 'path';
import pug from 'pug';

class AceComponent {
    constructor() {
        this.cmpId = this.generateId();
        this.cmpType = this.constructor.name;
        this.style = '';
        this.styles = [];
        this.script = '';
        this.scripts = [];
        this.link = '';
        this.links = [];
        this.template = '';
        this.events = Object.create(null, {});
        this.markup;
        this.page;
        this.parent;
        this.components = [];
        this.handlerFile = '';
    }

    add(...components) {
        this.components = this.components.concat(components);
    }

    compile() {
        return pug.compileFile(this.template);
    }

    generateId() {
        return Math.floor(Math.random() * (9999 - 1) + 1).toString();
    }

    getData() {
        let result = {};

        if (this.getDataMap) {
            let prop;
            let valueMap = this.getDataMap();

            for (prop in this) {
                if (typeof this[prop] !== 'function' && valueMap.indexOf(prop) !== -1) {
                    result[prop] = this[prop];
                }
            }
        }

        result.cmpType = this.cmpType;
        result.cmpId = this.cmpId;
        result.handlerFile = this.handlerFile;

        return result;
    }

    getComponentData(component, data = []) {
        component.components.forEach(component => {
            let newDataObj = component.getData();

            data.push(newDataObj);

            if (component.hasComponents()) {
                return this.getComponentData(component, data);
            }
        });

        return data;
    }

    pushStateUpdate() {
        let data = this.getComponentData(this.page);

        if (data.length) {
            this.page.ace.io.send(JSON.stringify(data));
        }
    }

    update(updateObj) {
        for (const prop in updateObj) {
            if (this[prop] !== undefined) {
                this[prop] = updateObj[prop];
            }
        }
    }

    setup() {}

    addEvent(eventName, callback) {
        this.events[eventName] = callback;
    }

    getEvents() {
        let prop;
        let events = [];

        for (prop in this.events) {
            events.push(prop);
        }

        return events;
    }

    processEvent(eventName) {
        if (this.events[eventName]) {
            this.events[eventName](this);

            this.pushStateUpdate();
        }
    }

    getPugMap(dataMap) {
        let result = {};
        let prop;

        for (prop in dataMap) {
            if (this[prop] !== undefined && this[prop] !== '' && this[prop] !== false) {
                result[prop] = this[prop];
            }
        };

        result['data-ace-' + this.cmpType] = this.cmpId;

        return result;
    };

    redirect(route) {
        this.page.ace.io.send(JSON.stringify({
            route: {
                url: route,
                data: {},
                title: 'Routing'
            },
        }));
    }

    removeComponentById(id) {
        let result = [];

        this.components.forEach(component => {
            if (component.cmpId !== id) {
                result.push(component);
            }
        });

        this.components = result;
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

    hasComponents() {
        if (this.components.length) {
            return true;
        }

        return false;
    }

    getDir(url) {
        const moduleURL = new URL(url);
        const __dirname = path.dirname(moduleURL.pathname).replace('/', '');

        return __dirname;
    }
};

export default AceComponent;
