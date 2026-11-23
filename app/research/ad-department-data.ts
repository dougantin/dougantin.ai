export type AdGroupId = "print" | "mag" | "poster" | "object";

export type AdGroup = {
  id: AdGroupId;
  label: string;
  panelNote: string;
  count: number;
  featured: readonly string[];
};

export type AdPiece = {
  order: number;
  id: string;
  group: AdGroupId;
  format: string;
  sells: string;
  title: string;
  note: string;
  href: string;
  linkLabel: string;
  alt: string;
  src: string;
  width: number;
  height: number;
};

export type AdDepartmentData = {
  total: number;
  groups: readonly AdGroup[];
  homeCardStack: readonly string[];
  wideTile: string;
  gameUrl: string;
  pieces: readonly AdPiece[];
};

export const adDepartmentData = {
  "total": 34,
  "groups": [
    {
      "id": "print",
      "label": "Print",
      "panelNote": "Print ads for the Agency Era thesis",
      "count": 13,
      "featured": [
        "judgment",
        "correction",
        "bottlenecks",
        "permission"
      ]
    },
    {
      "id": "mag",
      "label": "Magazine",
      "panelNote": "Inserts and house ads for the Special Editions",
      "count": 12,
      "featured": [
        "collar",
        "quarter",
        "question",
        "cab"
      ]
    },
    {
      "id": "poster",
      "label": "Posters",
      "panelNote": "Essays recast as movie posters",
      "count": 5,
      "featured": [
        "doom",
        "traveler",
        "sovereign",
        "inauthentic"
      ]
    },
    {
      "id": "object",
      "label": "Objects",
      "panelNote": "Things that should not exist, and one that now does",
      "count": 4,
      "featured": [
        "cereal",
        "game",
        "newsstand"
      ]
    }
  ],
  "homeCardStack": [
    "bottlenecks",
    "sovereign",
    "direct",
    "correction"
  ],
  "wideTile": "newsstand",
  "gameUrl": "/research/ad-department/agency-era/index.html",
  "pieces": [
    {
      "order": 1,
      "id": "judgment",
      "group": "print",
      "format": "Long copy",
      "sells": "The Agency Era",
      "title": "Intelligence is getting cheaper. Judgment isn’t.",
      "note": "One lamp, one notebook and three short columns of copy. The quietest page in the set.",
      "href": "/writing/agency-era",
      "linkLabel": "Read The Agency Era",
      "alt": "Cream print ad with a small photo of a desk lamp over a notebook and the headline Intelligence is getting cheaper. Judgment isn’t.",
      "src": "/research/ad-department/ads/judgment.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 2,
      "id": "correction",
      "group": "print",
      "format": "Editor’s markup",
      "sells": "The Agency Era",
      "title": "We’re entering an agency era.",
      "note": "The thesis as a proofreader’s fix. “AI” gets struck out and the red pen does the arguing.",
      "href": "/writing/agency-era",
      "linkLabel": "Read The Agency Era",
      "alt": "Typographic ad reading We’re entering an AI era, with AI crossed out in red ink and agency written above it.",
      "src": "/research/ad-department/ads/correction.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 3,
      "id": "scarcest",
      "group": "print",
      "format": "Pull quote",
      "sells": "The Agency Era",
      "title": "The scarcest thing in the building is the person who decides what the intelligence is for.",
      "note": "A pull quote over a server hall at dusk, with the six things that gain value listed underneath.",
      "href": "/writing/agency-era",
      "linkLabel": "Read The Agency Era",
      "alt": "Ad with a silhouetted figure looking over a city and server racks, above a large pull quote.",
      "src": "/research/ad-department/ads/scarcest.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 4,
      "id": "laughed",
      "group": "print",
      "format": "Mail-order long copy",
      "sells": "The pipeline case study",
      "title": "They laughed when I said I’d built my own research desk in a week.",
      "note": "An engraved 1920s crowd, a laptop and a coupon box. Sells the daily intelligence pipeline write-up.",
      "href": "/writing/i-built-a-daily-intelligence-pipeline-in-two-days",
      "linkLabel": "Read the case study",
      "alt": "Vintage engraved-style ad of a 1920s crowd gathered around a man at a laptop.",
      "src": "/research/ad-department/ads/laughed.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 5,
      "id": "direct",
      "group": "print",
      "format": "One-word poster",
      "sells": "The Agency Era",
      "title": "Direct.",
      "note": "A conductor, a swarm of machines and a single verb.",
      "href": "/writing/agency-era",
      "linkLabel": "Read The Agency Era",
      "alt": "Lime green poster with a black silhouette of a conductor directing white icons of drones, robots, turbines and servers.",
      "src": "/research/ad-department/ads/direct.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 6,
      "id": "leverage",
      "group": "print",
      "format": "Cinematic still",
      "sells": "The Agency Era",
      "title": "The machines got better. But so did our leverage.",
      "note": "A small figure on a footbridge under cooling towers gone green.",
      "href": "/writing/agency-era",
      "linkLabel": "Read The Agency Era",
      "alt": "Moody image of a lone figure on a bridge beneath overgrown cooling towers.",
      "src": "/research/ad-department/ads/leverage.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 7,
      "id": "skill",
      "group": "print",
      "format": "Portrait",
      "sells": "The Agency Era",
      "title": "The skill that matters most is deciding what’s worth doing.",
      "note": "A studio portrait with a wire headset and the second line in italics: And then doing it.",
      "href": "/writing/agency-era",
      "linkLabel": "Read The Agency Era",
      "alt": "Portrait of a grey-haired man in profile wearing a thin brass headset, eyes closed.",
      "src": "/research/ad-department/ads/skill.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 8,
      "id": "brief",
      "group": "print",
      "format": "Night study",
      "sells": "The pipeline case study",
      "title": "While you slept, the brief wrote itself.",
      "note": "A lit desk at night and a brief waiting on it by morning.",
      "href": "/writing/i-built-a-daily-intelligence-pipeline-in-two-days",
      "linkLabel": "Read the case study",
      "alt": "Dark study at night with a glowing laptop on a wooden desk by a window.",
      "src": "/research/ad-department/ads/brief.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 9,
      "id": "physical",
      "group": "print",
      "format": "Landscape",
      "sells": "Energy, Compute, and Governance",
      "title": "When intelligence gets cheap, the frontier gets physical.",
      "note": "Data halls on an arctic fjord under the aurora. Energy, grid and raw materials in one frame.",
      "href": "/writing/energy-compute-and-governance-measuring-the-velocity-of-change",
      "linkLabel": "Read the essay",
      "alt": "Arctic fjord at dusk with steaming industrial buildings along the shore under an aurora.",
      "src": "/research/ad-department/ads/physical.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 10,
      "id": "bottlenecks",
      "group": "print",
      "format": "Travel poster",
      "sells": "The Thesis Tracker",
      "title": "Follow the bottlenecks.",
      "note": "A national park print for pylons and data halls. “Hype” gets the red pen.",
      "href": "/thesis-tracker",
      "linkLabel": "View the Thesis Tracker",
      "alt": "Orange screen-print style poster of power lines, a mesa, data centers and solar panels, with the word hype crossed out and bottlenecks written above.",
      "src": "/research/ad-department/ads/bottlenecks.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 11,
      "id": "permission",
      "group": "print",
      "format": "Lone figure",
      "sells": "You Really Can Just Do Things",
      "title": "Nobody’s gonna give you permission.",
      "note": "The cowboy ad, moved to a hangar at sunset.",
      "href": "/writing/you-really-can-just-do-things",
      "linkLabel": "Read the essay",
      "alt": "A pilot in a worn flight jacket leaning against a ship in a hangar at sunset.",
      "src": "/research/ad-department/ads/permission.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 12,
      "id": "crew",
      "group": "print",
      "format": "Ensemble",
      "sells": "The Agency Era",
      "title": "Small teams. One swarm. New playbooks.",
      "note": "Three people and five robots in suits around a chart table.",
      "href": "/writing/agency-era",
      "linkLabel": "Read The Agency Era",
      "alt": "Three people and five brass robots in suits lean over a glowing chart table beside a porthole with a view of a planet.",
      "src": "/research/ad-department/ads/crew.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 13,
      "id": "frontier",
      "group": "print",
      "format": "Lone figure",
      "sells": "The Agency Era",
      "title": "The frontier pays whoever shows up.",
      "note": "A man with a briefcase on a ridge above a launch field.",
      "href": "/writing/agency-era",
      "linkLabel": "Read The Agency Era",
      "alt": "A man in a long coat carrying a briefcase stands on a ridge overlooking rockets on a red plain.",
      "src": "/research/ad-department/ads/frontier.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 14,
      "id": "collar",
      "group": "mag",
      "format": "Issue 01 · Feature 01",
      "sells": "Issue 01",
      "title": "A blue collar. A white collar. Same hook.",
      "note": "A catalogue still life for the essay on work that can move.",
      "href": "/research/special-editions/issues/dougantin_sovereign_individual_issue_01.html",
      "linkLabel": "Read Issue 01",
      "alt": "White ad with a denim collar and a white dress collar hanging from the same brass hook.",
      "src": "/research/ad-department/ads/collar.jpg",
      "width": 1086,
      "height": 1448
    },
    {
      "order": 15,
      "id": "allegiances",
      "group": "mag",
      "format": "Issue 01 · Feature 03",
      "sells": "Issue 01",
      "title": "One person. Several allegiances.",
      "note": "A blue and gold engraving for the essay on overlapping authority.",
      "href": "/research/special-editions/issues/dougantin_sovereign_individual_issue_01.html",
      "linkLabel": "Read Issue 01",
      "alt": "Ornate blue and gold engraved ad of a man standing under an arch between a cathedral and a network of institutions.",
      "src": "/research/ad-department/ads/allegiances.jpg",
      "width": 1086,
      "height": 1448
    },
    {
      "order": 16,
      "id": "map",
      "group": "mag",
      "format": "Issue 01 · Feature 04",
      "sells": "Issue 01",
      "title": "First, find your people. Then draw the map.",
      "note": "Four settlers and a blank chart, seen from a cargo ramp.",
      "href": "/research/special-editions/issues/dougantin_sovereign_individual_issue_01.html",
      "linkLabel": "Read Issue 01",
      "alt": "Four people study a blank map on a hilltop at sunrise, framed by the open door of a cargo ship.",
      "src": "/research/ad-department/ads/map.jpg",
      "width": 1086,
      "height": 1448
    },
    {
      "order": 17,
      "id": "bag",
      "group": "mag",
      "format": "Issue 01 · Feature 06",
      "sells": "Issue 01",
      "title": "Pack what won’t fit in a bag.",
      "note": "A two-color travel poster with a house and a desk inside the suitcase.",
      "href": "/research/special-editions/issues/dougantin_sovereign_individual_issue_01.html",
      "linkLabel": "Read Issue 01",
      "alt": "Orange and blue poster of an open suitcase containing a desk, a lamp and a small house.",
      "src": "/research/ad-department/ads/bag.jpg",
      "width": 1086,
      "height": 1448
    },
    {
      "order": 18,
      "id": "quarter",
      "group": "mag",
      "format": "Issue 01 · Feature 08",
      "sells": "Issue 01",
      "title": "Hire the quarter. Get the whole brain.",
      "note": "Swiss-style type and one red crayon circle. The case for the quarter-time job.",
      "href": "/research/special-editions/issues/dougantin_sovereign_individual_issue_01.html",
      "linkLabel": "Read Issue 01",
      "alt": "Typographic ad with a large one quarter fraction circled in red crayon and a small halftone figure.",
      "src": "/research/ad-department/ads/quarter.jpg",
      "width": 1086,
      "height": 1448
    },
    {
      "order": 19,
      "id": "money",
      "group": "mag",
      "format": "Issue 02 · Dispatch 01",
      "sells": "Issue 02",
      "title": "You can move. Can your money?",
      "note": "A night train, a gloved hand on a case and a bank vault sliding past the window.",
      "href": "/research/special-editions/issues/the_sovereign_individual_weekly_issue_02.html",
      "linkLabel": "Read Issue 02",
      "alt": "A woman in a 1940s coat on a train holds a leather case while a bank vault passes outside the window.",
      "src": "/research/ad-department/ads/money.jpg",
      "width": 1086,
      "height": 1448
    },
    {
      "order": 20,
      "id": "question",
      "group": "mag",
      "format": "Issue 02 · Dispatch 03",
      "sells": "Issue 02",
      "title": "It answered the wrong question perfectly.",
      "note": "A pen plotter draws the bridge. A hand adds the ferry in red.",
      "href": "/research/special-editions/issues/the_sovereign_individual_weekly_issue_02.html",
      "linkLabel": "Read Issue 02",
      "alt": "A pen plotter draws a suspension bridge in blue ink while a hand sketches a small ferry in red pencil.",
      "src": "/research/ad-department/ads/question.jpg",
      "width": 1086,
      "height": 1448
    },
    {
      "order": 21,
      "id": "cab",
      "group": "mag",
      "format": "Issue 02 · Dispatch 05",
      "sells": "Issue 02",
      "title": "The cab is empty. The operator is at work.",
      "note": "A mine truck with nobody in it, and an inset of where the driver went.",
      "href": "/research/special-editions/issues/the_sovereign_individual_weekly_issue_02.html",
      "linkLabel": "Read Issue 02",
      "alt": "View from inside an empty mining truck cab, with an inset photo of an operator at a desk.",
      "src": "/research/ad-department/ads/cab.jpg",
      "width": 1086,
      "height": 1448
    },
    {
      "order": 22,
      "id": "word",
      "group": "mag",
      "format": "Issue 02 · Dispatch 10",
      "sells": "Issue 02",
      "title": "Don’t take our word for it.",
      "note": "A wall of identical television hosts and one reader ignoring them.",
      "href": "/research/special-editions/issues/the_sovereign_individual_weekly_issue_02.html",
      "linkLabel": "Read Issue 02",
      "alt": "A woman reads a magazine in front of a wall of nine televisions showing the same smiling host.",
      "src": "/research/ad-department/ads/word.jpg",
      "width": 1086,
      "height": 1448
    },
    {
      "order": 23,
      "id": "graded",
      "group": "mag",
      "format": "House ad",
      "sells": "Issue 02",
      "title": "Written in 2023. Graded by you.",
      "note": "A manuscript, a red pencil and an invitation to mark it up.",
      "href": "/research/special-editions/issues/the_sovereign_individual_weekly_issue_02.html",
      "linkLabel": "Read Issue 02",
      "alt": "Cream ad with a small photo of a typed manuscript and a red pencil.",
      "src": "/research/ad-department/ads/graded.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 24,
      "id": "market",
      "group": "mag",
      "format": "House ad",
      "sells": "Issue 02",
      "title": "Your job just went on the world market.",
      "note": "An office with a typewriter, a green lamp and the whole planet in the window.",
      "href": "/research/special-editions/issues/the_sovereign_individual_weekly_issue_02.html",
      "linkLabel": "Read Issue 02",
      "alt": "A man in shirtsleeves looks out of an office window at Earth from orbit.",
      "src": "/research/ad-department/ads/market.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 25,
      "id": "story",
      "group": "mag",
      "format": "House ad",
      "sells": "Issue 01",
      "title": "Three headlines. One story.",
      "note": "A laptop, a coin and a passport on one thread.",
      "href": "/research/special-editions/issues/dougantin_sovereign_individual_issue_01.html",
      "linkLabel": "Read Issue 01",
      "alt": "Navy poster with a laptop, a coin and a passport strung on a single gold thread.",
      "src": "/research/ad-department/ads/story.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 26,
      "id": "doom",
      "group": "poster",
      "format": "70s thriller",
      "sells": "Issue 02",
      "title": "Doom Loop",
      "note": "“The warning signs are flashing.” Dispatch 02, written during the 2023 debt ceiling standoff.",
      "href": "/research/special-editions/issues/the_sovereign_individual_weekly_issue_02.html",
      "linkLabel": "Read Issue 02",
      "alt": "Seventies thriller poster of a lone figure walking a circular path in front of a columned government building.",
      "src": "/research/ad-department/ads/doom.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 27,
      "id": "traveler",
      "group": "poster",
      "format": "70s adventure",
      "sells": "Issue 01",
      "title": "The Perpetual Traveler",
      "note": "“Why live in one country?” Feature 05, with three flags and no fixed address.",
      "href": "/research/special-editions/issues/dougantin_sovereign_individual_issue_01.html",
      "linkLabel": "Read Issue 01",
      "alt": "Painted adventure poster of a woman in a yellow coat with a red suitcase walking toward a jet under two moons.",
      "src": "/research/ad-department/ads/traveler.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 28,
      "id": "sovereign",
      "group": "poster",
      "format": "80s neon",
      "sells": "Issue 01",
      "title": "The Sovereign Individual",
      "note": "“They left the office. Then they kept going.” The poster for the whole collection.",
      "href": "/research/special-editions/issues/dougantin_sovereign_individual_issue_01.html",
      "linkLabel": "Read Issue 01",
      "alt": "Neon eighties poster of four silhouettes with briefcases walking toward a striped sunset.",
      "src": "/research/ad-department/ads/sovereign.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 29,
      "id": "inauthentic",
      "group": "poster",
      "format": "80s horror",
      "sells": "Issue 02",
      "title": "An Age of Inauthentic Content",
      "note": "“What you consume tells the world how you’re programmed.” Dispatch 09.",
      "href": "/research/special-editions/issues/the_sovereign_individual_weekly_issue_02.html",
      "linkLabel": "Read Issue 02",
      "alt": "Eighties horror poster of one alarmed woman in a crowd of grinning people lit blue by their phones.",
      "src": "/research/ad-department/ads/inauthentic.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 30,
      "id": "dispatches",
      "group": "poster",
      "format": "90s techno-thriller",
      "sells": "Issue 02",
      "title": "Twelve Dispatches",
      "note": "“The banks were failing. The machines were talking. Someone was taking notes.”",
      "href": "/research/special-editions/issues/the_sovereign_individual_weekly_issue_02.html",
      "linkLabel": "Read Issue 02",
      "alt": "Nineties thriller poster of a man at a glowing computer monitor in a dark office during a rainstorm.",
      "src": "/research/ad-department/ads/dispatches.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 31,
      "id": "cereal",
      "group": "object",
      "format": "Cereal box",
      "sells": "Issue 02",
      "title": "Doom Loops",
      "note": "Part of an unbalanced budget. Now with 120% debt-to-GDP. Free inside: Dispatch 02.",
      "href": "/research/special-editions/issues/the_sovereign_individual_weekly_issue_02.html",
      "linkLabel": "Read Issue 02",
      "alt": "A red cereal box called Doom Loops with a cartoon tin can kicking itself down a looping road.",
      "src": "/research/ad-department/ads/cereal.jpg",
      "width": 1024,
      "height": 1536
    },
    {
      "order": 32,
      "id": "game",
      "group": "object",
      "format": "Big-box PC game",
      "sells": "The game",
      "title": "Agency Era",
      "note": "The strategy game of energy, compute and judgment. One player, unlimited agents.",
      "href": "/research/ad-department/agency-era/index.html",
      "linkLabel": "Play the game",
      "alt": "A worn big-box PC game cover titled Agency Era showing a figure in a long coat above a city of reactors and rockets.",
      "src": "/research/ad-department/ads/game.jpg",
      "width": 1086,
      "height": 1448
    },
    {
      "order": 33,
      "id": "newsstand",
      "group": "object",
      "format": "Two-page spread",
      "sells": "All four editions",
      "title": "Not sold on any newsstand.",
      "note": "A kiosk on an orbital promenade, stocked with nothing but the editions.",
      "href": "#editions-title",
      "linkLabel": "Browse the editions",
      "alt": "A two-page spread of a newsstand on a space station promenade where a man in a grey suit reads a magazine.",
      "src": "/research/ad-department/ads/newsstand.jpg",
      "width": 1200,
      "height": 800
    },
    {
      "order": 34,
      "id": "starterpack",
      "group": "object",
      "format": "Starter pack",
      "sells": "The Agency Era",
      "title": "The Agency Era Starterpack",
      "note": "A rocket, a solar panel, a server rack, a robot and a permission slip stamped Not Required.",
      "href": "/writing/agency-era",
      "linkLabel": "Read The Agency Era",
      "alt": "A starter pack collage with a figure in a long coat surrounded by a rocket, drones, a solar panel, cooling towers, a server rack and a robot.",
      "src": "/research/ad-department/ads/starterpack.jpg",
      "width": 1086,
      "height": 1448
    }
  ]
} as const satisfies AdDepartmentData;
