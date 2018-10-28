
(() => {
	const ws = new WebSocket('ws://127.0.0.1:3001');
	const handleIncomingData = (data) => {
		if (data.handlerFile) {
			import('./' + data.handlerFile + '.js').then(module => {
				handlerMap[data.handlerFile] = module.default;

				handlerMap[data.handlerFile](data);
			}).catch(err => {
				console.warn(data.cmpType + ' Client Data Handler not found!', err);
			});
		}
	};
	const idReq = new Request('/get-ace-sessionid');
	let handlerMap = {};

	fetch(idReq).then((r) => {
		return r.json();
	}).then(r => {
		document.aceSessionId = r.id;

		let style = document.getElementById('ace-styles');
		style.innerHTML = r.styles;
	});

	// TODO, refresh is having this message send more than once
	ws.addEventListener('message', function(r) {
		r = JSON.parse(r.data);

		console.log('message', r);

		if (r.route) {
			return window.location.href = r.route.url;
		}

		if (r.length) {
			let i = 0;

			for (i; i < r.length; i += 1) {
				handleIncomingData(r[i]);
			}
		}

		if (r.evt) {
			r.evt = new CustomEvent(r.evt);

			if (r.data) {
				r.evt.data = r.data;
			}

			document.dispatchEvent(r.evt);
		}
	});

	document.addEventListener('update', (r) => {
		const cmpType = r.cmpType;
		const attrName = 'data-ace-' + r.data.cmpType;
		let node = document.querySelector('[' + attrName + ']');

		if (node) {
			node.outerHTML = r.data.template;
		}

		if (r.data && r.data.scripts) {
			var head = document.getElementsByTagName('head')[0];

			r.data.scripts.forEach(str => {
				if (str) {
					const url = './js/' + str + '.js';
					let script = document.createElement('script');

					script.src = url;
					head.appendChild(script);
				}
			});

		}
	});

	document.socket = ws;
})();
