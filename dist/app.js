"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
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
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
        this.app.use('/api/public', express_1.default.static('public'));
    }
    middlewares() {
        this.app.use((0, cors_1.default)({ 'origin': '*', 'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE' }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use((0, helmet_1.default)());
    }
    routes() {
        this.app.use('/rnm/api', index_routes_1.default);
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
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log('Server running on port', this.app.get('port'));
        });
    }
}
exports.App = App;
