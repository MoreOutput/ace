# Ace

## Initializing Route

```js
    import Ace from './core/ace';
    import IndexPage from './pages/index.page';

    const ace = new Ace({port: 3000});

    ace.get('/', new IndexPage());
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
        this.alertDiv = new DivElementComponent('foo');

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
            this.alertDiv,
            this.usernameInput,
            this.passwordInput,
            this.loginButton,
            this.clearButton
        )
    }

    clearForm() {
        this.alertDiv.text = 'Fields Cleared';

        this.usernameInput.clear();
        this.passwordInput.clear();
    }

    login() {
        this.redirect(`/dashboard?username=${this.userNameInput.value}`);
    }
};

export default LoginForm;
```

Run with: node --experimental-modules app.mjs
