import { ElementComponent, AcePath } from 'ace-framework';

class TableBodyElementComponent extends ElementComponent {
    constructor() {
        super();

        const rootUrl = AcePath.getDir(import.meta.url);
        this.template = rootUrl + '/table-body-element.ace.component.pug';
    }
};

export default TableBodyElementComponent;
