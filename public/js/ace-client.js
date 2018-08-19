(() => {
    const ws = new WebSocket('ws://127.0.0.1:3001');

    ws.addEventListener('message', function(r) {
		r = JSON.parse(r.data);
		
		if (r.route) {
			window.history.pushState(r.route.data, r.route.title, r.route.url);
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
