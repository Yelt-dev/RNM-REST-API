import {App} from './app';
import config from './lib/config'

async function main(){
    const app = new App(config.port);
    await app.listen();
}

main();