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
        this.page;
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

    getData() {
        return {};
    }

    getComponentData() {
        let data = [];

        this.page.components.forEach(component => {
            let newDataObj = component.getData();
            newDataObj.cmpId = component.cmpId;
            newDataObj.cmpType = component.cmpType;

            data.push(newDataObj);

            component.components.forEach(nestedComponent => {
                let nestedDataObj = nestedComponent.getData();
                nestedDataObj.cmpId = nestedComponent.cmpId;
                nestedDataObj.cmpType = nestedComponent.cmpType;

                data.push(nestedDataObj);
            });
        });

        return data;
    }

    pushStateUpdate() {
        let data = this.getComponentData();

        this.page.ace.io.send(JSON.stringify(data));
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

            this.pushStateUpdate();
        }
    }
};

export default AceComponent;
