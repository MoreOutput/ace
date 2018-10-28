import { ElementComponent, AcePath } from 'ace-framework';

class TableFooterElementComponent extends ElementComponent {
    constructor(tableProfile = {}) {
        super();

        this.tableProfile = tableProfile;

        const rootUrl = AcePath.getDir(import.meta.url);
        this.template = rootUrl + '/table-footer-element.ace.component.pug';
    }
};

export default TableFooterElementComponent;
