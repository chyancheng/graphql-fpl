import NodeCache from 'node-cache'
import axios from 'axios'
import VDate from './util/vdate'

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 3650 })
const baseURI = 'https://fantasy.premierleague.com/api'

const request = (url) => {
    let cachedData = cache.get(url)
    if (cachedData == undefined) {
        return axios
            .get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'graphql-fpl',
                },
            })
            .then((response) => {
                console.info(`request: ${url}`)
                cache.set(url, response.data)
                return response.data
            })
    } else {
        return new Promise((resolve) => {
            resolve(cachedData)
        })
    }
}

// get bootstrap info and cached
request(`${baseURI}/bootstrap-static/`).then((json) => {
    cache.set('events', json.events)
    cache.set('teams', json.teams)
    cache.set('players', json.elements)
    cache.set('fixtures', json)
})

const getTeam = (id) => {
    let cached = cache.get('teams') as any[]
    if (cached == undefined) {
        return request(`${baseURI}/bootstrap-static/`).then((json) => {
            cache.set('teams', json.teams)
            return json.teams.find((t) => t.id == id)
        })
    }
    return cached.find((t) => t.id == id)
}

const getTeamShortName = async (id) => {
    let team = await getTeam(id)
    return await team.short_name
}

const getPlayer = (id) => {
    let cached = cache.get('players') as any[]
    if (cached == undefined) {
        return request(`${baseURI}/bootstrap-static/`).then((json) => {
            cache.set('players', json.elements)
            return json.elements.find((p) => p.id == id)
        })
    }
    let playerInfo = cached.find((p) => p.id == id)
    return playerInfo
}

const getPlayerByName = (web_name) => {
    let cached = cache.get('players') as any[]
    if (cached == undefined) {
        return request(`${baseURI}/bootstrap-static/`).then((json) => {
            cache.set('players', json.elements)
            return json.elements.find((p) => p.web_name === web_name)
        })
    }
    return cached.find((p) => p.web_name == web_name)
}

const getEventLive: any = async (event) => {
    let cached = cache.get('events-' + event) as any[]
    if (cached == undefined) {
        let data = await request(`${baseURI}/event/${event}/live/`)
        cache.set('events-' + event, data.elements)
        return data.elements
    }
    return cached
}

const getCachedEvent: any = async (id) => {
    let cached = cache.get('events') as any[]
    if (cached == undefined) {
        let { events } = await request(`${baseURI}/bootstrap-static/`)
        cache.set('events', events)
        return events.find((g) => g.id == id)
    }
    return cached.find((g) => g.id == id)
}

const resolvers = {
    Query: {
        event: (_, args) => {
            return getCachedEvent(args.event)
        },

        events: () => {
            let cached = cache.get('events') as any[]
            if (cached == undefined) {
                return request(`${baseURI}/bootstrap-static/`).then((json) => {
                    cache.set('events', json)
                    return json
                })
            }
            return cached
        },

        team: (_, args) => getTeam(args.teamId),

        fixture: (_, args) => {
            const { id } = args
            let cached = cache.get('fixtures') as any[]
            if (cached == undefined) {
                return request(`${baseURI}/bootstrap-static/`).then((json) => {
                    cache.set('fixtures', json)
                    return json.find((f) => f.id == id)
                })
            }
            return cached.find((f) => f.id == id)
        },

        player: (_, args) => (args.playerId ? getPlayer(args.playerId) : getPlayerByName(args.playerName)),

        entry: async (_, args) => {
            return await request(`${baseURI}/entry/${args.entryId}/`)
        },

        entryHistory: async (_, args) => {
            let data = await request(`${baseURI}/entry/${args.entryId}/history/`)
            return { ...data, entryId: args.entryId }
        },

        live: async (_, args) => {
            let data = await request(`${baseURI}/event/${args.event}/live/`)
            return data.elements.find((el) => el.id == args.playerId)
        },

        picks: async (_, args) => {
            return await request(`${baseURI}/entry/${args.entryId}/event/${args.event}/picks/`)
        },

        playerSummary: async (_, args) => {
            return await request(`${baseURI}/element-summary/${args.playerId}/`)
        },

        transfers: async (_, args) => {
            return await request(`${baseURI}/entry/${args.entryId}/transfers/`)
        },
    },
    Entry: {
        player_full_name: (parent) => {
            let { player_first_name, player_last_name } = parent
            return player_first_name + ' ' + player_last_name
        },
    },
    Team: {
        players: (parent) => {
            const { teamId } = parent
            let cached = cache.get('players') as any[]
            if (cache.get('players') == undefined) {
                return request(`${baseURI}/bootstrap-static/`).then((json) => {
                    cache.set('players', json.elements)
                    return json.elements.filter((p) => p.team == teamId)
                })
            }
            return cached.filter((p) => p.team == teamId)
        },
        fixtures: (parent) => {
            const { id } = parent
            let cached = cache.get('fixtures') as any[]
            if (cached == undefined) {
                return request(`${baseURI}/fixtures/`).then((json) => {
                    cache.set('fixtures', json)
                    return json.filter((x) => x.team_a == id || x.team_a == id)
                })
            }
            return cached.filter((x) => x.team_a == id || x.team_h == id)
        },
    },

    Fixture: {
        team_h: (parent) => getTeam(parent.team_h),

        team_a: (parent) => getTeam(parent.team_a),

        stats: (parent) => parent.stats.filter((x) => x.a.length + x.h.length !== 0),
    },

    FixtureStat: {
        player: (parent) => getPlayer(parent.element),
    },

    Player: {
        team: (parent) => getTeam(parent.team),
        live: async (parent, args) => {
            let event = args?.event ? args.event : parent.event
            let elements = await getEventLive(event)
            return elements.find((el) => el.id == parent.id)
        },
    },

    Event: {
        most_selected: (parent) => {
            return { ...getPlayer(parent.most_selected), event: parent.id }
        },
        most_transferred_in: (parent) => {
            return { ...getPlayer(parent.most_transferred_in), event: parent.id }
        },
        top_element: (parent) => {
            return { ...getPlayer(parent.top_element), event: parent.id }
        },
        most_captained: (parent) => {
            return { ...getPlayer(parent.most_captained), event: parent.id }
        },
        most_vice_captained: (parent) => {
            return { ...getPlayer(parent.most_vice_captained), event: parent.id }
        },
        fixtures: (parent) => {
            const { id } = parent
            const cached = cache.get('fixtures') as any[]
            if (cached == undefined) {
                return request(`${baseURI}/fixtures/`).then((json) => {
                    cache.set('fixtures', json)
                    return json.filter((f) => f.event == id)
                })
            }
            return cached.filter((f) => f.event == id)
        },
        deadline_time: (parent) => {
            return new VDate(new Date(parent.deadline_time).getTime()).format('YYYY-MM-DD HH:mm:ss')
        },
    },

    EntryHistory: {
        current: (parent) => {
            return parent.current.map((item) => {
                return { ...item, entryId: parent.entryId }
            })
        },
        chips: (parent) => parent.chips,
    },

    EventHistory: {
        event: (parent) => {
            return request(`${baseURI}/bootstrap-static/`).then((json) =>
                json.events.find((g) => g.id == parent.event)
            )
        },
        transfers: async (parent) => {
            let data = await request(`${baseURI}/entry/${parent.entryId}/transfers/`)
            return data.filter((item) => item.event === parent.event)
        },
    },

    Live: {
        player: (parent) => getPlayer(parent.id),
        explain: (parent) => parent.explain[0],
    },

    Explain: {
        fixture: (parent) => {
            const id = parent.fixture
            return request(`${baseURI}/fixtures/`).then((json) => json.find((f) => f.id == id))
        },
    },

    Pick: {
        player: (parent) => getPlayer(parent.element),
    },

    PlayerSummary: {
        fixtures: async (parent) => {
            return parent.fixtures.map(async (fx) => ({
                ...fx,
                team_h_name: await getTeamShortName(fx.team_h),
                team_a_name: await getTeamShortName(fx.team_a),
            }))
        },

        history: (parent) => {
            return parent.history.map(async (h) => ({
                ...h,
                opponent_team: await getTeamShortName(h.opponent_team),
            }))
        },
    },

    Transfers: {
        time: (parent) => {
            return new VDate(new Date(parent.time).getTime()).format('YYYY-MM-DD HH:mm:ss')
        },
        player_in: (parent) => {
            return { ...getPlayer(parent.element_in), event: parent.event }
        },
        player_out: (parent) => {
            return { ...getPlayer(parent.element_out), event: parent.event }
        },
        cur_ddl: async (parent) => {
            let curEvent = await getCachedEvent(parent.event)
            let cur_ddl = curEvent ? curEvent.deadline_time : 0
            return new VDate(new Date(cur_ddl).getTime()).format('YYYY-MM-DD HH:mm:ss')
        },
        last_ddl: async (parent) => {
            let lastEvent = await getCachedEvent(parent.event - 1)
            let last_ddl = lastEvent ? lastEvent.deadline_time : 0
            return new VDate(new Date(last_ddl).getTime()).format('YYYY-MM-DD HH:mm:ss')
        },
    },
}

export default resolvers
