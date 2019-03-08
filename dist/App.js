"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CacheService_1 = require("./core/services/CacheService");
const UserService_1 = require("./core/services/UserService");
class App {
    constructor(port) {
        this.root = './';
        this.app = express_1.default();
        this.port = port;
        this.initializeMiddleware();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
    initializeMiddleware() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.get('/', (req, res) => {
            res.send('API is up and running.');
        });
        this.app.get('/api/cache/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield UserService_1.userSvc.getUser(+req.params.id);
            res.send(user);
        }));
        this.app.get('/api/cache/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield UserService_1.userSvc.getUser(+req.params.id);
            res.send(user);
        }));
        this.app.delete('/api/cache/:id', (req, res) => {
            CacheService_1.cacheSvc.removeKey(`user_${+req.params.id}`);
            res.send('User is deleted.');
        });
        this.app.post('/api/cache/clear', (req, res) => {
            CacheService_1.cacheSvc.clearCache();
            res.send('Cache is cleared.');
        });
    }
}
exports.default = App;
