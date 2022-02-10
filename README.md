# fpl-graphql

A GraphQL wrapper for the Fantasy Premier League API, using node and graphql-yoga. [Demo](https://graphql4fpl.herokuapp.com/)

# Important notice

~~As of September 2020, fpl-graphql needs update to reflect possible changes in the premier league API. Contributions are welcome. Right now I am a little busy so it would take some time for fpl-graphql to work again.~~ Starting from 20/21 season, request-promise is used. (axios, fetch and other alternatives did not seem to work, which is very odd.)

## FPL Rest API endpoints

- https://fantasy.premierleague.com/api/bootstrap-static/ : events (gameweeks), teams, players, game settings, phases,
  and elements (players)
- https://fantasy.premierleague.com/api/fixtures/ : fixtures
- [https://fantasy.premierleague.com/api/element-summary/{player_id}/](https://fantasy.premierleague.com/api/element-summary/215/) :
  stats of a given player.
- [https://fantasy.premierleague.com/api/event/{event_id}/live/](https://fantasy.premierleague.com/api/event/3/live/) : live
  stats, by player, for a given gameweek, and how much points he scored in fantasy.
- [https://fantasy.premierleague.com/api/entry/{entry_id}/history/](https://fantasy.premierleague.com/api/entry/663372/history/) :
  data for a given entry (a fantasy team) for the past gameweeks of the season, plus past seasons.
- [https://fantasy.premierleague.com/api/entry/{entry_id}/event/{event_id}/picks/](https://fantasy.premierleague.com/api/entry/6043795/event/3/picks/) :
  data of picks of a given fpl team for a given entry (gameweek)
- [https://fantasy.premierleague.com/api/leagues-classic/{league_id}/standings/?page_new_entries=1&page_standings={page_index}&phase=1](https://fantasy.premierleague.com/api/leagues-classic/249673/standings/?page_new_entries=1&page_standings=1&phase=1) :
  data of a given classic league standings

## Usage

1. Move to the project directory and install dependencies

```
cd fpl-graphql
npm install
```

2. Start the server

```
npm start
```

The server will run at http://localhost:4000 with a graphql playground (browse docs and schema to know more about queries)

### Example Query
```
{
  team(teamId: 2) {
    name
  }
  event(event: 23) {
    name
    most_transferred_in {
      web_name
      live {
        stats {
          total_points
        }
      }
    }
  }
  live(event: 1, playerId: 233) {
    player {
      web_name
      total_points
    }
  }
  entry(entryId: 2) {
    name
    player_full_name
    summary_overall_points
    summary_overall_rank
  }
  transfers(entryId: 2) {
    time
    player_in {
      web_name
      event_points
    }
    player_out {
      web_name
      event_points
    }
    last_ddl
    cur_ddl
  }
  entryHistory(entryId: 2) {
    current {
      points
      total_points
      rank
      points_on_bench
      event {
        id
      }
      transfers {
        time
        last_ddl
        cur_ddl
        player_in {
          web_name
          event_points
          live {
            stats {
              total_points
            }
          }
        }
      }
    }
    chips {
      name
      event
    }
  }
}
```

## Feel free to fork :fork_and_knife:

If it helps you build something awesome, let me know.
Contributions are happily welcome.
