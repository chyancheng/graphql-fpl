declare const resolvers: {
    Query: {
        event: (_: any, args: any) => any;
        events: () => Promise<any>;
        team: (_: any, args: any) => Promise<any>;
        fixture: (_: any, args: any) => void;
        player: (_: any, args: any) => Promise<any>;
        entry: (_: any, args: any) => Promise<any>;
        entryHistory: (_: any, args: any) => Promise<any>;
        live: (ctx: any, args: any) => Promise<any>;
        picks: (_: any, args: any) => Promise<any>;
        playerSummary: (_: any, args: any) => Promise<any>;
        transfers: (_: any, args: any) => Promise<any>;
        league: (_: any, args: any) => Promise<any>;
    };
    Entry: {
        player_full_name: (ctx: any) => string;
    };
    Team: {
        players: (ctx: any) => Promise<any>;
        fixtures: (ctx: any) => void;
    };
    Fixture: {
        team_h: (ctx: any) => {
            teamId: any;
            then<TResult1 = any, TResult2 = never>(onfulfilled?: (value: any) => TResult1 | PromiseLike<TResult1>, onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>): Promise<TResult1 | TResult2>;
            catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<any>;
            finally(onfinally?: () => void): Promise<any>;
            [Symbol.toStringTag]: string;
        };
        team_a: (ctx: any) => {
            teamId: any;
            then<TResult1 = any, TResult2 = never>(onfulfilled?: (value: any) => TResult1 | PromiseLike<TResult1>, onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>): Promise<TResult1 | TResult2>;
            catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<any>;
            finally(onfinally?: () => void): Promise<any>;
            [Symbol.toStringTag]: string;
        };
        stats: (ctx: any) => any;
    };
    FixtureStat: {
        player: (ctx: any) => Promise<any>;
    };
    Player: {
        team: (ctx: any) => Promise<any>;
        live: (ctx: any, args: any) => Promise<any>;
    };
    Event: {
        most_selected: (ctx: any) => Promise<any>;
        most_transferred_in: (ctx: any) => Promise<any>;
        top_element: (ctx: any) => Promise<any>;
        most_captained: (ctx: any) => Promise<any>;
        most_vice_captained: (ctx: any) => Promise<any>;
        fixtures: (ctx: any) => void;
        deadline_time: (ctx: any) => any;
    };
    EntryHistory: {
        current: (ctx: any) => any;
        chips: (ctx: any) => any;
    };
    EventHistory: {
        event: (ctx: any) => Promise<any>;
        transfers: (ctx: any) => Promise<any>;
    };
    Live: {
        player: (ctx: any) => Promise<any>;
        explain: (ctx: any) => any;
    };
    Explain: {
        fixture: (ctx: any) => Promise<any>;
    };
    Pick: {
        player: (ctx: any, args: any) => Promise<any>;
    };
    PlayerSummary: {
        fixtures: (ctx: any) => Promise<any>;
        history: (ctx: any) => any;
    };
    Transfers: {
        time: (ctx: any) => any;
        player_in: (ctx: any) => {
            event: any;
            then<TResult1 = any, TResult2 = never>(onfulfilled?: (value: any) => TResult1 | PromiseLike<TResult1>, onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>): Promise<TResult1 | TResult2>;
            catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<any>;
            finally(onfinally?: () => void): Promise<any>;
            [Symbol.toStringTag]: string;
        };
        player_out: (ctx: any) => {
            event: any;
            then<TResult1 = any, TResult2 = never>(onfulfilled?: (value: any) => TResult1 | PromiseLike<TResult1>, onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>): Promise<TResult1 | TResult2>;
            catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<any>;
            finally(onfinally?: () => void): Promise<any>;
            [Symbol.toStringTag]: string;
        };
        cur_ddl: (ctx: any) => Promise<any>;
        last_ddl: (ctx: any) => Promise<any>;
    };
    LeagueStandingsResults: {
        entryHistory: (ctx: any) => Promise<any>;
    };
};
export default resolvers;
