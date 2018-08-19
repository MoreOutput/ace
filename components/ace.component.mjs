import pug from 'pug';

class AceComponent {
    constructor() {
        this.cmpId = this.generateId();
        this.cmpType = this.constructor.name;
        this.script = '';
        this.template = '';
        this.events = {};
        this.markup;
        this.pug = pug;
        this.components = [];
    }

    add() {
        this.components = [...arguments];
    }

    compile() {
        return pug.compileFile(this.template);
    }

    generateId() {
        return Math.floor(Math.random() * (9999 - 1) + 1).toString();
    }

    update(updateObj) {
        for (const prop in updateObj) {
            if (this[prop] !== undefined) {
                this[prop] = updateObj[prop];
            }
        }
    }

    registerEvent(eventName, callback) {
        this.events[eventName] = callback;
    }

    processEvent(eventName) {
        if (this.events[eventName]) {
            this.events[eventName](this);
        }
    }
};

export default AceComponent;
