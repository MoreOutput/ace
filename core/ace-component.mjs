import pug from 'pug';

class AceComponent {
    constructor(pathInfo) {
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
        this.rendered = false;
        // for now each component carries around AceRoute
        // it is attached when the component is setup when an AcePage renders
        this.router;
    }

    add(...components) {
        this.components = this.components.concat(components);
    }

    forEachComponent(fn) {
        this.components.forEach(cmp => {
            fn(cmp);

            cmp.forEachComponent(fn);
        });
    }

    compile() {
        if (this.template) {
            if (this.template.indexOf('.pug') !== -1) {
                return pug.compileFile(this.template);
            } else {
                return pug.compile(this.template)(this);
            }
        } else {
            return false;
        }
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

    getComponentData(data = []) {
        this.components.forEach(component => {
            let newDataObj = component.getData();

            data.push(newDataObj);

            component.getComponentData(data);
        });

        return data;
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
        console.log('adding event', this.cmpType, eventName);
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

    processEvent(eventName, page) {
        if (this.events[eventName]) {
            console.log(eventName);
            this.events[eventName](this);

            page.pushStateUpdate();
        }
    }

    // take in a data map and turn it into an object that can
    // be used within a pug template
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

            if (!result) {
                result = component.getComponentById(id);
            }
        });

        return result;
    }

    hasComponents() {
        if (this.components.length) {
            return true;
        }

        return false;
    }
};

export default AceComponent;
