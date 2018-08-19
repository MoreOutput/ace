import ElementComponent from '../element.ace.component';

const mjsPrefix = './components/elements/button/';

class ButtonElementComponent extends ElementComponent {
    constructor(value = "") {
        super();

        this.value = value;
        this.template = mjsPrefix + 'button-element.ace.component.pug';
        this.script = 'button-element.ace.component.client';
    }
};

export default ButtonElementComponent;
