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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeagueLoader = exports.PlayerSummaryLoader = exports.EntryPicksLoader = exports.FixturesLoader = exports.EntryLoader = exports.EntryTransfersLoader = exports.EntryHistoryLoader = exports.EventLiveLoader = exports.bootStrapLoader = void 0;
var dataloader_1 = __importDefault(require("dataloader"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var node_cache_1 = __importDefault(require("node-cache"));
var cache = new node_cache_1.default({ stdTTL: 3600, checkperiod: 3650 });
var baseURI = 'https://fantasy.premierleague.com/api';
var request = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var cachedData, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cachedData = cache.get(url);
                if (!(cachedData == undefined)) return [3 /*break*/, 3];
                console.info("request: ".concat(url));
                return [4 /*yield*/, (0, node_fetch_1.default)(url, {
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Agent': 'graphql-fpl',
                        },
                    })];
            case 1:
                response = (_a.sent());
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                cache.set(url, data);
                return [2 /*return*/, data];
            case 3: return [2 /*return*/, new Promise(function (resolve) {
                    resolve(cachedData);
                })];
        }
    });
}); };
exports.bootStrapLoader = new dataloader_1.default(function (keys) { return __awaiter(void 0, void 0, void 0, function () {
    var dataArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(keys.map(function (key) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request("".concat(baseURI, "/bootstrap-static/"))];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); }))];
            case 1:
                dataArray = _a.sent();
                return [2 /*return*/, dataArray];
        }
    });
}); });
exports.EventLiveLoader = new dataloader_1.default(function (events) { return __awaiter(void 0, void 0, void 0, function () {
    var dataArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(events.map(function (event) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request("".concat(baseURI, "/event/").concat(event, "/live/"))];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); }))];
            case 1:
                dataArray = _a.sent();
                return [2 /*return*/, dataArray];
        }
    });
}); });
exports.EntryHistoryLoader = new dataloader_1.default(function (entryIds) { return __awaiter(void 0, void 0, void 0, function () {
    var dataArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(entryIds.map(function (entryId) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request("".concat(baseURI, "/entry/").concat(entryId, "/history/"))];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); }))];
            case 1:
                dataArray = _a.sent();
                return [2 /*return*/, dataArray];
        }
    });
}); });
exports.EntryTransfersLoader = new dataloader_1.default(function (entryIds) { return __awaiter(void 0, void 0, void 0, function () {
    var dataArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(entryIds.map(function (entryId) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request("".concat(baseURI, "/entry/").concat(entryId, "/transfers/"))];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); }))];
            case 1:
                dataArray = _a.sent();
                return [2 /*return*/, dataArray];
        }
    });
}); });
exports.EntryLoader = new dataloader_1.default(function (entryIds) { return __awaiter(void 0, void 0, void 0, function () {
    var dataArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(entryIds.map(function (entryId) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request("".concat(baseURI, "/entry/").concat(entryId, "/"))];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); }))];
            case 1:
                dataArray = _a.sent();
                return [2 /*return*/, dataArray];
        }
    });
}); });
exports.FixturesLoader = new dataloader_1.default(function (keys) { return __awaiter(void 0, void 0, void 0, function () {
    var dataArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(keys.map(function (key) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request("".concat(baseURI, "/fixtures/"))];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); }))];
            case 1:
                dataArray = _a.sent();
                return [2 /*return*/, dataArray];
        }
    });
}); });
exports.EntryPicksLoader = new dataloader_1.default(function (infos) { return __awaiter(void 0, void 0, void 0, function () {
    var dataArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(infos.map(function (_a) {
                    var entryId = _a[0], event = _a[1];
                    return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, request("".concat(baseURI, "/entry/").concat(entryId, "/event/").concat(event, "/picks/"))];
                                case 1: return [2 /*return*/, _b.sent()];
                            }
                        });
                    });
                }))];
            case 1:
                dataArray = _a.sent();
                return [2 /*return*/, dataArray];
        }
    });
}); });
exports.PlayerSummaryLoader = new dataloader_1.default(function (playerIds) { return __awaiter(void 0, void 0, void 0, function () {
    var dataArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(playerIds.map(function (playerId) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, request("".concat(baseURI, "/element-summary/").concat(playerId, "/"))];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); }))];
            case 1:
                dataArray = _a.sent();
                return [2 /*return*/, dataArray];
        }
    });
}); });
exports.LeagueLoader = new dataloader_1.default(function (infos) { return __awaiter(void 0, void 0, void 0, function () {
    var dataArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(infos.map(function (_a) {
                    var leagueId = _a[0], _b = _a[1], pageIndex = _b === void 0 ? 1 : _b;
                    return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, request("".concat(baseURI, "/leagues-classic/").concat(leagueId, "/standings/?page_new_entries=1&page_standings=").concat(pageIndex, "&phase=1"))];
                                case 1: return [2 /*return*/, _c.sent()];
                            }
                        });
                    });
                }))];
            case 1:
                dataArray = _a.sent();
                return [2 /*return*/, dataArray];
        }
    });
}); });
