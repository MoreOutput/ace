# Ace

Example Page:

```js
import AcePage from "../core/ace-page";
import InputElementComponent from "../components/elements/input/input-element.ace.component";

class IndexPage extends AcePage {
    constructor(req, res) {
        super(req, res);
    }

    setup() {
        this.title = 'Test Index';
        this.usernameInput = new InputElementComponent();
        this.usernameInput.placeholder = 'Username';
        this.passwordInput = new InputElementComponent();

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
```

Run with: node --experimental-modules app.mjs
