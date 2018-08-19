import ElementComponent from '../element.ace.component';

const mjsPrefix = './components/elements/div/';

class DivElementComponent extends ElementComponent {
    constructor(text) {
        super();

        this.text = text;
        this.template = mjsPrefix + 'div-element.ace.component.pug';
        this.script = 'div-element.ace.component.client';
    }
};

export default DivElementComponent;
