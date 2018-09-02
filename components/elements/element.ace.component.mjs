import AceComponent from '../../core/ace.component';

class ElementComponent extends AceComponent {
    constructor(element = '') {
        super();

        const rootUrl = this.getDir(import.meta.url);

        this.element = element;
        this.template = rootUrl + '/element.ace.component.pug';
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
