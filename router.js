const DOCUMENT_URL = document.URL;

class RouterJs {
    constructor () {
        this.routes = {};
        this.param = null;
    }
    isHTTPS() {
        let string = DOCUMENT_URL.substring(0, 8);
        if (string.match('https://') != null) {
            return true;
        }
        return false;
    }
    getPath() {
        let APP_URL = (this.isHTTPS(DOCUMENT_URL) ? 'https://' : 'http://') + document.domain;
        return DOCUMENT_URL.replace(APP_URL, '');
    }
    checkRoute(key) {
        let keys = Object.keys(this.routes);
        let index = -1;
        keys.forEach(function(v, i) {
            let self = this;
            let pointLength = v.indexOf(':');
            let newKey = v;
            if (pointLength > 0) {
                newKey = v.substring(0, pointLength);
            } 
            if (key.indexOf(newKey) != -1) {
                index = i;
            }
        });
        if (index > -1) {
            return keys[index];
        }
        return false;
    }
    setRoutes(routes) {
        this.routes = routes;
    }
    init() {
        let APP_PATH = this.getPath();
        let key = this.checkRoute(APP_PATH);
        if (key) {
            if (APP_PATH != key) {
                this.param = APP_PATH.replace(key, '');
            }
            this.routes[key]();
        }
    }
}

let Router = new RouterJs;
Router.setRoutes({
    '/events/:event': function() {
        require('./listen');
    },
    //...continue
});
Router.init();