import fs from 'fs';

import AceComponent from './ace-component';
import AceElement from '../components/elements/element.ace.component';

const GRID_STR = 'grid';
const INLINE_GRID_STR = 'inline-grid';
const ACE_LAYOUT_SUFFIX = '-al';

class Layout extends AceComponent {
    constructor(gridMap, elementType = 'div') {
        super();

        this.container = new AceElement(elementType);
        this.items = [];
        this.gridMap = gridMap;
        this.container.id = '';
        this.container.display = GRID_STR;
        this.container.class = 'ace-grid-container';
        this.layout = true;

        this.add(this.container);

        this.setGridMap();
    }

    setInline(inline = true) {
        if (inline) {
            this.container.display = GRID_STR;
        } else {
            this.container.display = INLINE_GRID_STR;
        }
    }

    setupItem(name) {
        const item = new AceElement('div');
        item.cmpId = name + ACE_LAYOUT_SUFFIX;
        item.class = item.cmpId;

        this.items.push(name);

        this.components[0].add(item);
    }

    // creates grid-area rules
    // items have ace-layout class name
    setGridMap() {
        this.gridMap.forEach(row => {
            row.split(' ').forEach(item => {
                if (this.items.indexOf(item) === -1) {
                    this.setupItem(item);
                }
            })
        });
    }

    addItem(itemName, component) {
        const cmp = this.components[0].getComponentById(itemName + ACE_LAYOUT_SUFFIX);

        if (cmp) {
            cmp.add(component);
        }
    }

    writeLayout() {
        const fileName = this.parent.ace.rootURL + 'public/styles/' + this.cmpType + '-al.css';
        let mapStr = '';
        let i = 0;

        for (i; i < this.gridMap.length; i += 1) {
            mapStr += '"' + this.gridMap[i].toString() + '"\n';
        }

        let str = '.ace-grid-container {\n' +
            'display: grid; \n' +
            'grid-template-areas: \n' + mapStr + '}\n' ;

        this.items.forEach(item => {
            str += '.' + item + '-al' + '{grid-area: ' + item.replace('-al', '') + '}\n';
        });

        fs.writeFileSync(fileName, str);
        
       return this.cmpType + '-al.css';
    }
}

export default Layout;
