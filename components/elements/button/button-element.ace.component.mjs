import { ElementComponent, AcePath } from 'ace-framework';

class ButtonElementComponent extends ElementComponent {
    constructor(text = '') {
        super();

        const rootUrl = AcePath.getDir(import.meta.url);

        this.text = text;
        this.template = rootUrl + '/button-element.ace.component.pug';
        this.script = 'button-element.ace.component.client';
    }
};

export default ButtonElementComponent;
