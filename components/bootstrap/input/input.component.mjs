import BootstrapComponent from '../bootstrap.ace.component';
import { AcePath } from 'ace-framework';

class BootstrapInput extends BootstrapComponent {
    constructor(labelText = '') {
        super();

        const rootUrl = AcePath.getDir(import.meta.url);

        this.value = '';
        this.template = rootUrl + '/input.component.pug';
     //   this.script = 'input.client';
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

export default BootstrapInput;
