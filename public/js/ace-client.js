(() => {
    const ws = new WebSocket('ws://127.0.0.1:3001');

    ws.addEventListener('message', function(r) {
		r = JSON.parse(r.data);

		if (r.route) {
			console.log('Routing Object', r.route);
			window.history.pushState(r.route.data, r.route.title, r.route.url);
			document.title = r.route.title;
		}

		if (r.length) {
			let i = 0;
			for (i; i < r.length; i += 1) {
				let componentData = r[i];
				const attrName = 'data-ace-' + componentData.cmpType;
				let node = document.querySelector('[' + attrName + '="' + componentData.cmpId + '"]');
				let prop;

				if (node) {
					for (prop in componentData) {
						if (prop !== 'cmpType' && prop !== 'cmpId') {
							if (prop === 'text') {
								node.innerHTML = componentData.text;
							} else {
								node[prop] = componentData[prop];
							}
						}
					}
				} else {
					console.warn('Ace node not found', attrName);
				}
			}
		}

		if (r.evt && !r.evt.data) {
			r.evt = new CustomEvent(r.evt);
			
			if (r.data) {
				r.evt.data = r.data;
			}

			document.dispatchEvent(r.evt);
		}
    });
    
    document.socket = ws;
})();
