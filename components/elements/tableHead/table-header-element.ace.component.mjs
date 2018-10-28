import { ElementComponent, AcePath } from 'ace-framework';

class TableHeaderElementComponent extends ElementComponent {
    constructor(tableProfile = {}) {
        super();

        this.tableProfile = tableProfile;

        const rootUrl = AcePath.getDir(import.meta.url);
        this.template = rootUrl + '/table-header-element.ace.component.pug';
    }
};

export default TableHeaderElementComponent;
