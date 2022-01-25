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
    };
    Entry: {
        player_full_name: (parent: any) => string;
    };
    Team: {
        players: (parent: any) => any[] | Promise<any>;
        fixtures: (parent: any) => any[] | Promise<any>;
    };
    Fixture: {
        team_h: (parent: any) => any;
        team_a: (parent: any) => any;
        stats: (parent: any) => any;
    };
    FixtureStat: {
        player: (parent: any) => any;
    };
    Player: {
        team: (parent: any) => any;
        live: (parent: any, args: any) => Promise<any>;
    };
    Event: {
        most_selected: (parent: any) => any;
        most_transferred_in: (parent: any) => any;
        top_element: (parent: any) => any;
        most_captained: (parent: any) => any;
        most_vice_captained: (parent: any) => any;
        fixtures: (parent: any) => any[] | Promise<any>;
        deadline_time: (parent: any) => any;
    };
    EntryHistory: {
        current: (parent: any) => any;
        chips: (parent: any) => any;
    };
    EventHistory: {
        event: (parent: any) => Promise<any>;
    };
    Live: {
        player: (parent: any) => any;
        explain: (parent: any) => any;
    };
    Explain: {
        fixture: (parent: any) => Promise<any>;
    };
    Pick: {
        player: (parent: any) => any;
    };
    PlayerSummary: {
        fixtures: (parent: any) => Promise<any>;
        history: (parent: any) => any;
    };
    Transfers: {
        time: (parent: any) => any;
        player_in: (parent: any) => any;
        player_out: (parent: any) => any;
        cur_ddl: (parent: any) => Promise<any>;
        last_ddl: (parent: any) => Promise<any>;
    };
};
export default resolvers;
