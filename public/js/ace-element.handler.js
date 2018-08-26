export default function handleData(componentData) {
    const attrName = 'data-ace-' + componentData.cmpType;
    let node = document.querySelector('[' + attrName + '="' + componentData.cmpId + '"]');
    let prop;

    if (node) {
        for (prop in componentData) {
            if (prop !== 'cmpType' && prop !== 'cmpId') {
                if (prop === 'text') {
                    node.innerHTML = componentData.text;
                } else {
                        if (node[prop] !== undefined && node[prop] !== componentData[prop]) {
                        node[prop] = componentData[prop];
                    }
                }
            }
        }
    }
};
