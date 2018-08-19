import ElementComponent from '../element.ace.component';

const mjsPrefix = './components/elements/button/';

class ButtonElementComponent extends ElementComponent {
    constructor(text = '') {
        super();

        this.text = text;
        this.template = mjsPrefix + 'button-element.ace.component.pug';
        this.script = 'button-element.ace.component.client';
    }
};

export default ButtonElementComponent;
