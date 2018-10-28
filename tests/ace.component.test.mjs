import test from 'ava';
import AceComponent from '../core/ace-component';

test('should create a component with a defined cmpId and cmpType', t => {
    const cmp = new AceComponent();

    t.is(cmp.cmpId.length > 0, true);
    t.is(cmp.cmpType.length > 0, true);
    t.is(Object.keys(cmp.events).length, 0);
    t.is(cmp.cmpType, cmp.constructor.name);
});

test('should add all passed in components', t => {
    const cmp = new AceComponent();

    t.is(cmp.components.length, 0);

    cmp.add({}, {}, {});

    t.is(cmp.components.length, 3);
});

test('should have a setup function', t => {
    const cmp = new AceComponent();

    t.is(typeof cmp.setup, 'function');
    t.is(cmp.setup(), undefined);
});

test('should return true if a compoment has child components', t => {
    const cmp = new AceComponent();

    cmp.add({});

    t.is(cmp.hasComponents(), true);
});

test('should return false if a compoment has no child components', t => {
    const cmp = new AceComponent();

    t.is(cmp.hasComponents(), false);
});

test('should update component properties with a passed object with the same properties', t => {
    const cmp = new AceComponent();
    const newValues = {
        cmpId: 'hello',
        cmpType: 'world',
        foo: 'bar'
    }

    cmp.update(newValues);

    t.is(cmp.cmpId, 'hello');
    t.is(cmp.cmpType, 'world');
    t.is(cmp.foo, undefined);
});

test('should return false when trying to compile a component with no template', t => {
    const cmp = new AceComponent();
    const template = cmp.compile();

    t.is(template, false);
});

test('should return a compiled template when compiling a component with a template', t => {
    const cmp = new AceComponent();
    const tmp = '<p #{test}></p>';

    cmp.test = 'test';
    cmp.template = tmp;

    const template = cmp.compile();

    t.is(template, '<p test></p>');
});

test('should throw an error when a template file cannot be found', t => {
    const cmp = new AceComponent();
    cmp.template = './mocks/test.pug';

    const err = t.throws(() => {
        cmp.compile()
    });

    t.is(err.message, 'ENOENT: no such file or directory, open \'./mocks/test.pug\'');
});

test('should generate an idea > 1 and < 10000', t => {
    const cmp = new AceComponent();
    const id = cmp.generateId();

    t.is(typeof id, 'string');
    t.is(parseInt(id) > 1, true);
    t.is(parseInt(id) < 10000, true);
});

test('should get a child component by id', t => {
    const cmp = new AceComponent();
    const mockChild = new AceComponent();
    mockChild.cmpId = '1';

    t.is(cmp.components.length, 0);

    cmp.add(mockChild);

    t.is(cmp.components.length, 1);
    t.is(cmp.getComponentById(mockChild.cmpId), mockChild);
    t.is(cmp.getComponentById('foo'), undefined);
});

test('should remove a child component by id', t => {
    let cmp = new AceComponent(),
    mockChild = new AceComponent(),
    mockChild2 = new AceComponent(),
    mockChild3 = new AceComponent();

    mockChild.cmpId = '1';
    mockChild2.cmpId = '2';
    mockChild3.cmpId = '3';

    mockChild2.add(mockChild3);
    cmp.add(mockChild);
    cmp.add(mockChild2);

    t.is(cmp.components.length, 2);

    cmp.removeComponentById('1');

    t.is(cmp.components.length, 1);
});

test('should return a string array of component event names', t => {
    const cmp = new AceComponent();
    let eventArr = cmp.getEvents();

    t.is(eventArr.length, 0);

    cmp.events = {foo: () => {}, bar: () => {}};
    
    eventArr = cmp.getEvents();

    t.is(Array.isArray(eventArr), true);
    t.is(eventArr.length, 2);
    t.is(eventArr.toString(), 'foo,bar');
});

test('should attach an event to a component', t => {
    const cmp = new AceComponent();
    let eventArr = cmp.getEvents();

    t.is(eventArr.length, 0);

    cmp.addEvent('testEvent', () => { return true });
    
    eventArr = cmp.getEvents();

    t.is(eventArr.length, 1);
    t.is(typeof cmp.events.testEvent, 'function');
});

test('should return an object representing all client side data important to a component with no getDataMap', t => {
    const cmp = new AceComponent();
    const data = cmp.getData();

    // These are the only given fields if a component does not have a getDataMap function
    t.is(data.cmpType, cmp.constructor.name);
    t.is(data.cmpId.length > 0, true);
    t.is(data.handlerFile, '');
});

test('should return an object representing all client side data', t => {
    let cmp = new AceComponent();
    cmp.foo = 'hello';
    cmp.bar = 'world';
    cmp.fizz = () => {};
    cmp.getDataMap = () => {
        return ['foo', 'bar', 'fizz', 'pop'];
    };

    const data = cmp.getData();

    t.is(data.foo, 'hello');
    t.is(data.bar, 'world');
    t.is(data.fizz, undefined);
    t.is(data.pop, undefined);
    t.is(data.cmpType, cmp.constructor.name);
    t.is(data.cmpId.length > 0, true);
    t.is(data.handlerFile, '');
});

test('should return an object representing an aggregate of the client-bound component data and any children', t => {
    let cmp = new AceComponent(),
    cmp2 = new AceComponent(),
    cmp3 = new AceComponent();

    cmp2.add(cmp3);
    cmp.add(cmp2);

    let cmpData = cmp.getComponentData();

    t.is(Array.isArray(cmpData), true);
    t.is(cmpData.length > 0, true);

    cmp2.getDataMap = () => {
        return [
            'foo',
            'bar'
        ];
    };

    cmp2.foo = 'hello';
    cmp2.bar = 'world';
    cmp2.test = 'fizz';

    cmpData = cmp.getComponentData()[0];

    t.is(cmpData.cmpType, 'AceComponent');
    t.is(typeof cmpData.cmpId, 'string');
    t.is(cmpData.handlerFile, '');
    t.is(cmpData.foo, 'hello');
    t.is(cmpData.bar, 'world');
    t.is(cmpData.test, undefined);
});

test('should process a given event', t => {
    const pageMock = {
        pushStateUpdate: () => {
            return true;
        }
    };
    let cmp = new AceComponent();

    cmp.events.onclick = () => {
        cmp.test = true; 
        return true;
     };

    cmp.processEvent('onclick', pageMock);
    cmp.processEvent('onfoo', undefined);

     t.is(cmp.test, true);
});

test('should return a pug template data map', t => {
    let cmp = new AceComponent();
    cmp.getDataMap = () => {
        return [
            'foo',
            'bar'
        ];
    };

    cmp.foo = 'hello';

    const map = cmp.getPugMap(cmp.getData());

    t.is(typeof map.cmpId, 'string');
    t.is(typeof map.cmpType, 'string');
    t.is(map.foo, 'hello');
    t.is(typeof map['data-ace-' + cmp.cmpType], 'string');
});
