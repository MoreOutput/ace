import AceComponent from '../../core/ace.component';

import ElementComponent from '../elements/element.ace.component';
import InputElementComponent from '../elements/input/input-element.ace.component';
import ButtonElementComponent from '../elements/button/button-element.ace.component';
import DivElementComponent from '../elements/div/div-element.ace.component';
import VaadinTextField from '../vaadinTextField/vaadin-text-field.component';

const mjsPrefix = './components/elements/form/';

class LoginForm extends AceComponent {
    constructor() {
        super();

        this.alertDiv = new DivElementComponent();
        this.alertDiv.class = 'ace-alert';

        this.usernameInput = new InputElementComponent('Username');
        this.usernameInput.placeholder = 'Username';

        this.passwordInput = new InputElementComponent('Password');
        this.passwordInput.setPassword(true);

        this.loginButton = new ButtonElementComponent('Submit');
        this.loginButton.addEvent('onclick', buttonComponent => {
            this.login();
        });

        this.clearButton = new ButtonElementComponent('Clear');
        this.clearButton.addEvent('onclick', buttonComponent => {
            this.clearForm();
        });

        this.add(
            this.alertDiv,
            this.usernameInput,
            this.passwordInput,
            this.loginButton,
            this.clearButton
        );
    }

    clearForm() {
        this.alertDiv.text = 'Fields Cleared';
        this.usernameInput.clear();
        this.passwordInput.clear();
    }

    login() {
        this.redirect(`/dashboard?username=${this.usernameInput.value}`);
    }
};

export default LoginForm;
