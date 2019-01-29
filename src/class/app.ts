
import * as bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
import * as restify from 'restify';

class App {

    public app: restify.Server;

    constructor() {}

    public crateteServer() {
         this.app = restify.createServer();
         this.config();

         return this.app;
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
    }

}

export const app = new App().crateteServer();
