"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CacheService_1 = require("./CacheService");
class UserService {
    constructor() {
        this.users = [
            {
                id: 1,
                name: 'John Papa'
            },
            {
                id: 2,
                name: 'Mosh Hamedani'
            }
        ];
    }
    getUser(id) {
        return CacheService_1.cacheSvc.get(`user_${id}`, () => __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(this.users.find(x => x.id === id));
                }, 2000);
            });
        }));
    }
}
exports.userSvc = new UserService();
