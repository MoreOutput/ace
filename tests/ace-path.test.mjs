import test from 'ava';
import AcePath from '../core/ace-path';

// AcePath may change due while modules are being put into node.js
test('should give the url of the current module', t => {
    const expectedUrl = 'file://';
    const result = AcePath.getDir(expectedUrl);

    t.is(result, '');
});
