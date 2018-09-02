# Ace

Install with:

```js
npm install ace-framework
```

## App File Setup (define at app root, /)

```js
import { Ace } from 'ace-framework';

import IndexPage from './pages/login.page';

new Ace({
    indexPage: {
        page: IndexPage,
        route: '/'
    }
});

```

## Custom Page (define in dir named /pages)

```js
import { AcePage } from 'ace-framework';

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

## Custom Component (define in dir named /components)

```js

import {
    AceComponent,
    InputElementComponent
    ButtonElementComponent,
    DivElementComponent
} from 'ace-framework';

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

View the included VaadinTextField component to see how to create an ace component from existing web components.

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
