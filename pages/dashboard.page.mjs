import AcePage from '../core/ace-page';
import LoginForm from '../components/loginForm/login-form.component';

class DashboardPage extends AcePage {
    constructor() {
        super('/');
    }

    setup() {
        this.title = 'Dashboard';
        this.form = new LoginForm();

        this.add(this.form);
    }
};

export default DashboardPage;
