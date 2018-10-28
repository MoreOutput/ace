import { ElementComponent, AcePath } from 'ace-framework';

class TableDataElementComponent extends ElementComponent {
    constructor(text = '') {
        super();

        this.text = text;

        const rootUrl = AcePath.getDir(import.meta.url);
        this.template = rootUrl + '/table-data-element.ace.component.pug';
    }
};

export default TableDataElementComponent;
