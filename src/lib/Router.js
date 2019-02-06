const {parse} = require('url');
const {resolve, basename} = require('path');
const {readdirSync: read} = require('fs');

/**
 *
 * @param method
 * @param pathname
 * @return {string}
 */
const getRouteKey = (method, pathname) => `${method.toUpperCase()}:${pathname}`;

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 24.12.2018
 * Time: 07:37
 */
class Router {

    /**
     *
     * @param fallback
     */
    constructor(fallback) {
        this._fallback = fallback;
        this._routes = {};
        this._middlewares = [];
    }

    /**
     *
     * @param req
     * @param res
     * @return {*}
     */
    route(req, res) {
        const {_fallback: fallback} = this;
        const {url, method} = req;
        const {pathname, query} = parse(url, true);

        if (this.has(method, pathname)) {
            const handler = this.get(method, pathname);
            return handler({req, res, query});
        }

        return fallback(req, res);
    }

    /**
     *
     * @param root
     */
    register(root) {
        root = resolve(root);

        const register = (path) => {
            const absolute = resolve(path);

            const map = (name) => {
                const pointer = resolve(absolute, name);

                if (!name.includes('.js')) {
                    return register(pointer);
                }

                const handler = require(pointer);
                const method = basename(name, '.js');

                const pathname = path
                    .replace(root, '')
                    .replace(/\\/g, '/')
                ;

                this.on(method, pathname, handler);
            };

            read(path)
                .map(map)
            ;
        };

        register(root);
    }

    /**
     *
     * @param method
     * @param pathname
     * @param handler
     * @return {Router}
     */
    on(method, pathname, handler) {
        const {_middlewares: middlewares} = this;
        const route = getRouteKey(method, pathname);

        this._routes[route] = middlewares
            .reduce((fn, next) => (next(fn)), handler,
        );

        return this;
    }

    /**
     *
     * @param middleware
     * @return {Router}
     */
    use(middleware) {
        this._middlewares.unshift(middleware);

        return this;
    }

    /**
     *
     * @param method
     * @param pathname
     * @return {boolean}
     */
    has(method, pathname) {
        return !!this.get(method, pathname);
    }

    /**
     *
     * @param method
     * @param pathname
     * @return {*}
     */
    get(method, pathname) {
        const {_routes: routes} = this;
        const route = getRouteKey(method, pathname);

        return routes[route];
    }
}

module.exports = Router;
