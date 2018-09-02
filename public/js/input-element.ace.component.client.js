(() => {
    const cmpType = 'InputElementComponent';
    const attrName = 'data-ace-' + cmpType;
    let nodes = document.querySelectorAll('input[' + attrName + ']');

    nodes.forEach(element => {
        const id = element.getAttribute(attrName);

        element.oninput = (evt) => {
            document.socket.send(JSON.stringify({
                cmpId: id,
                value: element.value,
                event: 'oninput',
                id: document.aceSessionId
            }));
        };
    });
})();