import Ace from './core/ace';
import IndexPage from './pages/index.page';

const ace = new Ace({port: 3000});

ace.get('/', new IndexPage());
