import AceComponent from '../ace.component';

class ElementComponent extends AceComponent {
    constructor() {
        super();
    }

    getData() {
        let result = {};
        let prop;
        let valueMap = this.getDataMap();

        for (prop in this) {
            if (typeof this[prop] !== 'function' && valueMap.indexOf(prop) !== -1) {
                result[prop] = this[prop];
            }
        }

        return result;
    }

    getDataMap() {
        return [
            'value',
            'type',
            'style',
            'id',
            'text',
            'class',
            'labelText'
        ]
    }
};

export default ElementComponent;
