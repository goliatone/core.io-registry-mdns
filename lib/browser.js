'use strict';
const mdns = require('mdns');
const EventEmitter = require('events');

class Browser extends EventEmitter {

    constructor(config) {
        super();
    }

    start() {
        let browser = mdns.createBrowser(mdns.tcp('coreio'));

        browser.on('serviceUp', service => {
            console.log('service up: ', service);
            this.emit('service.up', { service });
        });

        browser.on('serviceDown', service => {
            console.log('service down: ', service);
            this.emit('service.down', { service });
        });

        browser.start();

        this.browser = browser;
    }

    stop() {
        this.browser.stop();
    }
}

if (require.main === module) {
    const browser = new Browser();
    browser.start();
}

module.exports = Browser;