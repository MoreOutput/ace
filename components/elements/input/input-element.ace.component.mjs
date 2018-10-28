import { ElementComponent, AcePath } from 'ace-framework';

class InputElementComponent extends ElementComponent {
    constructor(labelText = '', placeholder = '') {
        super();

        const rootUrl = AcePath.getDir(import.meta.url);

        this.value = '';
        this.template = rootUrl + '/input-element.ace.component.pug';
        this.script = 'input-element.ace.component.client';
        this.placeholder = placeholder;
        this.labelText = labelText;
    }

    setPassword(isPassword) {
        if (isPassword) {
            this.type = 'password';
        } else {
            this.type = 'text';
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
