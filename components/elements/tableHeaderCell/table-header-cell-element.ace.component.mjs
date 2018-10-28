import { ElementComponent, AcePath } from 'ace-framework';

class TableHeaderCellElementComponent extends ElementComponent {
    constructor(text = '') {
        super();

        this.text = text;

        const rootUrl = AcePath.getDir(import.meta.url);
        this.template = rootUrl + '/table-header-cell-element.ace.component.pug';
        this.script = 'th-element.ace.component.client';
    }
};

export default TableHeaderCellElementComponent;
