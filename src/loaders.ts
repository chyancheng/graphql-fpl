import DataLoader from 'dataloader'
import fetch from 'node-fetch'

// const cache = new NodeCache()
const baseURI = 'https://fantasy.premierleague.com/api'

const request = async (url) => {
    // let cachedData = cache.get(url)
    // if (cachedData == undefined) {
        console.info(`request: ${url}`)

        let response = (await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'graphql-fpl',
            },
        })) as any

        let data = await response.json()
        // cache.set(url, data)
        
        return data
    // } else {
    //     return new Promise((resolve) => {
    //         resolve(cachedData)
    //     })
    // }
}

export const bootStrapLoader = new DataLoader(async (keys) => {
    let dataArray = await Promise.all(
        keys.map(async (key) => {
            return await request(`${baseURI}/bootstrap-static/`)
        })
    )
    return dataArray
})

export const EventLiveLoader = new DataLoader(async (events) => {
    let dataArray = await Promise.all(
        events.map(async (event) => {
            return await request(`${baseURI}/event/${event}/live/`)
        })
    )
    return dataArray
})

export const EntryHistoryLoader = new DataLoader(async (entryIds) => {
    let dataArray = await Promise.all(
        entryIds.map(async (entryId) => {
            return await request(`${baseURI}/entry/${entryId}/history/`)
        })
    )
    return dataArray
})

export const EntryTransfersLoader = new DataLoader(async (entryIds) => {
    let dataArray = await Promise.all(
        entryIds.map(async (entryId) => {
            return await request(`${baseURI}/entry/${entryId}/transfers/`)
        })
    )
    return dataArray
})

export const EntryLoader = new DataLoader(async (entryIds) => {
    let dataArray = await Promise.all(
        entryIds.map(async (entryId) => {
            return await request(`${baseURI}/entry/${entryId}/`)
        })
    )
    return dataArray
})

export const FixturesLoader = new DataLoader(async (keys) => {
    let dataArray = await Promise.all(
        keys.map(async (key) => {
            return await request(`${baseURI}/fixtures/`)
        })
    )
    return dataArray
})

export const EntryPicksLoader = new DataLoader(async (infos) => {
    let dataArray = await Promise.all(
        infos.map(async ([entryId, event]) => {
            return await request(`${baseURI}/entry/${entryId}/event/${event}/picks/`)
        })
    )
    return dataArray
})

export const PlayerSummaryLoader = new DataLoader(async (playerIds) => {
    let dataArray = await Promise.all(
        playerIds.map(async (playerId) => {
            return await request(`${baseURI}/element-summary/${playerId}/`)
        })
    )
    return dataArray
})

export const LeagueLoader = new DataLoader(async (infos) => {
    let dataArray = await Promise.all(
        infos.map(async ([leagueId, pageIndex = 1]) => {
            return await request(
                `${baseURI}/leagues-classic/${leagueId}/standings/?page_new_entries=1&page_standings=${pageIndex}&phase=1`
            )
        })
    )
    return dataArray
})
