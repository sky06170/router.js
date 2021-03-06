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
        for (let i=0; i<keys.length; i++) {
            let v = keys[i];
            let pointLength = v.indexOf(':');
            let newKey = v;
            if (pointLength > 0) {
                newKey = v.substring(0, pointLength);
                if (key.substring(0, newKey.length) == newKey) {
                    this.setParam(key, newKey);
                    return keys[i];
                }
            } else {
                if (key == newKey) {
                    return keys[i];
                }
            }
        }
        return false;
    }
    setParam(key, newKey) {
        if (key != newKey) {
            this.param = key.replace(newKey, '');
        }
    }
    setRoutes(routes) {
        this.routes = routes;
    }
    init() {
        let APP_PATH = this.getPath();
        let key = this.checkRoute(APP_PATH);
        if (key) {
            this.routes[key]();
        }
    }
}