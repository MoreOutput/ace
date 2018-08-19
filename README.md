# Ace

```js
    import Ace from './core/ace';
    import IndexPage from './pages/index.page';

    const ace = new Ace({port: 3000});

    ace.get('/', new IndexPage());
```

```js
import AcePage from "../core/ace-page";
import InputElementComponent from "../components/elements/input/input-element.ace.component";

class IndexPage extends AcePage {
    constructor(req, res) {
        super(req, res);
    }

    setup() {
        this.title = 'Test Index';
        this.firstName = new InputElementComponent();
        this.firstName.placeholder = 'Username';

        this.firstName.oninput = (component) => {
            console.log('New First Name', component.value);
        };

        this.add(
            this.firstName,
        );
    }
};

export default IndexPage;
```

Run with: node --experimental-modules app.mjs
