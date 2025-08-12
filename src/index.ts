import OAuthAPI from './api/oauth';
import ServerAPI from './api/server';
import CountryAPI from './api/country';
import UserAPI from './api/user';
import NgIslandAPI from './api/ngisland';
import NabotAPI from './api/nabot';
import WebhooksAPI from './api/webhooks';

class NationsAPI {
    public oauth: ReturnType<typeof OAuthAPI>;
    public server: ReturnType<typeof ServerAPI>;
    public country: ReturnType<typeof CountryAPI>;
    public user: ReturnType<typeof UserAPI>;
    public ngisland: ReturnType<typeof NgIslandAPI>;
    public nabot: NabotAPI;
    public webhooks: ReturnType<typeof WebhooksAPI>;

    constructor(apiToken: string) {
        this.oauth = OAuthAPI(apiToken);
        this.server = ServerAPI(apiToken);
        this.country = CountryAPI(apiToken);
        this.user = UserAPI(apiToken);
        this.ngisland = NgIslandAPI(apiToken);
        this.nabot = new NabotAPI(apiToken);
        this.webhooks = WebhooksAPI(apiToken);
    }
}

export default NationsAPI;
