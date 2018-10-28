import { AceComponent, AcePath } from 'ace-framework';

class ElementComponent extends AceComponent {
    constructor(element = '') {
        super();

        const rootUrl = AcePath.getDir(import.meta.url);

        this.element = element;
        this.template = rootUrl + '/element.ace.component.pug';
        this.handlerFile = 'ace-element.handler';
    }

    getDataMap() {
        return [
            'bgcolor',
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
