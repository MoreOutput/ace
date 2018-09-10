(() => {
    const cmpType = 'ButtonElementComponent';
    const attrName = 'data-ace-' + cmpType;
    let nodes = document.querySelectorAll('button[' + attrName + ']');

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
