import AcePage from '../core/ace-page';
import LoginForm from '../components/loginForm/login-form.component';

class IndexPage extends AcePage {
    constructor(req, res) {
        super(req, res);
    }

    setup() {
        this.title = 'Test Index';
        
        this.form = new LoginForm();

        this.add(this.form);
    }
};

export default IndexPage;
