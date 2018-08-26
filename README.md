# Ace

## Initializing Route

```js
    import Ace from './core/ace';

    new Ace({port: 3000});

```

## Custom Page

```js
import AcePage from '../core/ace-page';
import LoginForm from '../components/loginForm/login-form.component';

class IndexPage extends AcePage {
    constructor() {
        super();
    }

    setup() {
        this.title = 'Test Index';
        this.form = new LoginForm();
        this.add(this.form);
    }
};

export default IndexPage;

```

## Custom Component

```js
import AceComponent from '../ace.component';

import InputElementComponent from '../elements/input/input-element.ace.component';
import ButtonElementComponent from '../elements/button/button-element.ace.component';
import DivElementComponent from '../elements/div/div-element.ace.component';

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
```

An example of wrapping an exisiting web component: (install vaadin-text-field with bower):


```js
import VaadinTextField from '../vaadinTextField/vaadin-text-field.component';

        this.vaadinField = new VaadinTextField('البادئة و اللاحقة');
        this.vaadinField.required = true;
        this.vaadinField.maxlength = 2;
        this.vaadinField.setPreventValidInput(true);
        this.vaadinField.setErrorMessage('Error message');
        this.vaadinField.pattern = '[0-9]';
        this.vaadinField.setPrefix('$');
```

Run with: node --experimental-modules app.mjs
