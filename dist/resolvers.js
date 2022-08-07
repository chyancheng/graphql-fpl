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
var vdate_1 = __importDefault(require("./util/vdate"));
var loaders_1 = require("./loaders");
// const cache = new NodeCache({ stdTTL: 3600, checkperiod: 3650 })
// get bootstrap info and cached
// bootStrapLoader.load('data').then((json) => {
//     cache.set('events', json.events)
//     cache.set('teams', json.teams)
//     cache.set('players', json.elements)
// })
var getTeam = function (id) {
    return loaders_1.bootStrapLoader.load('data').then(function (json) {
        // cache.set('teams', json.teams)
        return json.teams.find(function (t) { return t.id == id; });
    });
    // let cached = cache.get('teams') as any[]
    // if (cached == undefined) {
    //     return bootStrapLoader.load('data').then((json) => {
    //         cache.set('teams', json.teams)
    //         return json.teams.find((t) => t.id == id)
    //     })
    // }
    // return cached.find((t) => t.id == id)
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
    return loaders_1.bootStrapLoader.load('data').then(function (json) {
        // cache.set('players', json.elements)
        return json.elements.find(function (p) { return p.id == id; });
    });
    // let cached = cache.get('players') as any[]
    // if (cached == undefined) {
    //     return bootStrapLoader.load('data').then((json) => {
    //         cache.set('players', json.elements)
    //         return json.elements.find((p) => p.id == id)
    //     })
    // }
    // let playerInfo = cached.find((p) => p.id == id)
    // return playerInfo
};
var getPlayerByName = function (web_name) {
    return loaders_1.bootStrapLoader.load('data').then(function (json) {
        // cache.set('players', json.elements)
        return json.elements.find(function (p) { return p.web_name === web_name; });
    });
    // let cached = cache.get('players') as any[]
    // if (cached == undefined) {
    //     return bootStrapLoader.load('data').then((json) => {
    //         cache.set('players', json.elements)
    //         return json.elements.find((p) => p.web_name === web_name)
    //     })
    // }
    // return cached.find((p) => p.web_name == web_name)
};
var getEventLive = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loaders_1.EventLiveLoader.load(event)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.elements];
        }
    });
}); };
var getCachedEvent = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var events;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loaders_1.bootStrapLoader.load('data')
                // cache.set('events', events)
            ];
            case 1:
                events = (_a.sent()).events;
                // cache.set('events', events)
                return [2 /*return*/, events.find(function (g) { return g.id == id; })
                    // let cached = cache.get('events') as any[]
                    // if (cached == undefined) {
                    //     let { events } = await bootStrapLoader.load('data')
                    //     cache.set('events', events)
                    //     return events.find((g) => g.id == id)
                    // }
                    // return cached.find((g) => g.id == id)
                ];
        }
    });
}); };
var resolvers = {
    Query: {
        event: function (_, args) {
            return getCachedEvent(args.event);
        },
        events: function () {
            return loaders_1.bootStrapLoader.load('data').then(function (json) {
                // cache.set('events', json)
                return json;
            });
            // let cached = cache.get('events') as any[]
            // if (cached == undefined) {
            //     return bootStrapLoader.load('data').then((json) => {
            //         cache.set('events', json)
            //         return json
            //     })
            // }
            // return cached
        },
        team: function (_, args) { return getTeam(args.teamId); },
        fixture: function (_, args) {
            var id = args.id;
            loaders_1.FixturesLoader.load('data').then(function (json) {
                // cache.set('fixtures', json)
                return json.find(function (f) { return f.id == id; });
            });
            // let cached = cache.get('fixtures') as any[]
            // if (cached == undefined) {
            //     FixturesLoader.load('data').then((json) => {
            //         cache.set('fixtures', json)
            //         return json.find((f) => f.id == id)
            //     })
            // }
            // return cached.find((f) => f.id == id)
        },
        player: function (_, args) {
            return args.playerId ? getPlayer(args.playerId) : getPlayerByName(args.playerName);
        },
        entry: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loaders_1.EntryLoader.load(args.entryId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        entryHistory: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loaders_1.EntryHistoryLoader.load(args.entryId)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, data), { entryId: args.entryId })];
                }
            });
        }); },
        live: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loaders_1.EventLiveLoader.load(args.event)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.elements.find(function (el) { return el.id == args.playerId; })];
                }
            });
        }); },
        picks: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loaders_1.EntryPicksLoader.load([args.entryId, args.event])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        playerSummary: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loaders_1.PlayerSummaryLoader.load(args.playerId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        transfers: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loaders_1.EntryTransfersLoader.load(args.entryId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        league: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loaders_1.LeagueLoader.load([args.leagueId, args.pageIndex])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
    },
    Entry: {
        player_full_name: function (ctx) {
            var player_first_name = ctx.player_first_name, player_last_name = ctx.player_last_name;
            return player_first_name + ' ' + player_last_name;
        },
    },
    Team: {
        players: function (ctx) {
            var teamId = ctx.teamId;
            return loaders_1.bootStrapLoader.load('data').then(function (json) {
                // cache.set('players', json.elements)
                return json.elements.filter(function (p) { return p.team == teamId; });
            });
            // let cached = cache.get('players') as any[]
            // if (cache.get('players') == undefined) {
            //     return bootStrapLoader.load('data').then((json) => {
            //         cache.set('players', json.elements)
            //         return json.elements.filter((p) => p.team == teamId)
            //     })
            // }
            // return cached.filter((p) => p.team == teamId)
        },
        fixtures: function (ctx) {
            var id = ctx.id;
            loaders_1.FixturesLoader.load('data').then(function (json) {
                // cache.set('fixtures', json)
                return json.filter(function (x) { return x.team_a == id || x.team_a == id; });
            });
            // let cached = cache.get('fixtures') as any[]
            // if (cached == undefined) {
            //     FixturesLoader.load('data').then((json) => {
            //         cache.set('fixtures', json)
            //         return json.filter((x) => x.team_a == id || x.team_a == id)
            //     })
            // }
            // return cached.filter((x) => x.team_a == id || x.team_h == id)
        },
    },
    Fixture: {
        team_h: function (ctx) {
            return __assign(__assign({}, getTeam(ctx.team_h)), { teamId: ctx.team_h });
        },
        team_a: function (ctx) {
            return __assign(__assign({}, getTeam(ctx.team_a)), { teamId: ctx.team_a });
        },
        stats: function (ctx) { return ctx.stats.filter(function (x) { return x.a.length + x.h.length !== 0; }); },
    },
    FixtureStat: {
        player: function (ctx) { return getPlayer(ctx.element); },
    },
    Player: {
        team: function (ctx) { return getTeam(ctx.team); },
        live: function (ctx, args) { return __awaiter(void 0, void 0, void 0, function () {
            var event, elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event = (args === null || args === void 0 ? void 0 : args.event) ? args.event : ctx.event;
                        return [4 /*yield*/, getEventLive(event)];
                    case 1:
                        elements = _a.sent();
                        return [2 /*return*/, elements.find(function (el) { return el.id == ctx.id; })];
                }
            });
        }); },
    },
    Event: {
        most_selected: function (ctx) {
            return __assign(__assign({}, getPlayer(ctx.most_selected)), { event: ctx.id });
        },
        most_transferred_in: function (ctx) {
            return __assign(__assign({}, getPlayer(ctx.most_transferred_in)), { event: ctx.id });
        },
        top_element: function (ctx) {
            return __assign(__assign({}, getPlayer(ctx.top_element)), { event: ctx.id });
        },
        most_captained: function (ctx) {
            return __assign(__assign({}, getPlayer(ctx.most_captained)), { event: ctx.id });
        },
        most_vice_captained: function (ctx) {
            return __assign(__assign({}, getPlayer(ctx.most_vice_captained)), { event: ctx.id });
        },
        fixtures: function (ctx) {
            var id = ctx.id;
            loaders_1.FixturesLoader.load('data').then(function (json) {
                // cache.set('fixtures', json)
                return json.filter(function (f) { return f.event == id; });
            });
            // const cached = cache.get('fixtures') as any[]
            // if (cached == undefined) {
            //     FixturesLoader.load('data').then((json) => {
            //         cache.set('fixtures', json)
            //         return json.filter((f) => f.event == id)
            //     })
            // }
            // return cached.filter((f) => f.event == id)
        },
        deadline_time: function (ctx) {
            return new vdate_1.default(new Date(ctx.deadline_time).getTime()).format('YYYY-MM-DD HH:mm:ss');
        },
    },
    EntryHistory: {
        current: function (ctx) {
            return ctx.current.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                var picks;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, loaders_1.EntryPicksLoader.load([ctx.entryId, item.event])];
                        case 1:
                            picks = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, item), { entryId: ctx.entryId, picks: picks })];
                    }
                });
            }); });
        },
        chips: function (ctx) {
            return ctx.chips.map(function (item) {
                return __assign(__assign({}, item), { time: new vdate_1.default(new Date(ctx.item).getTime()).format('YYYY-MM-DD HH:mm:ss') });
            });
        },
    },
    EventHistory: {
        event: function (ctx) {
            return loaders_1.bootStrapLoader
                .load('data')
                .then(function (json) { return json.events.find(function (g) { return g.id == ctx.event; }); });
        },
        transfers: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loaders_1.EntryTransfersLoader.load(ctx.entryId)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.filter(function (item) { return item.event === ctx.event; })];
                }
            });
        }); },
    },
    Live: {
        player: function (ctx) { return getPlayer(ctx.id); },
        explain: function (ctx) { return ctx.explain[0]; },
    },
    Explain: {
        fixture: function (ctx) {
            return loaders_1.FixturesLoader.load('data').then(function (json) { return json.find(function (f) { return f.id == ctx.fixture; }); });
        },
    },
    Pick: {
        player: function (ctx) { return getPlayer(ctx.element); },
    },
    PlayerSummary: {
        fixtures: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, ctx.fixtures.map(function (fx) { return __awaiter(void 0, void 0, void 0, function () {
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
        history: function (ctx) {
            return ctx.history.map(function (h) { return __awaiter(void 0, void 0, void 0, function () {
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
        time: function (ctx) {
            return new vdate_1.default(new Date(ctx.time).getTime()).format('YYYY-MM-DD HH:mm:ss');
        },
        player_in: function (ctx) {
            return __assign(__assign({}, getPlayer(ctx.element_in)), { event: ctx.event });
        },
        player_out: function (ctx) {
            return __assign(__assign({}, getPlayer(ctx.element_out)), { event: ctx.event });
        },
        cur_ddl: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var curEvent, cur_ddl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getCachedEvent(ctx.event)];
                    case 1:
                        curEvent = _a.sent();
                        cur_ddl = curEvent ? curEvent.deadline_time : 0;
                        return [2 /*return*/, new vdate_1.default(new Date(cur_ddl).getTime()).format('YYYY-MM-DD HH:mm:ss')];
                }
            });
        }); },
        last_ddl: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var lastEvent, last_ddl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getCachedEvent(ctx.event - 1)];
                    case 1:
                        lastEvent = _a.sent();
                        last_ddl = lastEvent ? lastEvent.deadline_time : 0;
                        return [2 /*return*/, new vdate_1.default(new Date(last_ddl).getTime()).format('YYYY-MM-DD HH:mm:ss')];
                }
            });
        }); },
    },
    LeagueStandingsResults: {
        entryHistory: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            var entryId, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entryId = ctx.entry;
                        return [4 /*yield*/, loaders_1.EntryHistoryLoader.load(entryId)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, data), { entryId: entryId })];
                }
            });
        }); }
    }
};
exports.default = resolvers;
