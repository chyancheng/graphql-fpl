declare const resolvers: {
    Query: {
        event: (_: any, args: any) => any;
        events: () => any[] | Promise<any>;
        team: (_: any, args: any) => any;
        fixture: (_: any, args: any) => any;
        player: (_: any, args: any) => any;
        entry: (_: any, args: any) => Promise<any>;
        entryHistory: (_: any, args: any) => Promise<any>;
        live: (_: any, args: any) => Promise<any>;
        picks: (_: any, args: any) => Promise<any>;
        playerSummary: (_: any, args: any) => Promise<any>;
        transfers: (_: any, args: any) => Promise<any>;
        league: (_: any, args: any) => Promise<any>;
    };
    Entry: {
        player_full_name: (ctx: any) => string;
    };
    Team: {
        players: (ctx: any) => any[] | Promise<any>;
        fixtures: (ctx: any) => any[];
    };
    Fixture: {
        team_h: (ctx: any) => any;
        team_a: (ctx: any) => any;
        stats: (ctx: any) => any;
    };
    FixtureStat: {
        player: (ctx: any) => any;
    };
    Player: {
        team: (ctx: any) => any;
        live: (ctx: any, args: any) => Promise<any>;
    };
    Event: {
        most_selected: (ctx: any) => any;
        most_transferred_in: (ctx: any) => any;
        top_element: (ctx: any) => any;
        most_captained: (ctx: any) => any;
        most_vice_captained: (ctx: any) => any;
        fixtures: (ctx: any) => any[];
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
        player: (ctx: any) => any;
        explain: (ctx: any) => any;
    };
    Explain: {
        fixture: (ctx: any) => Promise<any>;
    };
    Pick: {
        player: (ctx: any) => any;
    };
    PlayerSummary: {
        fixtures: (ctx: any) => Promise<any>;
        history: (ctx: any) => any;
    };
    Transfers: {
        time: (ctx: any) => any;
        player_in: (ctx: any) => any;
        player_out: (ctx: any) => any;
        cur_ddl: (ctx: any) => Promise<any>;
        last_ddl: (ctx: any) => Promise<any>;
    };
};
export default resolvers;
