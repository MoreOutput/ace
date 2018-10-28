import { VaadinTextField, AcePath } from 'ace-framework';

class VaadinPasswordField extends VaadinTextField {
    constructor(label = '', placeholder = '') {
        super(label, placeholder);

        const rootUrl = AcePath.getDir(import.meta.url);

        this.template = rootUrl + '/vaadin-password-field.component.pug';
        this.link = 'vaadin-text-field/src/vaadin-password-field';
    }
};

export default VaadinPasswordField;
