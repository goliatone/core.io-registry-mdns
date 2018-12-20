'use strict';

const Client = require('./client');
const client;

module.exports = function $initPersistence(context, config) {

    const _logger = context.getLogger('persistence');

    if (!client) {
        _logger.info('start mdns services...');
        client = new Client(config);
        client.register(context, config);
        client.start();
    }

    if (!config.register) {
        _logger.info('stop mdns services...');
        client.stop();
    }

    return Promise.resolve({ success: true, value: {} });

};