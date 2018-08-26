export default function handleData(componentData) {
    const attrName = 'data-ace-' + componentData.cmpType;
    let node = document.querySelector('[' + attrName + '="' + componentData.cmpId + '"]');
    let prop;

    if (node) {
        for (prop in componentData) {
            if (prop !== 'cmpType' && prop !== 'cmpId') {
                if (prop === 'text' || prop === 'value') {
                    node[prop] = componentData[prop];
                } else {
                    if (node[prop] && componentData[prop] === false || componentData[prop] === '') {
                        delete node[prop]
                    } else {
                        node.setAttribute(prop, componentData[prop]);
                    }
                }
            }
        }
    }
};
