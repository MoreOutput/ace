import {
    ElementComponent,
    TableBodyElementComponent,
    TableRowElementComponent,
    TableHeaderElementComponent,
    TableDataElementComponent,
    TableHeaderCellElementComponent,
    TableFooterElementComponent,
    AcePath
} from 'ace-framework';

class TableElementComponent extends ElementComponent {
    constructor(data) {
        super();

        this.data = data;
        this.columns = {};
        this.tbody = new TableBodyElementComponent();
        this.tfooter = new TableFooterElementComponent();
        this.theader = new TableHeaderElementComponent();
        const rootUrl = AcePath.getDir(import.meta.url);
        this.template = rootUrl + '/table-element.ace.component.pug';
        this.script = 'table-element.ace.component.client';
        this.thisCol = '';

        let headerRow = new TableRowElementComponent();
        headerRow.cmpId = this.cmpId + '-thead-tr';
        this.theader.add(headerRow); // TODO atm the header is limited
    }
    
    // before load hook is called
    // before component setup, right after page setup
    beforeLoad() {
        let prop;

        this.tbody.components = [];
        this.components = [];

        for (prop in this.columns) {
            const col = this.columns[prop];

            col.header = false;

            if (!this.getHeader(prop) && col.headerDisplayFn && !col.header) {
                let headerCell = new TableHeaderCellElementComponent(col.headerDisplayFn(this.data));
                headerCell.cmpId =  prop + '-th';

                col.header = true;

                this.theader.components[0].add(headerCell);
            }
        }

        this.data.forEach((data, i) => {
            let tr = new TableRowElementComponent();
            tr.cmpId = this.cmpId + '-tr-' + i;

            for (prop in this.columns) {
                const col = this.columns[prop];
                let td = new TableDataElementComponent(col.valueDisplayFn(data));
                td.cmpId = prop + '-td-' + i;

                tr.add(td);
            } 

            this.tbody.add(tr);
        });

        if (this.theader.components.length) {
            this.add(this.theader);
        }

        this.add(this.tbody);

        if (this.tfooter.components.length) {
            this.add(this.tfooter);
        }
    }

    getColumn() {}

    addColumn(colName, displayFn) {
        let valueDisplayFn = (data) => {
            return data[colName];
        };

        if (typeof displayFn === 'function') {
            valueDisplayFn = displayFn;
        }

        this.columns[colName] = {
            id: colName,
            valueDisplayFn: valueDisplayFn,
            headerDisplayFn: '',
            header: false
        };

        this.thisCol = colName;

        return this;
    }

    setHeader(headerVal) {
        if (headerVal) {
            let valueDisplayFn = (data) => {
                return headerVal;
            };

            if (typeof headerVal === 'function') {
                valueDisplayFn = headerVal;
            }

            this.columns[this.thisCol].headerDisplayFn = valueDisplayFn;
        } else {
            throw(Error('Cannot set a falsey table header value.'));
        }

        if (this.rendered) {
            this.beforeLoad();

            this.page.sendComponentMessage(this, {
                evt: 'update',
                data: {
                    template: this.page.compileComponentRescursive(this)
                }
            });
        }
    }

    getHeader(colName) {
        return this.theader.getComponentById(colName + '-th');
    }
};

export default TableElementComponent;
