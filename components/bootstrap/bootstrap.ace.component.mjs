import AceComponent from '../../core/ace.component';

class BootstrapComponent extends AceComponent {
    constructor(element = '') {
        super();

        const rootUrl = this.getDir(import.meta.url);

        this.element = element;
        this.template = rootUrl + '/bootstrap.ace.component.pug';
        // this.handlerFile = 'ace-bootstrap.handler';
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
            'smallText',
            'placeholder',
            'dir',
            'slot'
        ]
    }
};

export default BootstrapComponent;
