import BootstrapComponent from '../bootstrap.ace.component';
import { AcePath } from 'ace-framework';

class BootstrapCard extends BootstrapComponent {
    constructor(text = '') {
        super();

        const rootUrl = AcePath.getDir(import.meta.url);

        this.value = '';
        this.template = rootUrl + '/card.component.pug';
     //   this.script = 'input.client';
        this.text = text;
    }
};

export default BootstrapCard;
