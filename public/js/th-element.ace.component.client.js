(() => {
    const cmpType = 'TableHeaderCellElementComponent';
    const attrName = 'data-ace-' + cmpType;
    let nodes = document.querySelectorAll('th[' + attrName + ']');

    nodes.forEach(element => {
        const id = element.getAttribute(attrName);

        element.onclick = (evt) => {
            document.socket.send(JSON.stringify({
                cmpId: id,
                event: 'onclick',
                id: document.aceSessionId
            }));
        };
    });
})();