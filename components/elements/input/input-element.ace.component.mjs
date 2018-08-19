import ElementComponent from '../element.ace.component';

const mjsPrefix = './components/elements/input/';

class InputElementComponent extends ElementComponent {
    constructor(labelText = '') {
        super();

        this.value = '';
        this.template = mjsPrefix + 'input-element.ace.component.pug';
        this.script = 'input-element.ace.component.client';
        this.labelText = labelText;
    }

    setPassword(isPassword) {
        if (isPassword) {
            this.type = 'password';
        } else {
            this.type = '';
        }
    }

    clear() {
        this.value = '';
    }

    setLabel(str) {
        this.labelText = str;
    }
};

export default InputElementComponent;
