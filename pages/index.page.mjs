import AcePage from "../core/ace-page";
import InputElementComponent from "../components/elements/input/input-element.ace.component";

class IndexPage extends AcePage {
    constructor(req, res) {
        super(req, res);
    }

    setup() {
        this.title = 'Test Index';
        this.usernameInput = new InputElementComponent('Hello');
        this.passwordInput = new InputElementComponent('Testing');

        this.usernameInput.oninput = (component) => {
            console.log('New Value', component.value);
        };

        this.add(
            this.usernameInput,
            this.passwordInput
        );
    }
};

export default IndexPage;
