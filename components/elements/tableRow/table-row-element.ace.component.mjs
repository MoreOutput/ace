import { 
    ElementComponent,
    TableDataElementComponent,
    AcePath
} from 'ace-framework';

class TableRowElementComponent extends ElementComponent {
    constructor(tableProfile = {}) {
        super();

        const rootUrl = AcePath.getDir(import.meta.url);
        this.template = rootUrl + '/table-row-element.ace.component.pug';
    }

    addData(tableRow) {
        let ele = new TableDataElementComponent(tableRow);

        this.add(ele);
    }
};

export default TableRowElementComponent;
