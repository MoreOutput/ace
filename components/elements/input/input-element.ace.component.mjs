import ElementComponent from '../element.ace.component';

const mjsPrefix = './components/elements/input/';

class InputElementComponent extends ElementComponent {
    constructor(value = "") {
        super();

        this.value = value;
        this.template = mjsPrefix + 'input-element.ace.component.pug';
        this.script = 'input-element.ace.component.client';
    }
};

export default InputElementComponent;
