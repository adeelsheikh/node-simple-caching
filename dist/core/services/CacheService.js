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
class CacheService {
    constructor() {
        this.collection = {};
    }
    clearCache() {
        this.collection = {};
    }
    containsKey(key) {
        return key in this.collection;
    }
    get(key, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (!this.collection[key]) {
                    yield this.set(key, callback);
                }
                resolve(this.collection[key]);
            }));
        });
    }
    getValue(key, value) {
        this.setValue(key, value);
        return this.collection[key];
    }
    set(key, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                this.collection[key] = yield callback();
                resolve();
            }));
        });
    }
    setValue(key, value) {
        if (this.collection[key]) {
            return this.collection[key];
        }
        this.collection[key] = value;
    }
    removeKey(key) {
        delete this.collection[key];
    }
}
exports.cacheSvc = new CacheService();
