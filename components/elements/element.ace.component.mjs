import AceComponent from '../../core/ace.component';

const mjsPrefix = './components/elements/';

class ElementComponent extends AceComponent {
    constructor(element = '') {
        super();

        this.element = element;
        this.template = mjsPrefix + 'element.ace.component.pug';
        this.script = 'button-element.ace.component.client';
        this.handlerFile = 'ace-element.handler';
    }

    getDataMap() {
        return [
            'element',
            'value',
            'type',
            'style',
            'id',
            'text',
            'class',
            'labelText',
            'placeholder',
            'dir',
            'slot'
        ]
    }
};

export default ElementComponent;
