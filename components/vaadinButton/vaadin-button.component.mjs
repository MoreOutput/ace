import AceComponent from '../../core/ace-component';

// https://vaadin.com/components/vaadin-grid/html-examples/grid-basic-demos
class VaadinGrid extends AceComponent {
    constructor(data, columns = []) {
        super();

        const rootUrl = this.getDir(import.meta.url);
        this.data;
        this.columns = columns;
        this.template = rootUrl + '/vaadin-grid.component.pug';
        this.links = [
            'vaadin-grid/vaadin-grid',
            'vaadin-grid/vaadin-grid-sorter'
        ];
        this.handlerFile = 'vaadin.handler';

        this.setData(data);
    }

    setup() { return; }

    getDataMap() {
        return [
            'data',
            'columns'
        ];
    }

    setData(data) {
        this.data = JSON.stringify(data);
    }

    getColumn() {
        return {
            header: '',
            body: null,
            footer: '',
            width: '',
            sortable: false
        };
    }

    addColumns(cols) {
        this.columns = [...cols];
    }
};

export default VaadinGrid;
