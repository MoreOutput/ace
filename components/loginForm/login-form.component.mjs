import AceComponent from '../ace.component';

import InputElementComponent from '../elements/input/input-element.ace.component';
import ButtonElementComponent from '../elements/button/button-element.ace.component';

const mjsPrefix = './components/elements/form/';

class LoginForm extends AceComponent {
    constructor() {
        super();

        this.usernameInput = new InputElementComponent('Username');
        this.usernameInput.placeholder = 'Username';

        this.passwordInput = new InputElementComponent('Password');
        this.passwordInput.setPassword(true);

        this.loginButton = new ButtonElementComponent('Submit');
        this.loginButton.registerEvent('onclick', buttonComponent => {
            this.login();
        });

        this.clearButton = new ButtonElementComponent('Clear');
        this.clearButton.registerEvent('onclick', buttonComponent => {
            this.clearForm();
        });

        this.add(
            this.usernameInput,
            this.passwordInput,
            this.loginButton,
            this.clearButton
        )
    }

    clearForm() {
        this.usernameInput.clear();
        this.passwordInput.clear();
    }

    login() {
        console.log('Default Login');
    }
};

export default LoginForm;
