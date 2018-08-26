
(() => {
	const ws = new WebSocket('ws://127.0.0.1:3001');
	const handleIncomingData = (data) => {
		if (data.handlerFile) {
			import('./' + data.handlerFile + '.js').then(module => {
				module.default(data);
			}).catch(err => {
				console.warn(data.cmpType + ' Client Data Handler not found!', err);
			});
		}
	};

	ws.addEventListener('message', function(r) {
		r = JSON.parse(r.data);

		console.log(r);

		if (r.route) {
			window.history.pushState(r.route.data, r.route.title, r.route.url);

			document.title = r.route.title;
		}

		if (r.length) {
			let i = 0;

			for (i; i < r.length; i += 1) {
				handleIncomingData(r[i]);
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
