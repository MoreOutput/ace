// Sends messages over websockets that trigger browser routing
class AceRoute {
    constructor(io) {
        this.io = io;
    }

    redirect(route = '/', data = {}, title = '') {
        this.io.send(JSON.stringify({
            route: {
                url: route,
                data: data,
                title: title
            },
        }));
    }
};

export default AceRoute;
