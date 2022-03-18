/*import ProductsCategoriesRoutes from "./routes/products.categories.routes";
import ProductsPictureRoutes from "./routes/products.pricture.route";
import DataProductsRoutes from "./routes/data.product.routes";
import NotificationRoutes from "./routes/notification.routes";
import CategoriesRoutes from "./routes/categories.routes";
import UserRoleRoutes from "./routes/user.role.routes";
import ProductsRoutes  from "./routes/products.routes";
import ClientsRoutes from "./routes/clients.routes";
import AddressRoutes from "./routes/address.routes";
import WalletRoutes from "./routes/wallet.routes";
import OrdersRoutes from "./routes/orders.routes";
;
import UsersRoutes from "./routes/users.routes";
import AuthRoutes from "./routes/auth.routes";*/
import CategoriesRoutes from "./routes/categories.routes"
import IndexRoutes  from "./routes/index.routes";
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
        this.app.use('/rnm/api/categories', CategoriesRoutes)
        /*this.app.use('/api/products', ProductsRoutes);
        this.app.use('/api/data-products', DataProductsRoutes);
        this.app.use('/api/products-categories', ProductsCategoriesRoutes);
        this.app.use('/api/address', AddressRoutes);
        this.app.use('/api/categories', CategoriesRoutes);
        this.app.use('/api/product-images', ProductsPictureRoutes);
        this.app.use('/api/users', UsersRoutes);
        this.app.use('/api/user-role', UserRoleRoutes);
        this.app.use('/api/wallet', WalletRoutes);
        this.app.use('/api/clients', ClientsRoutes);
        this.app.use('/api/orders', OrdersRoutes);
        this.app.use('/api/auth', AuthRoutes);
        this.app.use('/api/push', NotificationRoutes);*/
    }
    
    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log('Server running on port', this.app.get('port'));
    }
}
