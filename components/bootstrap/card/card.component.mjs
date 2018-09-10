import BootstrapComponent from '../bootstrap.ace.component';

class BootstrapCard extends BootstrapComponent {
    constructor(text = '') {
        super();

        const rootUrl = this.getDir(import.meta.url);

        this.value = '';
        this.template = rootUrl + '/card.component.pug';
     //   this.script = 'input.client';
        this.text = text;
    }
};

export default BootstrapCard;
