import ElementComponent from '../element.ace.component';

class ButtonElementComponent extends ElementComponent {
    constructor(text = '') {
        super();

        const rootUrl = this.getDir(import.meta.url);

        this.text = text;
        this.template = rootUrl + '/button-element.ace.component.pug';
        this.script = 'button-element.ace.component.client';
    }
};

export default ButtonElementComponent;
