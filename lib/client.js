'use strict';

const mdns = require('mdns');
const EventEmitter = require('events');

//https://github.com/coqsenpate/node-mdns-native/blob/master/mdns-native.js
class Client extends EventEmitter {
    constructor(options) {
        super();
        this._services = new Set();
    }

    register(app, opts) {
        const config = app.config;

        let txtRecord, service, port;

        if (config.server) {
            txtRecord = {
                name: config.app.name,
                service: 'server'
            };

            port = parseInt(config.server.port);
            service = mdns.createAdvertisement(mdns.tcp('coreio'), port, { txtRecord });
            this._services.add(service);
        }

        if (config.repl && config.repl.enabled) {
            txtRecord = {
                name: config.app.name,
                service: 'repl'
            };
            port = parseInt(config.repl.port);
            service = mdns.createAdvertisement(mdns.tcp('coreio'), port, { txtRecord });
            this._services.add(service);
        }
    }

    start() {
        for (let service of this._services) {
            service.start();
        }
    }

    stop() {
        for (let service of this._services) {
            service.stop();
        }
    }

    close() {
        for (let service of this._services) {
            service.close();
        }
    }
}

module.exports = Client;