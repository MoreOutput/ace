import ElementComponent from '../element.ace.component';

class DivElementComponent extends ElementComponent {
    constructor(text = '', id = '') {
        super();

        const rootUrl = this.getDir(import.meta.url);

        this.text = text;
        this.id = '';
        this.template = rootUrl + '/div-element.ace.component.pug';
        this.script = 'div-element.ace.component.client';
    }

    setDirection(dir) {
        this.dir = dir;
    }
};

export default DivElementComponent;
