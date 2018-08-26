import ElementComponent from '../element.ace.component';

const mjsPrefix = './components/elements/div/';

class DivElementComponent extends ElementComponent {
    constructor(text = '', id = '') {
        super();

        this.text = text;
        this.id = '';
        this.template = mjsPrefix + 'div-element.ace.component.pug';
        this.script = 'div-element.ace.component.client';
    }

    setDirection(dir) {
        this.dir = dir;
    }
};

export default DivElementComponent;
