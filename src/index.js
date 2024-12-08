const OAuthAPI = require('./api/oauth');
const ServerAPI = require('./api/server');
const CountryAPI = require('./api/country');
const UserAPI = require('./api/user');
const NgIslandAPI = require('./api/ngisland');
const NabotAPI = require('./api/nabot');
const WebhooksAPI = require('./api/webhooks');

class NationsAPI {
    constructor(apiToken) {
        this.apiToken = apiToken;
        this.oauth = OAuthAPI(apiToken);
        this.server = ServerAPI(apiToken);
        this.country = CountryAPI(apiToken);
        this.user = UserAPI(apiToken);
        this.ngisland = NgIslandAPI(apiToken);
        this.nabot= new NabotAPI(apiToken);
        this.nabotInstance = this.createNabotAPIClass();
        this.webhooks = WebhooksAPI(apiToken);
    }

    createNabotAPIClass() {
        const apiToken = this.apiToken;
        return class extends NabotAPI {
            constructor() {
                super(apiToken);
                this.initialize();
            }
        };
    }
}

module.exports = NationsAPI;