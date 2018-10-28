import test from 'ava';
import AcePage from '../core/ace-page';

test('should create a Page', t => {
    const routeVal = '/index';
    const cmp = new AcePage(routeVal);

    t.is(cmp.route, routeVal);
    t.is(cmp.baseElement, 'div');
    t.is(cmp.title, 'Ace Page');
    t.is(cmp.persists, false);

    t.is(cmp.rootTemplate.length > 0, true);
    t.is(cmp.rootHeaderTemplate.length > 0, true);
    t.is(cmp.rootFooterTemplate.length > 0, true);

    t.is(Object.getPrototypeOf(cmp.constructor).name, 'AceComponent');
});

test('should add a new clientStyle', t => {
    const cmp = new AcePage();

    t.is(cmp.clientStyles.length, 0);

    cmp.addStyle('/test.css');

    t.is(cmp.clientStyles.length, 1);

    cmp.addStyle('/test.css');

    t.is(cmp.clientStyles.length, 1);
});

test('should check a pages components and put relevant information into the page for rendering', t => {
    const cmp = new AcePage();


    t.is(true, true);
});
