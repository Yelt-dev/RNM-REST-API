import LocationsRoutes from "./routes/locations.routes";
import CharactersRoutes from "./routes/characters.routes";
import CategoriesRoutes from "./routes/categories.routes";
import IndexRoutes  from "./routes/index.routes";
import UsersRoutes from "./routes/users.routes";
import AuthRoutes from "./routes/auth.routes";
import express, {Application} from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

export class  App {

    private app: Application;

    constructor(private port?: number | string){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('port', this.port || process.env.PORT || 3000);
        this.app.use('/api/public' , express.static('public'));
    }

    middlewares(){
        this.app.use(cors({'origin':'*', 'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'}));
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
        this.app.use(helmet());
    }

    routes(){
        this.app.use('/rnm/api', IndexRoutes);
        this.app.use('/rnm/api/categories', CategoriesRoutes);
        this.app.use('/rnm/api/characters', CharactersRoutes);
        this.app.use('/rnm/api/locations', LocationsRoutes);
        this.app.use('/rnm/api/users', UsersRoutes);
        this.app.use('/rnm/api/auth', AuthRoutes);
    }
    
    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log('Server running on port', this.app.get('port'));
    }
}
