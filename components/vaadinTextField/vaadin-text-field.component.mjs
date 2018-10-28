import { AceComponent, DivElementComponent, AcePath } from 'ace-framework';

// https://vaadin.com/components/vaadin-text-field/html-examples/text-field-lumo-theme-demos
class VaadinTextField extends AceComponent {
    constructor(label = '', placeholder = '') {
        super();

        const rootUrl = AcePath.getDir(import.meta.url);

        this.template = rootUrl + '/vaadin-text-field.component.pug';
        this.link = 'vaadin-text-field/vaadin-text-field';
        this.handlerFile = 'vaadin.handler';
        this.label = label;
        this.required = '';
        this.disabled = '';
        this.readonly = '';
        this.invalid = ''
        this.value = '';
        this.rightToLeft;
        this.wrapperDiv;
        this.slotDiv;
        this.slot;
        this.placeholder = placeholder;
        this.slotText;
    }

    setup() {
        if (this.rightToLeft !== undefined && this.rightToLeft !== null) {
            this.parent.removeComponentById(this.cmpId);

            this.wrapperDiv = new DivElementComponent();
            this.wrapperDiv.class = 'wrapper-' + this.cmpType + '-' + this.cmpId;
            this.wrapperDiv.add(this);

            this.setRightToLeft(this.rightToLeft);

            this.parent.add(this.wrapperDiv);
        }

        if (this.slot) {
            this.slotDiv = new DivElementComponent();
            this.slotDiv.class = 'slot-' + this.cmpType + '-' + this.cmpId;
            this.slotDiv.text = this.slotText;
            this.slotDiv.slot = this.slot;

            this.add(this.slotDiv);
        }
    }

    setErrorMessage(msg) {
        this['error-message'] = msg;
    }

    setPreventValidInput(prevent) {
        this['prevent-invalid-input'] = prevent;
    }   

    setRightToLeft(isRtl) {
        if (this.wrapperDiv) {
            if (isRtl || !arguments.length) {
                this.wrapperDiv.setDirection('rtl');
            } else {
                this.wrapperDiv.setDirection('ltr');
            }
        }
    }

    setPrefix(str) {
        this.slot = 'prefix';
        this.slotText = str;
    }

    setSuffix(str) {
        this.slot = 'suffix';
        this.slotText = str;
    }

    clear() {
        this.value = '';
    }

    getDataMap() {
        return [
            "label",
            "autocomplete",
            "autocorrect",
            "autocapitalize",
            "autofocus",
            "disabled",
            "maxlength",
            "minlength",
            "pattern",
            "placeholder",
            "readonly",
            "required",
            "title",
            "value",
            "invalid",
            "error-message",
            "prevent-invalid-input",
            "pattern",
            "theme"
        ];
    }
};

export default VaadinTextField;
