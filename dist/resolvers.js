"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var node_cache_1 = __importDefault(require("node-cache"));
var axios_1 = __importDefault(require("axios"));
var vdate_1 = __importDefault(require("./util/vdate"));
var cache = new node_cache_1.default({ stdTTL: 3600, checkperiod: 3650 });
var baseURI = 'https://fantasy.premierleague.com/api';
var request = function (url) {
    var cachedData = cache.get(url);
    if (cachedData == undefined) {
        return axios_1.default
            .get(url, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'graphql-fpl',
            },
        })
            .then(function (response) {
            console.info("request: ".concat(url));
            cache.set(url, response.data);
            return response.data;
        });
    }
    else {
        return new Promise(function (resolve) {
            resolve(cachedData);
        });
    }
};
// get bootstrap info and cached
request("".concat(baseURI, "/bootstrap-static/")).then(function (json) {
    cache.set('events', json.events);
    cache.set('teams', json.teams);
    cache.set('players', json.elements);
    cache.set('fixtures', json);
});
var getTeam = function (id) {
    var cached = cache.get('teams');
    if (cached == undefined) {
        return request("".concat(baseURI, "/bootstrap-static/")).then(function (json) {
            cache.set('teams', json.teams);
            return json.teams.find(function (t) { return t.id == id; });
        });
    }
    return cached.find(function (t) { return t.id == id; });
};
var getTeamShortName = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getTeam(id)];
            case 1:
                team = _a.sent();
                return [4 /*yield*/, team.short_name];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getPlayer = function (id) {
    var cached = cache.get('players');
    if (cached == undefined) {
        return request("".concat(baseURI, "/bootstrap-static/")).then(function (json) {
            cache.set('players', json.elements);
            return json.elements.find(function (p) { return p.id == id; });
        });
    }
    var playerInfo = cached.find(function (p) { return p.id == id; });
    return playerInfo;
};
var getPlayerByName = function (web_name) {
    var cached = cache.get('players');
    if (cached == undefined) {
        return request("".concat(baseURI, "/bootstrap-static/")).then(function (json) {
            cache.set('players', json.elements);
            return json.elements.find(function (p) { return p.web_name === web_name; });
        });
    }
    return cached.find(function (p) { return p.web_name == web_name; });
};
var getEventLive = function (eventId) { return __awaiter(void 0, void 0, void 0, function () {
    var cached, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cached = cache.get('events-' + eventId);
                if (!(cached == undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, request("".concat(baseURI, "/event/").concat(eventId, "/live/"))];
            case 1:
                data = _a.sent();
                cache.set('events-' + eventId, data.elements);
                return [2 /*return*/, data.elements];
            case 2: return [2 /*return*/, cached];
        }
    });
}); };
var getCachedEvent = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var cached, events;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cached = cache.get('events');
                if (!(cached == undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, request("".concat(baseURI, "/bootstrap-static/"))];
            case 1:
                events = (_a.sent()).events;
                cache.set('events', events);
                return [2 /*return*/, events.find(function (g) { return g.id == id; })];
            case 2: return [2 /*return*/, cached.find(function (g) { return g.id == id; })];
        }
    });
}); };
var resolvers = {
    Query: {
        event: function (_, args) {
            return getCachedEvent(args.id);
        },
        events: function () {
            var cached = cache.get('events');
            if (cached == undefined) {
                return request("".concat(baseURI, "/bootstrap-static/")).then(function (json) {
                    cache.set('events', json);
                    return json;
                });
            }
            return cached;
        },
        team: function (_, args) { return getTeam(args.id); },
        fixture: function (_, args) {
            var id = args.id;
            var cached = cache.get('fixtures');
            if (cached == undefined) {
                return request("".concat(baseURI, "/bootstrap-static/")).then(function (json) {
                    cache.set('fixtures', json);
                    return json.find(function (f) { return f.id == id; });
                });
            }
            return cached.find(function (f) { return f.id == id; });
        },
        player: function (_, args) { return (args.id ? getPlayer(args.id) : getPlayerByName(args.name)); },
        entry: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = args.id;
                        return [4 /*yield*/, request("".concat(baseURI, "/entry/").concat(id, "/"))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        entryHistory: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request("".concat(baseURI, "/entry/").concat(args.id, "/history/"))];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); },
        live: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var data, elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request("".concat(baseURI, "/event/").concat(args.event, "/live/"))];
                    case 1:
                        data = _a.sent();
                        elements = data.elements;
                        return [2 /*return*/, elements.find(function (el) { return el.id == args.id; })];
                }
            });
        }); },
        picks: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request("".concat(baseURI, "/entry/").concat(args.entry, "/event/").concat(args.event, "/picks/"))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        playerSummary: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request("".concat(baseURI, "/element-summary/").concat(args.id, "/"))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        transfers: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request("".concat(baseURI, "/entry/").concat(args.id, "/transfers/"))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
    },
    Entry: {
        player_full_name: function (parent) {
            var player_first_name = parent.player_first_name, player_last_name = parent.player_last_name;
            return player_first_name + ' ' + player_last_name;
        },
    },
    Team: {
        players: function (parent) {
            var id = parent.id;
            var cached = cache.get('players');
            if (cache.get('players') == undefined) {
                return request("".concat(baseURI, "/bootstrap-static/")).then(function (json) {
                    cache.set('players', json.elements);
                    return json.elements.filter(function (p) { return p.team == id; });
                });
            }
            return cached.filter(function (p) { return p.team == id; });
        },
        fixtures: function (parent) {
            var id = parent.id;
            var cached = cache.get('fixtures');
            if (cached == undefined) {
                return request("".concat(baseURI, "/fixtures/")).then(function (json) {
                    cache.set('fixtures', json);
                    return json.filter(function (x) { return x.team_a == id || x.team_a == id; });
                });
            }
            return cached.filter(function (x) { return x.team_a == id || x.team_h == id; });
        },
    },
    Fixture: {
        team_h: function (parent) { return getTeam(parent.team_h); },
        team_a: function (parent) { return getTeam(parent.team_a); },
        stats: function (parent) { return parent.stats.filter(function (x) { return x.a.length + x.h.length !== 0; }); },
    },
    FixtureStat: {
        player: function (parent) { return getPlayer(parent.element); },
    },
    Player: {
        team: function (parent) { return getTeam(parent.team); },
        live: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
            var elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getEventLive(args.event)];
                    case 1:
                        elements = _a.sent();
                        return [2 /*return*/, elements.find(function (el) { return el.id == parent.id; })];
                }
            });
        }); },
    },
    Event: {
        most_selected: function (parent) { return getPlayer(parent.most_selected); },
        most_transferred_in: function (parent) { return getPlayer(parent.most_transferred_in); },
        top_element: function (parent) { return getPlayer(parent.top_element); },
        most_captained: function (parent) { return getPlayer(parent.most_captained); },
        most_vice_captained: function (parent) { return getPlayer(parent.most_transferred_in); },
        fixtures: function (parent) {
            var id = parent.id;
            var cached = cache.get('fixtures');
            if (cached == undefined) {
                return request("".concat(baseURI, "/fixtures/")).then(function (json) {
                    cache.set('fixtures', json);
                    return json.filter(function (f) { return f.event == id; });
                });
            }
            return cached.filter(function (f) { return f.event == id; });
        },
        deadline_time: function (parent) {
            return new vdate_1.default(new Date(parent.deadline_time).getTime()).format('YYYY-MM-DD HH:mm:ss');
        },
    },
    EntryHistory: {
        current: function (parent) { return parent.current; },
        chips: function (parent) { return parent.chips; },
    },
    EventHistory: {
        event: function (parent) {
            var id = parent.event;
            return request("".concat(baseURI, "/bootstrap-static/")).then(function (json) {
                return json.events.find(function (g) { return g.id == id; });
            });
        }
    },
    Live: {
        player: function (parent) { return getPlayer(parent.id); },
        explain: function (parent) { return parent.explain[0]; },
    },
    Explain: {
        fixture: function (parent) {
            var id = parent.fixture;
            return request("".concat(baseURI, "/fixtures/")).then(function (json) { return json.find(function (f) { return f.id == id; }); });
        },
    },
    Pick: {
        player: function (parent) { return getPlayer(parent.element); },
    },
    PlayerSummary: {
        fixtures: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, parent.fixtures.map(function (fx) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _a = [__assign({}, fx)];
                                    _b = {};
                                    return [4 /*yield*/, getTeamShortName(fx.team_h)];
                                case 1:
                                    _b.team_h_name = _c.sent();
                                    return [4 /*yield*/, getTeamShortName(fx.team_a)];
                                case 2: return [2 /*return*/, (__assign.apply(void 0, _a.concat([(_b.team_a_name = _c.sent(), _b)])))];
                            }
                        });
                    }); })];
            });
        }); },
        history: function (parent) {
            return parent.history.map(function (h) { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = [__assign({}, h)];
                            _b = {};
                            return [4 /*yield*/, getTeamShortName(h.opponent_team)];
                        case 1: return [2 /*return*/, (__assign.apply(void 0, _a.concat([(_b.opponent_team = _c.sent(), _b)])))];
                    }
                });
            }); });
        },
    },
    Transfers: {
        time: function (parent) {
            return new vdate_1.default(new Date(parent.time).getTime()).format('YYYY-MM-DD HH:mm:ss');
        },
        player_in: function (parent) { return getPlayer(parent.element_in); },
        player_out: function (parent) { return getPlayer(parent.element_out); },
        cur_ddl: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            var curEvent, cur_ddl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getCachedEvent(parent.event)];
                    case 1:
                        curEvent = _a.sent();
                        cur_ddl = curEvent ? curEvent.deadline_time : 0;
                        return [2 /*return*/, new vdate_1.default(new Date(cur_ddl).getTime()).format('YYYY-MM-DD HH:mm:ss')];
                }
            });
        }); },
        last_ddl: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            var lastEvent, last_ddl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getCachedEvent(parent.event - 1)];
                    case 1:
                        lastEvent = _a.sent();
                        last_ddl = lastEvent ? lastEvent.deadline_time : 0;
                        return [2 /*return*/, new vdate_1.default(new Date(last_ddl).getTime()).format('YYYY-MM-DD HH:mm:ss')];
                }
            });
        }); },
    },
};
exports.default = resolvers;
