import pug from 'pug';

class AceComponent {
    constructor() {
        this.cmpId = this.generateId();
        this.cmpType = this.constructor.name;
        this.script = "";
        this.template = "";
        this.markup;
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
};

export default AceComponent;
