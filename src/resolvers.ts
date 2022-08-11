import VDate from './util/vdate'

import {
    bootStrapLoader,
    EventLiveLoader,
    EntryHistoryLoader,
    EntryTransfersLoader,
    EntryLoader,
    FixturesLoader,
    EntryPicksLoader,
    PlayerSummaryLoader,
    LeagueLoader,
} from './loaders'

// const cache = new NodeCache({ stdTTL: 3600, checkperiod: 3650 })

// get bootstrap info and cached
// bootStrapLoader.load('data').then((json) => {
//     cache.set('events', json.events)
//     cache.set('teams', json.teams)
//     cache.set('players', json.elements)
// })

const getTeam = (id) => {
    return bootStrapLoader.load('data').then((json) => {
        // cache.set('teams', json.teams)
        return json.teams.find((t) => t.id == id)
    })

    // let cached = cache.get('teams') as any[]
    // if (cached == undefined) {
    //     return bootStrapLoader.load('data').then((json) => {
    //         cache.set('teams', json.teams)
    //         return json.teams.find((t) => t.id == id)
    //     })
    // }
    // return cached.find((t) => t.id == id)
}

const getTeamShortName = async (id) => {
    let team = await getTeam(id)
    return await team.short_name
}

const getPlayer = async (id) => {
    let json = await bootStrapLoader.load('data')
    return json.elements.find((p) => p.id == id)

    // let cached = cache.get('players') as any[]
    // if (cached == undefined) {
    //     return bootStrapLoader.load('data').then((json) => {
    //         cache.set('players', json.elements)
    //         return json.elements.find((p) => p.id == id)
    //     })
    // }
    // let playerInfo = cached.find((p) => p.id == id)
    // return playerInfo
}

const getPlayerByName = (web_name) => {
    return bootStrapLoader.load('data').then((json) => {
        // cache.set('players', json.elements)
        return json.elements.find((p) => p.web_name === web_name)
    })
    // let cached = cache.get('players') as any[]
    // if (cached == undefined) {
    //     return bootStrapLoader.load('data').then((json) => {
    //         cache.set('players', json.elements)
    //         return json.elements.find((p) => p.web_name === web_name)
    //     })
    // }
    // return cached.find((p) => p.web_name == web_name)
}

const getEventLive: any = async (event) => {
    let data = await EventLiveLoader.load(event)
    return data.elements
}

const getCachedEvent: any = async (id) => {
    let { events } = await bootStrapLoader.load('data')
    // cache.set('events', events)
    return events.find((g) => g.id == id)

    // let cached = cache.get('events') as any[]
    // if (cached == undefined) {
    //     let { events } = await bootStrapLoader.load('data')
    //     cache.set('events', events)
    //     return events.find((g) => g.id == id)
    // }
    // return cached.find((g) => g.id == id)
}

const resolvers = {
    Query: {
        event: (_, args) => {
            return getCachedEvent(args.event)
        },

        events: () => {
            return bootStrapLoader.load('data').then((json) => {
                // cache.set('events', json)
                return json
            })
            // let cached = cache.get('events') as any[]
            // if (cached == undefined) {
            //     return bootStrapLoader.load('data').then((json) => {
            //         cache.set('events', json)
            //         return json
            //     })
            // }
            // return cached
        },

        team: (_, args) => getTeam(args.teamId),

        fixture: (_, args) => {
            const { id } = args
            FixturesLoader.load('data').then((json) => {
                // cache.set('fixtures', json)
                return json.find((f) => f.id == id)
            })

            // let cached = cache.get('fixtures') as any[]
            // if (cached == undefined) {
            //     FixturesLoader.load('data').then((json) => {
            //         cache.set('fixtures', json)
            //         return json.find((f) => f.id == id)
            //     })
            // }
            // return cached.find((f) => f.id == id)
        },

        player: (_, args) =>
            args.playerId ? getPlayer(args.playerId) : getPlayerByName(args.playerName),

        entry: async (_, args) => {
            return await EntryLoader.load(args.entryId)
        },

        entryHistory: async (_, args) => {
            let data = await EntryHistoryLoader.load(args.entryId)
            return { ...data, entryId: args.entryId }
        },

        live: async (ctx, args) => {
            let event = args.event
            let data = await EventLiveLoader.load(event)
            return data.elements.find((el) => el.id == args.playerId)
        },

        picks: async (_, args) => {
            let data = EntryPicksLoader.load([args.entryId, args.event])
            return {...data, event: args.event }
        },

        playerSummary: async (_, args) => {
            return await PlayerSummaryLoader.load(args.playerId)
        },

        transfers: async (_, args) => {
            return await EntryTransfersLoader.load(args.entryId)
        },

        league: async (_, args) => {
            return await LeagueLoader.load([args.leagueId, args.pageIndex])
        },
    },
    Entry: {
        player_full_name: (ctx) => {
            let { player_first_name, player_last_name } = ctx
            return player_first_name + ' ' + player_last_name
        },
    },
    Team: {
        players: (ctx) => {
            const { teamId } = ctx
            return bootStrapLoader.load('data').then((json) => {
                // cache.set('players', json.elements)
                return json.elements.filter((p) => p.team == teamId)
            })
            // let cached = cache.get('players') as any[]
            // if (cache.get('players') == undefined) {
            //     return bootStrapLoader.load('data').then((json) => {
            //         cache.set('players', json.elements)
            //         return json.elements.filter((p) => p.team == teamId)
            //     })
            // }
            // return cached.filter((p) => p.team == teamId)
        },
        fixtures: (ctx) => {
            const { id } = ctx
            FixturesLoader.load('data').then((json) => {
                // cache.set('fixtures', json)
                return json.filter((x) => x.team_a == id || x.team_a == id)
            })
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
        team_h: (ctx) => {
            return { ...getTeam(ctx.team_h), teamId: ctx.team_h }
        },
        team_a: (ctx) => {
            return { ...getTeam(ctx.team_a), teamId: ctx.team_a }
        },
        stats: (ctx) => ctx.stats.filter((x) => x.a.length + x.h.length !== 0),
    },

    FixtureStat: {
        player: (ctx) => getPlayer(ctx.element),
    },

    Player: {
        team: (ctx) => getTeam(ctx.team),
        live: async (ctx, args) => {
            if (ctx.live) {
                return ctx.live
            }
            let event = args?.event ? args.event : ctx.event
            let elements = await getEventLive(event)
            return elements.find((el) => el.id == ctx.id)
        },
    },

    Event: {
        most_selected: async (ctx) => {
            let playerInfo = await getPlayer(ctx.most_selected)
            return { ...playerInfo, event: ctx.id }
        },
        most_transferred_in: async (ctx) => {
            let playerInfo = await getPlayer(ctx.most_transferred_in)
            return { ...playerInfo, event: ctx.id }
        },
        top_element: async (ctx) => {
            let playerInfo = await getPlayer(ctx.top_element)
            return { ...playerInfo, event: ctx.id }
        },
        most_captained: async (ctx) => {
            let playerInfo = await getPlayer(ctx.most_captained)
            return { ...playerInfo, event: ctx.id }
        },
        most_vice_captained: async (ctx) => {
            let playerInfo = await getPlayer(ctx.most_vice_captained)
            return { ...playerInfo, event: ctx.id }
        },
        fixtures: (ctx) => {
            const { id } = ctx
            FixturesLoader.load('data').then((json) => {
                // cache.set('fixtures', json)
                return json.filter((f) => f.event == id)
            })
            // const cached = cache.get('fixtures') as any[]
            // if (cached == undefined) {
            //     FixturesLoader.load('data').then((json) => {
            //         cache.set('fixtures', json)
            //         return json.filter((f) => f.event == id)
            //     })
            // }
            // return cached.filter((f) => f.event == id)
        },
        deadline_time: (ctx) => {
            return new VDate(new Date(ctx.deadline_time).getTime()).format('YYYY-MM-DD HH:mm:ss')
        },
    },

    EntryHistory: {
        current: (ctx) => {
            return ctx.current.map(async (item) => {
                let picks = await EntryPicksLoader.load([ctx.entryId, item.event])
                let attachEventPicks = picks.picks.map(data => {
                    return {
                        ...data,
                        event: item.event
                    }
                })
                return { 
                    ...item, 
                    entryId: ctx.entryId, 
                    event: item.event, 
                    picks: {
                        ...picks,
                        picks: attachEventPicks
                    }
                }
            })
        },
        chips: (ctx) => {
            return ctx.chips.map((item) => {
                return {
                    ...item,
                    time: new VDate(new Date(ctx.item).getTime()).format('YYYY-MM-DD HH:mm:ss'),
                }
            })
        },
    },

    EventHistory: {
        event: (ctx) => {
            return bootStrapLoader
                .load('data')
                .then((json) => json.events.find((g) => g.id == ctx.event))
        },
        transfers: async (ctx) => {
            let data = await EntryTransfersLoader.load(ctx.entryId)
            return data.filter((item) => item.event === ctx.event)
        },
    },

    Live: {
        player: (ctx) => {
            return getPlayer(ctx.id)
        },
        explain: (ctx) => ctx.explain[0],
    },

    Explain: {
        fixture: (ctx) => {
            return FixturesLoader.load('data').then((json) => json.find((f) => f.id == ctx.fixture))
        },
    },

    Pick: {
        player: async (ctx, args) => {
            let event = args.event || ctx.event
            let playerInfo = await getPlayer(ctx.element)
            let elements = event ? await getEventLive(event) : []
            let liveInfo = elements.find((el) => el.id == ctx.element)

            return { 
                ...playerInfo,
                live: liveInfo
            }
        },
    },

    PlayerSummary: {
        fixtures: async (ctx) => {
            return ctx.fixtures.map(async (fx) => ({
                ...fx,
                team_h_name: await getTeamShortName(fx.team_h),
                team_a_name: await getTeamShortName(fx.team_a),
            }))
        },

        history: (ctx) => {
            return ctx.history.map(async (h) => ({
                ...h,
                opponent_team: await getTeamShortName(h.opponent_team),
            }))
        },
    },

    Transfers: {
        time: (ctx) => {
            return new VDate(new Date(ctx.time).getTime()).format('YYYY-MM-DD HH:mm:ss')
        },
        player_in: (ctx) => {
            return { ...getPlayer(ctx.element_in), event: ctx.event }
        },
        player_out: (ctx) => {
            return { ...getPlayer(ctx.element_out), event: ctx.event }
        },
        cur_ddl: async (ctx) => {
            let curEvent = await getCachedEvent(ctx.event)
            let cur_ddl = curEvent ? curEvent.deadline_time : 0
            return new VDate(new Date(cur_ddl).getTime()).format('YYYY-MM-DD HH:mm:ss')
        },
        last_ddl: async (ctx) => {
            let lastEvent = await getCachedEvent(ctx.event - 1)
            let last_ddl = lastEvent ? lastEvent.deadline_time : 0
            return new VDate(new Date(last_ddl).getTime()).format('YYYY-MM-DD HH:mm:ss')
        },
    },

    LeagueStandingsResults: {
        entryHistory: async (ctx) => {
            let entryId = ctx.entry
            let data = await EntryHistoryLoader.load(entryId)
            return { ...data, entryId: entryId }
        }
    }
}

export default resolvers
