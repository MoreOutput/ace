import AcePage from '../core/ace-page';
import LoginForm from '../components/loginForm/login-form.component';
import AceButtonElement from '../components/elements/button/button-element.ace.component';

class LoginPage extends AcePage {
    constructor() {
        super();
    }

    setup() {
        this.title = 'Login';
        this.form = new LoginForm();
        this.routingBtn = new AceButtonElement('Route');

        this.routingBtn.addEvent('onclick', (cmp) => {
            this.redirect(`/`);
        });

        this.add(this.form, this.routingBtn);
    }
};

export default LoginPage;
