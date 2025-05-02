const jwt = require('jsonwebtoken');
const User = require('../models/user');
var CryptoJS = require("crypto-js");

let archieveTargetWordle = [
  [
    "This is your daily clue",
    "answer",
    "URL",
    "Def"
  ],
  [
    "Difficult to hide ring in collection",
    "hoard",
    "https://youtu.be/8c6cOiDDVas",
    "collection"
  ],
  [
    "Animal oddly eats bat head",
    "beast",
    "https://youtu.be/-1ibijv_Cfs",
    "Animal"
  ],
  [
    "Faces in the city hear you scratching",
    "itchy",
    "https://youtu.be/UvNd3iigs5I",
    "scratching"
  ],
  [
    "Original poster with epoch concert",
    "opera",
    "https://youtu.be/Adrbg72pues",
    "concert"
  ],
  [
    "Land of the heart in chaos",
    "earth",
    "https://youtu.be/7NJAEXgGe1U",
    "Land"
  ],
  [
    "Holiday troops without eyes eat me",
    "trips",
    "https://youtu.be/ZKEKFkYdZos",
    "Holiday"
  ],
  [
    "Game inside catches steam",
    "chess",
    "https://youtu.be/ouHaxCSey-g",
    "Game"
  ],
  [
    "Bottomless salad dish tossed and turned",
    "dials",
    "https://youtu.be/280iMqHMJNA",
    "turned"
  ],
  [
    "Spring out of jail payment to embrace university",
    "bound",
    "https://youtu.be/usI7II3oQbE",
    "Spring"
  ],
  [
    "Man on board eating right seafood",
    "prawn",
    "https://youtu.be/OnADsE-fPM8",
    "seafood"
  ],
  [
    "Trunk and tangled roots",
    "torso",
    "https://youtube.com/shorts/V3p_cDxhsw8",
    "Trunk"
  ],
  [
    "Maybe canines in part of golf course on Thursday",
    "teeth",
    "https://youtu.be/UFBpC1jidVY",
    "Maybe canines"
  ],
  [
    "Mined inside out jeans",
    "denim",
    "https://youtu.be/4zWNbhkgSec",
    "jeans"
  ],
  [
    "Flee in rest without direction lead on",
    "flirt",
    "https://youtu.be/RjYIUGIfiUk",
    "lead on"
  ],
  [
    "Blade splitting peoples word",
    "sword",
    "https://youtu.be/B_2C4FoGF_c",
    "Blade"
  ],
  [
    "Check a Buddhist at regular intervals",
    "audit",
    "https://youtu.be/kV7LCjr2Meo",
    "Check"
  ],
  [
    "Southern Sisters invade young male with authority",
    "bossy",
    "https://youtu.be/o5XVDx_3t_U",
    "authority"
  ],
  [
    "Scottish snack offered in disco nearby",
    "scone",
    "https://youtu.be/nEULIvPVj5k",
    "Scottish snack"
  ],
  [
    "My holding? One dollar!",
    "money",
    "https://youtu.be/Xqwp6nG8ZKo",
    "dollar"
  ],
  [
    "Utilize America with General Electric",
    "usage",
    "https://youtu.be/5VafI0wS5sQ",
    "Utilize"
  ],
  [
    "Girl trapping judge’s assassin",
    "ninja",
    "https://youtu.be/5lYP9FrJ_qs",
    "assassin"
  ],
  [
    "Trinity right within you",
    "three",
    "https://youtu.be/lnx2B5p5bJg",
    "Trinity"
  ],
  [
    "Knock out jockey regularly — that's strange!",
    "kooky",
    "https://youtu.be/m2SHivuWFh8",
    "that's strange"
  ],
  [
    "Strong Lee flipped street",
    "steel",
    "https://youtu.be/5LaF1XR-FRY",
    "Stong"
  ],
  [
    "Bravo! Right playing card held up!",
    "brace",
    "https://youtu.be/GLINWL77gMU",
    "held up"
  ],
  [
    "Different occasionally lost girl",
    "other",
    "https://youtu.be/a1N49UcoasA",
    "Different"
  ],
  [
    "Garbage Thursday Sandwich with brass belly",
    "trash",
    "https://youtu.be/6q_c5dtfafY",
    "Garbage"
  ],
  [
    "Pay 100 rings to destroy sin",
    "coins",
    "https://youtu.be/pExvnD2ZGCY",
    "Pay"
  ],
  [
    "Scandium shattered ear terrifies",
    "scare",
    "https://youtu.be/3jQ5X54O-a4",
    "terrifies"
  ],
  [
    "Donut deli flips cooking grease",
    "oiled",
    "https://youtu.be/CsQuiWu9OLw",
    "grease"
  ],
  [
    "Patient's back starts to cause intermittent, often terrible, suffering",
    "stoic",
    "https://youtube.com/shorts/dz3a-SON4fQ",
    "Patient"
  ],
  [
    "Server missing one essential liquid",
    "water",
    "https://youtu.be/pTwjIVkuJkw",
    "essential liquid"
  ],
  [
    "Be left with large and ultimately unlovely stomach",
    "belly",
    "https://youtu.be/q8qWPTDnMNM",
    "stomatch"
  ],
  [
    "Aircraft ugly, did you say?",
    "plane",
    "https://youtu.be/u5QWWfAFA7w",
    "Aircraft"
  ],
  [
    "By Hollywood location, delve regularly for scoop",
    "ladle",
    "https://youtu.be/XKLTw0Q877Y",
    "scoop"
  ],
  [
    "A record held by a hotel in Alcoholics Anonymous",
    "alpha",
    "https://youtu.be/O83h3bdnxgE",
    "A"
  ],
  [
    "Excusing Artifical Intelligence for capturing library",
    "alibi",
    "https://youtube.com/shorts/GS4ELA6Z5Mo",
    "Excusing"
  ],
  [
    "Driver flipped car, goes to emergency room!",
    "racer",
    "https://youtube.com/shorts/x9T26NmTEsk",
    "Driver"
  ],
  [
    "Certification only initially accepted by senior academic",
    "proof",
    "https://youtu.be/2mbeXBWNEXs",
    "senior academic"
  ],
  [
    "Bread crust covers sound iron slab",
    "board",
    "https://youtu.be/nLKMB-T0EFI",
    "slab"
  ],
  [
    "Brag about large, playful farm animal",
    "gloat",
    "https://youtube.com/shorts/IyVeq8cnflA",
    "Brag"
  ],
  [
    "Scratch hat head in coffee shop",
    "chafe",
    "https://youtu.be/qjHlY3ty3-0",
    "Scratch"
  ],
  [
    "One sticky mess left in hut",
    "igloo",
    "https://youtu.be/g8-EkRBt-mo",
    "hut"
  ],
  [
    "Win over tucking into clutch arm",
    "charm",
    "https://youtu.be/j28eGQTdAc0",
    "Win over"
  ],
  [
    "Bitter Romeo drowning in toxic waste",
    "acrid",
    "https://youtu.be/CYVy4Kzm9R8",
    "Bitter"
  ],
  [
    "Rock star to out new EP debut",
    "stone",
    "https://youtu.be/crq4_SCH9Wo",
    "Rock"
  ],
  [
    "Even chance to dye mixed with sweetener",
    "honey",
    "https://youtu.be/W-P5YjgszTQ",
    "sweetener"
  ],
  [
    "Beat half of us in the water",
    "pound",
    "https://youtu.be/SgUg-oCq8xE",
    "Beat"
  ],
  [
    "Captain destroys plot I am in",
    "pilot",
    "https://youtu.be/EjKSUyBZyvg",
    "Captian"
  ],
  [
    "Find, small amount",
    "trace",
    "https://youtu.be/UUzyRjfwR1w",
    "Find, small amount"
  ],
  [
    "One page coming out of directory",
    "recto",
    "https://youtu.be/viU5sfExgxs",
    "One page"
  ],
  [
    "Slowly transform school party going over hotel",
    "morph",
    "https://youtu.be/DpwuugIgbiU",
    "Slowly transform"
  ],
  [
    "Spotted scavenger bringing foreign money into Hawaii",
    "hyena",
    "https://youtu.be/2NMuRfCK4XI",
    "Spotted scavenger"
  ],
  [
    "Might be indebted for interrupting press release",
    "power",
    "https://youtu.be/wlY4MfB-Ff8",
    "Might"
  ],
  [
    "Snare wild ones crossing over at first",
    "noose",
    "https://youtu.be/izQiz-oMCfg",
    "Snare"
  ],
  [
    "Played the part of cadet at sea",
    "acted",
    "https://youtu.be/_bGHph9NNZI",
    "Played the part"
  ],
  [
    "Reporter’s dispatched perfume",
    "scent",
    "https://youtu.be/N9yHGRR-WxA",
    "perfume"
  ],
  [
    "Encirclement, say, if enemy gets energetic at outset",
    "siege",
    "https://youtu.be/5zTOc7X8pSg",
    "Encirclement"
  ],
  [
    "Bad time to bring back group of soldiers",
    "troop",
    "https://youtu.be/FfcHeT6kVeM",
    "group of soldiers"
  ],
  [
    "Fold petal another way",
    "pleat",
    "https://youtu.be/s34uNkY0rDI",
    "Fold"
  ],
  [
    "Meaning to float along",
    "drift",
    "https://youtu.be/K8d9_S4P98E",
    "Meaning to float along"
  ],
  [
    "No Charlie! Latch engineer in turning machine",
    "lathe",
    "https://youtu.be/Odxq8Vr_PUY",
    "turning machine"
  ],
  [
    "Unstable lunatic has gutted kitty",
    "shaky",
    "https://youtu.be/KXJeHkX-GE8",
    "Unstable"
  ],
  [
    "Letters from schoolmaster never enforcing discipline",
    "stern",
    "https://youtu.be/kKgen1tSaMI",
    "enforcing discipline"
  ],
  [
    "Condiment initially arrives into our London inventory",
    "aioli",
    "https://youtu.be/1wYYD6dPx04",
    "Condiment"
  ],
  [
    "Product widely drunk without whisky first",
    "yield",
    "https://youtu.be/DtOJUM1zxyA",
    "Product"
  ],
  [
    "Storehouse leads don't even plan on trying",
    "depot",
    "https://youtu.be/NOkXPZ90Dcc",
    "Storehouse"
  ],
  [
    "Oddly nice, have started in ideal position",
    "niche",
    "https://youtu.be/LuZPAsCqP5c",
    "ideal position"
  ],
  [
    "Thoughts frequently find pedals",
    "ideas",
    "https://youtu.be/FKSahrQQdB4",
    "Thoughts"
  ],
  [
    "Saga inevitably reduced in length once more",
    "again",
    "https://youtu.be/RRsC-lTV_wk",
    "once more"
  ],
  [
    "A flower sprang up",
    "arose",
    "https://youtu.be/MuP9mr-gioc",
    "A flower sprang up"
  ],
  [
    "Physician became dictator's prisoner",
    "medic",
    "https://youtu.be/GNmHst5_TAI",
    "Physician"
  ],
  [
    "Assertive resident assistant interjects immediately, but still helpful",
    "brash",
    "https://youtu.be/DGe6M74kqUM",
    "Assertive"
  ],
  [
    "Stole vehicle parked in San Francisco",
    "scarf",
    "https://youtu.be/b0Alxr__HQY",
    "Stole"
  ],
  [
    "Devoted thank you succeeding baked dessert",
    "piety",
    "https://youtu.be/q6UHvqKogoY",
    "Devoted"
  ],
  [
    "Bears fancy sword",
    "saber",
    "https://youtu.be/ioOYJBHUlJc",
    "sword"
  ],
  [
    "Strange, third in charge breaks line",
    "alien",
    "https://youtu.be/Q3T9OK1bAJc",
    "Strange"
  ],
  [
    "Fruit centers anger wry monkey",
    "grape",
    "https://youtu.be/qDiQJUVk5mo",
    "Fruit"
  ],
  [
    "Beefy bloodsucker takes in source of hemoglobin",
    "thick",
    "https://youtu.be/cCl0RSFaH3o",
    "Beefy"
  ],
  [
    "Killed snail, unfortunately",
    "slain",
    "https://youtu.be/ANwNya2f5Qo",
    "Killed"
  ],
  [
    "Sports field, found in square naturally",
    "arena",
    "https://youtu.be/04zthds5QgQ",
    "Sports field"
  ],
  [
    "A general finally caught spy",
    "agent",
    "https://youtu.be/sMWgUJfsXSc",
    "spy"
  ],
  [
    "Type of performance essential to Ramadan ceremony",
    "dance",
    "https://youtu.be/76Q2ni28aKs",
    "Type of performance"
  ],
  [
    "Bless butter, say",
    "utter",
    "https://youtu.be/OkXg5SXmqc0",
    "say"
  ],
  [
    "One had brought up doughnuts state",
    "idaho",
    "https://youtu.be/_g5_SbSGzlU",
    "state"
  ], 
  [
    "Arizona university backing away from red color",
    "azure",
    "https://youtu.be/LelwgpfxSAA",
    "color"
  ],
  [
    "Pike initially served with fruit",
    "spear",
    "https://youtu.be/RrOXsWMl5l0",
    "Pike"
  ],
  [
    "Belt pieces upside down",
    "strap",
    "https://youtu.be/fmDF3Ggq4MA",
    "Belt"
  ],
  [
    "Sacred oath includes statement of beliefs",
    "credo",
    "https://youtu.be/6au7Ls7IGjA",
    "statement of beliefs"
  ],
  [
    "Requires massages, by the sound of it",
    "needs",
    "https://youtu.be/uIQPAfO-xvo",
    "Requires"
  ],
  [
    "Crime under control in center, I believe",
    "theist",
    "https://youtu.be/PZBkZ1Awmcs",
    "I believe"
  ],
  [
    "Serve up a drink fit for a king",
    "regal",
    "https://youtu.be/80gHEkw_Pa4",
    "fit for a king"
  ],
  [
    "Fans strike November for introduction to Taylor Swift",
    "fast",
    "https://youtu.be/5SM3y_0xhAA",
    "Swift"
  ],
  [
    "Almost decapitated too soon",
    "early",
    "https://youtu.be/5_9XvdGcHoM",
    "too soon"
  ],
  [
    "Cheerful star going to New York",
    "sunny",
    "https://youtu.be/e0D1zk8upxI",
    "Cheerful"
  ],
  [
    "Stews internally, master found laid back",
    "frets",
    "https://youtu.be/vR6DA6TWpa0",
    "Stews"
  ],
  [
    "Minor actor using some index-trackers",
    "extra",
    "https://youtu.be/urzLPm0YmyY",
    "Minor actor"
  ],
  [
    "AI disrupts doctor bug",
    "aphid",
    "https://youtu.be/b-liuzegMnE",
    "bug"
  ],
  [
    "Unit of energy found in car port",
    "fjord",
    "https://youtu.be/RONiPXfNlX8",
    "port"
  ],
  [
    "Troubled senator taking 5th conceals motive",
    "reason",
    "https://youtu.be/9IOm5_ouGYw",
    "motive"
  ],
  [
    "You might wear these belts",
    "socks",
    "https://youtu.be/X4P4WQ3li5o",
    "You might wear these belts"
  ],
  [
    "Brave baby losing heart",
    "daring",
    "https://youtu.be/79Mr-VK7mo8",
    "Brave"
  ],
  [
    "Market quarterback replaces detail captain",
    "retail",
    "https://youtu.be/KwTgdlWmk9I",
    "Market"
  ],
  [
    "Folktales of rough journey",
    "course",
    "https://youtu.be/97TRdMOJnAg",
    "journey"
  ],
  [
    "Rancid eradication hides apple beverage",
    "cider",
    "https://youtu.be/BiO_Vy213aI",
    "apple beverage"
  ],
  [
    "Pointlessly sad unless ten? Mature!",
    "adult",
    "https://youtu.be/vko9hkPwb-Y",
    "Mature"
  ],
  [
    "Comments on tossed stone",
    "notes",
    "https://youtu.be/6zPLGQ8cmlg",
    "Comments on"
  ],
  [
    "There it is, five-nil, Italy against the French",
    "voila",
    "https://youtu.be/me3VnqQ2e6g",
    "There it is"
  ],
  [
    "In mirror, Rebecca lifted slip",
    "error",
    "https://youtu.be/_QkWG5BzjSY",
    "slip"
  ],
  [
    "Uproar about cryptics being cut back",
    "outcry",
    "https://youtu.be/wtCsTAe7jZs",
    "Uproar"
  ],
  [
    "Four hallelujahs intermittently spoken",
    "oral",
    "https://youtu.be/wW6BMdLQv9I",
    "spoken"
  ],
  [
    "Geez! She messed up twice!",
    "sheesh",
    "https://youtu.be/9jCTXo3h4CU",
    "Geez"
  ],
  [
    "Silence drug smuggler, going around very loudly",
    "muffle",
    "https://youtu.be/pSaeffQKC0k",
    "Silence"
  ],
  [
    "“Drop your weapons” said Mr Fantastic",
    "disarm",
    "https://youtu.be/850i-5sDNVw",
    "Drop your weapons"
  ],
  [
    "‘Fight Club’ title, losing it",
    "battle",
    "https://youtu.be/MVaICvaaVLY",
    "Fight"
  ],
  [
    "Sent out to sea… returning oddly mentally sharp",
    "astute",
    "https://youtu.be/QWNfaQtXwms",
    "mentally sharp"
  ],
  [
    "Captivate deflated armchair falling apart",
    "charm",
    "https://youtu.be/klsPrwuMXdk",
    "Captivate"
  ],
  [
    "Bin of big toes starts an itch",
    "trash",
    "https://youtu.be/WdzukKCZskY",
    "Bin"
  ],
  [
    "First fire flower sounds cold",
    "froze",
    "https://youtu.be/MEbLgEqM5uY",
    "cold"
  ],
  [
    "Campfire snacks of small, medium or enormous crusts",
    "smores",
    "https://youtu.be/nbJhoqfOtps",
    "Campire snacks"
  ],
  [
    "Side effect drains energy and messes with motive",
    "vomit",
    "https://youtu.be/NJX7On9-j0A",
    "Side effect"
  ],
  [
    "Eminem’s missing in upset that may go viral",
    "meme",
    "https://youtu.be/zGDagLpuhsU",
    "that may go viral"
  ],
  [
    "Inexpensive peach looks wrong",
    "cheap",
    "https://youtu.be/fadKDCMCV5E",
    "Inexpensive"
  ],
  [
    "Money allocated to adjust debug time",
    "budget",
    "https://youtu.be/PYEnB6Pg5hY",
    "Money allocated"
  ],
  [
    "An alternative to confuse that girl",
    "other",
    "https://youtu.be/ubWn9fQAHiY",
    "An alternative"
  ],
  [
    "Men lost in gym or talking",
    "mortal",
    "https://youtu.be/MqfCVNUtNhE",
    "Men"
  ],
  [
    "Root for big win after starters exit",
    "origin",
    "https://youtu.be/f-cLMTscmqI",
    "Root"
  ],
  [
    "Seconds after winning in ball club it's over",
    "final",
    "https://youtu.be/jgEYZ_f1i9I",
    "it's over"
  ],
  [
    "In bookstore he returns icon",
    "hero",
    "https://youtu.be/GwKbvOmA_zU",
    "icon"
  ],
  [
    "In prime position, she hits fast theft",
    "heist",
    "https://youtu.be/N8oZooX28VU",
    "theft"
  ],
  [
    "Pointy harps cycle",
    "sharp",
    "https://youtu.be/R1VmElMetRM",
    "Pointy"
  ],
  [
    "Hollow man holds our sorrow",
    "mourn",
    "https://youtu.be/myb8tt3dGE8",
    "sorrow"
  ],
  [
    "Laughing and cheerful? Beat it nerd!",
    "rident",
    "https://youtu.be/-Y0jy91L2Xk",
    "Laughing and cheerful?"
  ],
  [
    "Amazing price destroyed when farms core removed",
    "epic",
    "https://youtu.be/eW8h0N64T-4",
    "Amazing"
  ],
  [
    "Broken peace talks end in the key to exit",
    "escape",
    "https://youtu.be/pKT8JGntehk",
    "the key to exit"
  ],
  [
    "Iron Man is not a man?",
    "female",
    "https://youtu.be/MXvdns9I9Jw",
    "not a man?"
  ],
  [
    "10-0 in second half for Athletic? Quite unusual",
    "exotic",
    "https://youtu.be/hRXjuv1u7fk",
    "Quite unusual"
  ],
  [
    "I don’t like that King novel",
    "book",
    "https://youtu.be/DH_jJBia0ng",
    "novel"
  ],
  [
    "Erratic at first, airplay evens out in good time",
    "early",
    "https://youtu.be/nS7ghEw7nMs",
    "in good time"
  ],
  [
    "Cut up inside of skunk hide glued",
    "stuck",
    "https://youtu.be/pEuaNov51wc",
    "glued"
  ],
  [
    "Faced losing face and went bananas",
    "raved",
    "https://youtu.be/L9w8UR28KVw",
    "went bananas"
  ],
  [
    "Empty riverside hotel finally occupied",
    "blank",
    "https://youtu.be/ds2h6G_7lMM",
    "Empty"
  ],
  [
    "Eggs on toast",
    "cheers",
    "https://youtu.be/msxHRewIvFU",
    "Eggs on toast"
  ],
  [
    "This game contains back of this round",
    "disc",
    "https://youtu.be/ov9gUsvCr6o",
    "round"
  ],
  [
    "Pair regularly seen in town inn",
    "twin",
    "https://youtu.be/DeLSI2sOxKg",
    "Pair"
  ],
  [
    "John dismantles top theater yuppie’s heads",
    "potty",
    "https://youtu.be/V8YUJQZQZaM",
    "John"
  ],
  [
    "Lies about alternative sites",
    "rests",
    "https://youtu.be/PtZwfF6j4SA",
    "Lies"
  ],
  [
    "Final climb ends in curves",
    "bends",
    "https://youtu.be/La3RAHQkoqo",
    "curves"
  ],
  [
    "Returned in style to Holiday Inn",
    "hotel",
    "https://youtu.be/nD8RzS0eBJo",
    "Inn"
  ],
  [
    "Now your local outfitter, never sources fabric",
    "nylon",
    "https://youtu.be/Ioed4mmjQiU",
    "fabric"
  ],
  [
    "Generator worked on Monday",
    "dynamo",
    "https://youtu.be/-4Sr6n5veUI",
    "Generator"
  ],
  [
    "At 10, 500 will be there",
    "attend",
    "https://youtu.be/U0TiOdCnOG4",
    "will be there"
  ],
  [
    "Drink whiskey for large bet",
    "wager",
    "https://youtu.be/eYTnZrNAXA8",
    "bet"
  ],
  [
    "Loud organ is thrown away",
    "flung",
    "https://youtu.be/68NpYRd6BGo",
    "thrown away"
  ],
  [
    "Tucked into reverse fetal position on dish",
    "plate",
    "https://youtu.be/VmPQr0JzyyU",
    "dish"
  ],
  [
    "Breakdances going up in the air",
    "ascend",
    "https://youtu.be/Bj_YpGQhWDc",
    "going up in the air"
  ],
  [
    "Two balls fall in hollow bottom making loud noise",
    "boom",
    "https://youtu.be/5LXlUNbsgbU",
    "loud noise"
  ],
  [
    "Don't allow losing games and leaders return pleased",
    "glad",
    "https://youtu.be/9uqVWcU9zT0",
    "pleased"
  ],
  [
    "Record about castle goes on and on (and on)",
    "loop",
    "https://youtu.be/626tYO7ulmI",
    "goes on and on (and on)"
  ],
  [
    "Beverage beginning to clean off with twice as much energy",
    "coffee",
    "https://youtu.be/sVmzT_d-2po",
    "Beverage"
  ],
  [
    "Said to have rented for the minimum",
    "least",
    "https://youtu.be/GHaolwGFTb8",
    "the minimum"
  ],
  [
    "Halt in vacant unoccupied zone",
    "freeze",
    "https://youtu.be/6H4L0GlxaNs",
    "Halt"
  ],
  [
    "Look for organ inside small church",
    "search",
    "https://youtu.be/mCpliIo9k2U",
    "Look for"
  ],
  [
    "Unprofessional, despite regularly getting in earlier",
    "inept",
    "https://youtu.be/IJPk0DHU5VE",
    "Unprofessional"
  ],
  [
    "Hurt baller left out uncovered",
    "bare",
    "https://youtu.be/8aP6M3biSz4",
    "uncovered"
  ],
  [
    "Broken neon light missing one stretch",
    "length",
    "https://youtu.be/T6W4hOxXA18",
    "stretch"
  ],
  [
    "Cut when she held cat",
    "scathe",
    "https://youtu.be/uKv6AY_6DFA",
    "Cut"
  ],
  [
    "Small cuts make man ultimately confused, sick",
    "nicks",
    "https://youtu.be/g-_6pP2CG58",
    "Small cuts"
  ],
  [
    "Fees halved for golf club",
    "iron",
    "https://youtu.be/iq9i5Orgg04",
    "golf club"
  ],
  [
    "Map book starts tracking lost archaeologist in Middle East",
    "atlas",
    "https://youtu.be/AbXZilaDCZc",
    "Map book"
  ],
  [
    "Couple starts reborn after endless pain",
    "pair",
    "https://youtu.be/OXIkr0cjPZQ",
    "Couple"
  ],
  [
    "Discovered no beginnings of grain or rice in ground? First add fluorine!",
    "found",
    "https://youtu.be/ZuhPIvDfIU4",
    "Discovered "
  ],
  [
    "Condition behind half of mother's recurring element",
    "motif",
    "https://youtu.be/n3SXsPTn714",
    "recurring element"
  ],
  [
    "Puzzle dance is no longer backwards",
    "jigsaw",
    "https://youtu.be/YdYcpUUwh-U",
    "Puzzle"
  ],
  [
    "Split stick",
    "branch",
    "https://youtu.be/C_OURVBy3js",
    "Split stick"
  ],
  [
    "Odd number that's even in disguise",
    "seven",
    "https://youtu.be/ZvcF72O-tVg",
    "Odd number"
  ],
  [
    "Some get a leg over to bring joy",
    "elate",
    "https://youtu.be/sUZ_v77eq9A",
    "bring joy"
  ],
  [
    "Several dance topless just the same",
    "anyway",
    "https://youtu.be/McuItjc16g4",
    "just the same"
  ],
  [
    "Darkness of Greek underground cycling",
    "shade",
    "https://youtu.be/2s7Mv9HWBr0",
    "Darkness"
  ],
  [
    "100 binary files begin with your lack of leadership",
    "four",
    "https://youtu.be/5moOZhVJWIM",
    "100 binary"
  ],
  [
    "Confused her with my music",
    "rhyme",
    "https://youtu.be/RJE5fEqeNXk",
    "music"
  ],
  [
    "It is crowded by creative youths primarily",
    "city",
    "https://youtu.be/vDY80wBLmmE",
    "&Lit - The whole clue will be our definition and our wordplay"
  ],
  [
    "Fish’s back. Fish back",
    "heel",
    "https://youtu.be/ptqRZvCItmg",
    "back"
  ],
  [
    "Scales from gecko’s belly and legs",
    "climbs",
    "https://youtu.be/F4OP0BH1n7U",
    "Scales"
  ],
  [
    "Board changing hands is a joke!",
    "prank",
    "https://youtu.be/rKZN-A-zKLE",
    "a joke"
  ],
  [
    "No leaders? Anyone? Someone? Noone. Lost without means.",
    "money",
    "https://youtu.be/9WB73CSGzOY",
    "means"
  ],
  [
    "Circle huge final letter",
    "omega",
    "https://youtu.be/Ug6To5gtTEM",
    "final letter"
  ],
  [
    "Trademark unfinished for alcoholic spirit",
    "brand",
    "https://youtu.be/qblyXX77KYs",
    "Trademark"
  ],
  [
    "Starting 5 Pacers lost and had review",
    "recap",
    "https://youtu.be/n1yRlUy_kKY",
    "had review"
  ],
  [
    "Jumps to extremes",
    "bounds",
    "https://youtu.be/HVbcnstKGH8",
    "Jumps to extremes"
  ]
]

//archiveClue
  exports.archieveClue = async (req, res) => {
  const { message, dailyCrypticlePatreonToken } = req.body;

  const referer = req.headers.referer;

  if (referer != "https://dailycrypticle.com/" && referer != "https://www.dailycrypticle.com/")
    {
      return res.send(["Play at DailyCrypticle.com", "Play at DailyCrypticle.com", "Play at DailyCrypticle.com", "Play at DailyCrypticle.com"]);
    }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing.' });
  }

  let response = [];

  //confirm patreon token is still valid
  if (dailyCrypticlePatreonToken)
  {
    try
    {
      const dailyCrypticlePatreonTokenDecoded = jwt.verify(dailyCrypticlePatreonToken, process.env.JWT_SECRET);

      if (Date.now() <= dailyCrypticlePatreonTokenDecoded.exp * 1000) {
        response = archieveTargetWordle[message];
      }
      else{
        response = [
          "To play previous clues, become a Patreon member!",
          "",
          "Become a Patreon Member!",
          "Become a Patreon Member!"
        ];
      }
    }
    catch
    {
      console.log("Failed to validate JWT Token");

      response = [
        "To play previous clues, become a Patreon member!",
        "",
        "Become a Patreon Member!",
        "Become a Patreon Member!"
      ];
    }
  }
  else{
    response = [
      "To play previous clues, become a Patreon member!",
      "",
      "Become a Patreon Member!",
      "Become a Patreon Member!"
    ];
  }

  res.send(response);
};

let randomizerCrypticles = [
    ["Nepali high in the mountains", "alpine", "", "In the mountains"],
    ["US university, without hesitation, showing excellence", "merit", "", "excellence"],
    ["Heads of all states in African continent", "asia", "", "continent"],
    ["Active serviceman seen in drink", "agile", "", "Active"],
    ["Absolute state", "utter", "", "Absolute state"],
    ["Thoughtless regarding young woman", "remiss", "", "thoughtless"],
    ["Miscalculation caused by tearaway taking time out", "error", "", "miscalculation"],
    ["Drop by around lunchtime at the earliest for material", "poplin", "", "material"],
    ["Couple joined up under Eye, it’s said", "item", "", "Couple"],
    ["Organism used by parasites, a plant", "hosta", "", "plant"],
    ["Pick up article shifted back in corner", "glean", "", "Pick up"],
    ["Sound inherent to Nordic languages", "clang", "", "Sound"],
    ["Upset eating middle of mouldy bloomer", "tulip", "", "bloomer"],
    ["Fairly sure thing!", "rather", "", "Fairly sure thing!"],
    ["Highest note raised in test", "exam", "", "test"],
    ["Whole testament I put in before", "entire", "", "Whole"],
    ["Regularly golfer aims to show brilliance", "gleam", "", "brilliance"],
    ["Impudence beginning on the radio", "sauce", "", "Impudence"],
    ["Small drink, dry, not right for regular", "steady", "", "regular"],
    ["American swine departs on a ship", "aboard", "", "on a ship"],
    ["Argument after Mendelssohn’s fourth movement", "drift", "", "movement"],
    ["Betrayed, one gets out of firm", "sold", "", "Betrayed"],
    ["Milk container – shake then remove top", "udder", "", "Milk container"],
    ["Mike in returning role as vagrant", "tramp", "", "vagrant"],
    ["Got here, ring and type of brooch", "cameo", "", "type of brooch"],
    ["Oarsman, perhaps, in argument with that woman, losing face", "rower", "", "Oarsman, perhaps"],
    ["Straps for horses — some were in stable", "reins", "", "Straps for horses"],
    ["Give an account of explosion", "report", "", "Give an account of explosion"],
    ["Endless courage results in try", "hear", "", "try"],
    ["Vision of attack Everton demand: it starts from the back", "idea", "", "Vision"],
    ["Large-scale electronic image", "epic", "", "Large-scale"],
    ["Go down after winning, dismayed", "upset", "", "dismayed"],
    ["In Arequipa’s first shopping complex, climbing animal", "llama", "", "animal"],
    ["First couple in Harrods look for ring", "halo", "", "ring"],
    ["German child, helpful type", "kind", "", "German child, helpful type"],
    ["Innate quality that’s present", "gift", "", "Innate quality that’s present"],
    ["Like park signs seen occasionally", "akin", "", "Like"],
    ["Children entering John’s revolutionary educational establishment", "school", "", "educational establishment"],
    ["Samoa’s island’s hidden haven", "oasis", "", "haven"],
    ["Proprietor’s old wife in tears on a regular basis", "owner", "", "Proprietor’s"],
    ["Motorway stopped getting repaired", "mended", "", "repaired"],
    ["Anger surrounding loud gun", "rifle", "", "gun"],
    ["Quick nap in Post Office", "presto", "", "Quick"],
    ["Roof worker in quarrel I tried to knock over", "tiler", "", "Roof worker"],
    ["Greek letter, nothing great", "omega", "", "Greek letter"],
    ["Extent right over a head", "reach", "", "Extent"],
    ["Little surgical procedure – time for work in theatre", "opera", "", "work in theatre"],
    ["Free gun dog, absolutely no good", "undo", "", "Free"],
    ["Rolling broadcast in list after cutting is experimental", "trial", "", "experimental"],
    ["Delivery from Mike, first-class parcel at the rear", "mail", "", "Delivery"],
    ["Raises reportedly for recruits", "hires", "", "recruits"],
    ["Lethargic mole taking shelter", "sleepy", "", "Lethargic"],
    ["Subject such as seen in fiction", "liege", "", "Subject"],
    ["Drive inspiring sex over reason", "motive", "", "reason"],
    ["Void, vain and ugly, regularly ignored", "annul", "", "void"],
    ["Pull and keep holding sweetheart", "heave", "", "Pull"],
    ["Certainly backing American bank", "surely", "", "Certainly"],
    ["Make up for regularly missing golf, if asked to", "offset", "", "Make up for"],
    ["Perhaps sheepish individual catching classical sextet", "ovine", "", "Perhaps"],
    ["Compel ignoble criminal to drop name", "oblige", "", "Compel"],
    ["Journey from Finland’s capital requiring little effort", "flight", "", "Journey"],
    ["Spoil broadcast fronted by mischief-maker", "impair", "", "Spoil"],
    ["Tom maybe arresting that man, a swindler", "cheat", "", "a swindler"],
    ["Spiteful remark from Ken’s partner that is dismissed", "barb", "", "Spiteful remark"],
    ["Disease of sailors? Sailor initially affected with the bends", "scurvy", "", "Disease of sailors"],
    ["Domineering sons jabbing schoolfellow?", "bossy", "", "Domineering"],
    ["Artistic group that’s gathered round bar", "saloon", "", "bar"],
    ["Ranch-hand, dodging blow, is to show fear", "cower", "", "show fear"],
    ["Hunk‘s small short dog", "slab", "", "Hunk"],
    ["Sea monster covered up bloomer", "orchid", "", "bloomer"],
    ["A spirit favouring youth", "ageist", "", "favoring youth"],
    ["Ocean floatation vocation", "craft", "", "vocation"],
    ["Away, a particle without end", "apart", "", "away"],
    ["Kind of game not to be played gently", "sort", "", "kind"],
    ["Pass away before time from lack of eating", "diet", "", "lack of eating"],
    ["A right idiot undermining hospital creates worry", "harass", "", "worry"],
    ["Strip bar on Little Street", "divest", "", "Strip"],
    ["Food kept in home — atrocious!", "meat", "", "Food"],
    ["Shoot the messenger", "runner", "", "Shoot the messenger"],
    ["Graceful mountaineer’s heading off", "limber", "", "Graceful"],
    ["I may be heard to give affirmation", "avowal", "", "affirmation"],
    ["Get rid of some Hindi spelling", "dispel", "", "Get rid of"],
    ["I express hesitation following school’s stand", "podium", "", "stand"],
    ["Show Venice in a different light", "evince", "", "Show"],
    ["Mary Jane‘s jacket", "reefer", "", "Mary Jane‘s jacket"],
    ["It’s plain: Dad’s taking my half", "pampas", "", "It's plain"],
    ["Hint of tungsten in potassium?", "wink", "", "Hint"],
    ["It’s played, offering seconds of good, above-board merriment", "oboe", "", "It's played"],
    ["Quickly and in brief: leader, too heartless", "presto", "", "Quickly"],
    ["Payment we will take in silver", "wage", "", "Payment"],
    ["Run away, having got left in charge", "flee", "", "Run away"],
    ["Improve on a repair", "amend", "", "Improve"],
    ["Thanks to an American prosecutor you get the facts", "data", "", "facts"],
    ["Initially supplied second-hand, now disposed of", "sold", "", "disposed of"],
    ["Thrown, we hear, by the class system", "caste", "", "class system"],
    ["Preposition used in any amount of sentences", "unto", "", "Preposition"],
    ["Tariff one’s found in hired transport", "taxi", "", "hired transport"],
    ["Temper — losing head on a regular basis", "often", "", "Temper"],
    ["Wisdom of department opening in hospital", "depth", "", "Wisdom"],
    ["Hopeless in record time", "inept", "", "Hopeless"],
    ["One hundred arms and legs — or shins?", "climbs", "", "shins"],
    ["Mall row to escalate dramatically", "soar", "", "escalate dramatically"],
    ["Desolate, when left with bill outside", "bleak", "", "Desolate"],
    ["Accommodation found in Soho, usefully", "house", "", "Accommodation"],
    ["Print out again, in entirety, permit", "retype", "", "Print out again"],
    ["Part of dinner? Moan if there’s no second helping", "wine", "", "Part of dinner"],
    ["This works about right for “close covering”", "shirt", "", "close covering"],
    ["Avoid cold and hot?", "cheat", "", "Avoid"],
    ["Small step — and where a famous one took place?", "space", "", "where a famous one took place"],
    ["Barrel containing last of methylated spirit", "drum", "", "Barrel"],
    ["Arranged to nail English outsider", "alien", "", "outsider"],
    ["Region around the north where it all happens", "arena", "", "where it all happens"],
    ["Proportion of fixed allowance curtailed", "ratio", "", "Proportion"],
    ["Seat is prepared for a nap", "siesta", "", "nap"],
    ["City trader almost unable to do further business?", "broke", "", "unable to do further business"],
    ["Bright boy speaking up?", "sunny", "", "Bright"],
    ["The inevitable schadenfreude at house arrests", "death", "", "The inevitable"],
    ["A large amount of time in bed", "stack", "", "A large amount"],
    ["Meat full of nitrogen is easily bought", "venal", "", "easily bought"],
    ["Summit talk starts late", "peak", "", "Summit"],
    ["Entertain a girl such as Clio", "amuse", "", "Entertain"],
    ["Fragment is distributed, no need for answer", "shred", "", "Fragment"],
    ["Small lie is off", "stale", "", "off"],
    ["Agile monkey hides fruit", "lemon", "", "fruit"],
    ["Beginning to practise long throw", "pitch", "", "throw"],
    ["Start of shoreline with beach", "sand", "", "beach"],
    ["Variety of fruits, peeled", "range", "", "variety"],
    ["Yen to take home yen", "yearn", "", "yen"],
    ["Fish and chips are rather pricey, at first", "carp", "", "Fish"],
    ["Twist with band", "wring", "", "Twist"],
    ["Doctor swallowing peeled potato chips gets more thirsty", "drier", "", "more thirsty"],
    ["Spirit served by good landlord", "ghost", "", "Spirit"],
    ["Peace and quiet in a number of families", "order", "", "Peace and quiet in a number of families"],
    ["Cheese knife takes hearty slice", "feta", "", "Cheese"],
    ["Cover for the head gangster", "hood", "", "Cover for the head gangster"],
    ["Trim a tree", "spruce", "", "Trim a tree"],
    ["Wild West dish", "stew", "", "dish"],
    ["Animal is naked, we hear", "bear", "", "Animal"],
    ["Piece of gossip stated out loud for a lodger", "roomer", "", "lodger"],
    ["Bovine has eaten everything green", "callow", "", "green"],
    ["Keen—railway cars in reverse", "smart", "", "Keen"],
    ["Strike friend’s back", "slap", "", "Strike"],
    ["Guard behind the front doorway", "entry", "", "doorway"],
    ["Month derived from charm", "march", "", "Month"],
    ["Raptor upset a talking bird", "parrot", "", "a talking bird"],
    ["There could be a number", "three", "", "a number"],
    ["Planet displayed in given username", "venus", "", "Planet"],
    ["Art supply hidden by grandpa in tank", "paint", "", "Art supply"],
    ["Big fragment of spectacular gemstone", "large", "", "Big"],
    ["Fibre added to conceal food", "bread", "", "food"],
    ["Escape artist smuggles fruit", "pear", "", "fruit"],
    ["Flower concealed by panda is yellow", "daisy", "", "Flower"],
    ["A body of water battered canoe", "ocean", "", "A body of water"],
    ["Choose part of this election", "select", "", "Choose"],
    ["Melon disguised as a citrus fruit", "lemon", "", "a citrus fruit"],
    ["Seat changed direction", "east", "", "direction"],
    ["Not dressed in homespun cladding", "unclad", "", "Not dressed"],
    ["Start laying a wonderful new turf", "lawn", "", "turf"],
    ["Stern beginning gives really interesting meaning", "grim", "", "Stern"],
    ["Endlessly loathe a solemn promise", "oath", "", "a solemn promise"],
    ["Be a headless olive", "live", "", "Be"],
    ["Mount with a loud gravelly voice", "horse", "", "Mount"],
    ["Ceremonial act is utterly correct", "rite", "", "Ceremonial act"],
    ["Damon will return with the wanderer", "nomad", "", "Wanderer"],
    ["Upend rats to find a heavenly body", "star", "", "heavenly body"],
    ["Keen for a new joint", "knee", "", "joint"],
    ["Permitted to be spoken audibly", "aloud", "", "audibly"],
    ["Throw the actors", "cast", "", "actors"],
    ["Coral doesn't start by mouth", "oral", "", "by mouth"],
    ["Carries the animals", "bears", "", "Carries the animals"],
    ["Cracked almonds", "nuts", "", "Cracked almonds"],
    ["Attracted and pulled along", "drawn", "", "Attracted and pulled along"],
    ["Wicked? Reflect and live", "evil", "", "Wicked"],
    ["Loop around the pond", "pool", "", "pond"],
    ["Genuine time to regret", "true", "", "Genuine"],
    ["Quick signal", "alert", "", "Quick signal"],
    ["Repair broken sword", "rapier", "", "sword"],
    ["Not all presidents live", "reside", "", "live"],
    ["Relaxed part of overseas education", "eased", "", "Relaxed"],
    ["Time for a fullstop", "period", "", "Time for a fullstop"],
    ["Let in to confess", "admit", "", "Let in to confess"],
    ["A psychiatrist has to become smaller", "shrink", "", "A psychiatrist has to become smaller"],
    ["Get cast adrift in boat", "obtain", "", "Get"],
    ["Times when things appear obscure?", "night", "", "time"],
    ["Some teachers get hurt", "ache", "", "get hurt"],
    ["Metal concealed by environmentalist", "iron", "", "Metal"],
    ["Hide in Arthur's kingdom", "skin", "", "Hide"],
    ["Who means to reveal where the heart is?", "home", "", "where the heart is"],
    ["Pole coming from Pakistan or Thailand", "north", "", "Pole"],
    ["Narrow channel - not winding, we hear", "strait", "", "Narrow channel"],
    ["I'd heard and observed", "eyed", "", "observed"],
    ["Bambi, for example, overturned a plant", "deer", "", "Bambi, for example"],
    ["Containers for drinks taken back to bar", "stop", "", "bar"],
    ["Bird allowed outside tavern", "linnet", "", "Bird"],
    ["The first man seen by a duke in the morning", "adam", "", "The first man"],
    ["Graduate going to New York a lot", "many", "", "a lot"],
    ["Insurance for a hundred and more", "cover", "", "Insurance"],
    ["Spring blossom opened, lit up", "tulip", "", "Spring blossom"],
    ["Date unfastened corset", "escort", "", "Date"],
    ["Broken trees? Start from scratch", "reset", "", "Start from scratch"],
    ["Super weird handbag", "purse", "", "handbag"],
    ["I love twisted Mediterranean fruit", "olive", "", "Mediterranean fruit"],
    ["They’re not strong in swim psychology", "wimps", "", "They're not strong"],
    ["Powdery inside is now yours", "snowy", "", "Powdery"],
    ["Consumed inside of meat enchilada", "eaten", "", "Consumed"],
    ["Tangled thing may be silent", "night", "", "may be silent"],
    ["Part of proposal saved Cuban-American dance", "salsa", "", "Cuban-American dance"],
    ["Leaders of the International Theatre Institute are naturally auburn", "titian", "", "auburn"],
    ["Remote tumbling space rock", "meteor", "", "space rock"],
    ["Marble rocks drift", "ramble", "", "drift"],
    ["Roman organization’s living space", "manor", "", "living space"],
    ["Tossed a piece of cosmic asteroid", "cast", "", "Tossed"],
    ["It may be shaggy dog or cat following vehicle", "carpet", "", "It may be shaggy"],
    ["Pull protection over", "draw", "", "Pull"],
    ["Mention unsavory chicken", "fowl", "", "chicken"],
    ["First off, mobilize supporter", "ally", "", "supporter"],
    ["Conversation about new song", "chant", "", "song"],
    ["Team starts to get riled over unruly penalties", "group", "", "Team"],
    ["Odd “cure”: it stirs conflict", "crisis", "", "conflict"],
    ["Time to run trail", "trace", "", "trail"],
    ["Guitar feature is reportedly quite inexpensive", "solo", "", "Guitar feature"],
    ["Story time followed by a drink", "tale", "", "Story"],
    ["Initially rounding up runaways at large in the country", "rural", "", "in the country"],
    ["Cold warmth? That's a fraud", "cheat", "", "That's a fraud"],
    ["Performer rode madly", "doer", "", "Performer"],
    ["Paste made from bits of mastic, isomers, serum, and olein", "miso", "", "Paste"],
    ["Cook ramen containing vegetable", "okra", "", "vegetable"],
    ["Private meal after commencement", "inner", "", "Private"],
    ["Give access to copy menu, losing margins", "open", "", "Give access"],
    ["Middle is garbage, it's said", "waist", "", "Middle"],
    ["Roadside assistance harbors notions", "ideas", "", "notions"],
    ["Send a lime, cooked", "email", "", "send"],
    ["Reality produced by fine performance", "fact", "", "Reality"],
    ["Weep over unprotected Nero’s grave", "sober", "", "grave"],
    ["Completely turn Jude’s heart, capturing writer", "upend", "", "Completely turn"],
    ["A hundred and rising – I must be hot stuff!", "chilli", "", "hot stuff"],
    ["Central part of argument always in mind", "mental", "", "in mind"],
    ["Burger topping extracted from lychee seed", "cheese", "", "Burger topping"],
    ["Sort a vet’s post", "stave", "", "post"],
    ["Porridge cereals possessing hot promises", "oaths", "", "promises"],
    ["Draw right level", "tier", "", "level"],
    ["Orient easily but with time for second half", "east", "", "orient"],
    ["Initially, zeppelins include no cast metal", "zinc", "", "metal"],
    ["Fifth hat and cloak?", "cape", "", "cloak"],
    ["Distance from mountain chain", "inch", "", "Distance"],
    ["Jack King reversing van in centre of field", "knave", "", "Jack"],
    ["Creamy mixture without a blessing", "mercy", "", "blessing"],
    ["Previously held in prison cell", "once", "", "Previously"],
    ["Pals moved mountains", "alps", "", "mountains"],
    ["Can be done without time permit", "enable", "", "permit"],
    ["Beer and lemonade from quiet Mr. Warhol", "shandy", "", "Beer and lemonade"],
    ["She takes half of them if absorbing energy", "thief", "", "She takes"],
    ["Hold an unfinished job", "anchor", "", "Hold"],
    ["Shouted from the ends of every avenue: special emotional care required", "yelled", "", "Shouted"],
    ["Wanting orderliness forged in duty", "untidy", "", "Wanting orderliness"],
    ["Broadcast lecture featuring Prince's house", "castle", "", "Prince's house"],
    ["Messy badger on return conceals an enormous hole", "abyss", "", "enormous hole"],
    ["Boyd's second half has Firefly's regulars return", "yield", "", "return"],
    ["Part of Ottawa vying for curling", "wavy", "", "curling"],
    ["Designed to meet the needs of the last head", "fore", "", "head"],
    ["Fluttering around garage but not a moth", "eggar", "", "moth"],
    ["Fit costume", "suit", "", "Fit costume"],
    ["Personal waste left where water gathers", "pool", "", "where water gathers"],
    ["Card put in unique envelope", "queen", "", "Card"],
    ["On return, beset by flooding, I erratically prevail", "reign", "", "prevail"],
    ["10,000G made from spinning tales", "tesla", "", "10,000G"],
    ["Prone to dishonesty", "lying", "", "Prone to dishonesty"],
    ["Sue hiding Mum's clothes by river when the warm weather's here", "summer", "", "when the warm weather's here"],
    ["Cleaner sort of halo", "loofah", "", "Cleaner"],
    ["Look, I will pull out - it will not fly", "kiwi", "", "it will not fly"],
    ["Select bites for the listener", "choose", "", "Select"],
    ["151 supported by very loud bluff", "cliff", "", "bluff"],
    ["Amount of liquid rising from yon ol' lagoon", "gallon", "", "Amount of liquid"],
    ["Peculiar force with headless rabbit", "funny", "", "Peculiar"],
    ["Blue part of opera? Quaint", "aqua", "", "Blue"],
    ["Be topless lacking gender equality", "exist", "", "Be"],
    ["In the midsts of excessive jobshares, uniformed men often found on foot", "shoe", "", "often found on foot"],
    ["Picked up bread in store", "cache", "", "store"],
    ["Walks out over lost blankets", "quilts", "", "blankets"],
    ["One who speaks truth unwritten having 100 page finale", "oracle", "", "One who speaks truth"],
    ["Credit donkey for blundering", "crass", "", "blundering"],
    ["Entertain an inspirational person", "amuse", "", "Entertain an inspirational person"],
    ["Sheep are dutifully shorn and clipped", "pared", "", "clipped"],
    ["Smell conveyed to around 100", "scent", "", "Smell"],
    ["Endless salad containing small spicy tomato concoction", "salsa", "", "spicy tomato concoction"],
    ["Departs with a couple from third dimension", "depth", "", "dimension"],
    ["Wilts. Equestrian Society initially follows fashion?", "fades", "", "Wilts"],
    ["Get out of the way of American car", "dodge", "", "Get out of the way of American car"],
    ["Any longer stocking fibre?", "nylon", "", "fibre"],
    ["Saul's enthusiasm wains, eventually David starts to get stitched up", "sewed", "", "to get stitched up"],
    ["Pull a sicky?", "heave", "", "Pull a sicky?"],
    ["Warning: submarine captain is returning", "omen", "", "Warning"],
    ["Make your home in place where badgers live alongside the French", "settle", "", "Make your home in"],
    ["Alien with new area in volcano", "etna", "", "volcano"],
    ["Took advantage and joined without force", "used", "", "Took advantage"],
    ["Wood rejects outsiders and rocks", "ores", "", "rocks"],
    ["Came together on the subject of small rhythmic structures", "metres", "", "rhythmic structures"],
    ["At the end of lane to say, Ammerdown for example?", "estate", "", "Ammerdown for example?"],
    ["China is here because I initially asked", "asia", "", "China is here"],
    ["Left to stop grant", "lend", "", "grant"],
    ["Cooler name for vinegar perhaps?", "acid", "", "vinegar perhaps?"],
    ["Overall cost of loan with zero taxation at the end", "apron", "", "Overall"],
    ["Kangaroo fur covers upper part of house", "roof", "", "part of house"],
    ["Friend tucking in to ham I got", "amigo", "", "Friend"],
    ["Have to add back time", "must", "", "Have to"],
    ["Gunge lays evenly and becomes unpleasant", "ugly", "", "unpleasant"],
    ["Magical land returns to Northeast area", "zone", "", "area"],
    ["Subject to being found in launderette", "under", "", "Subject to"],
    ["Take care, lower the top, and get measure of an area", "acre", "", "measure of an area"],
    ["Energy store of plant is large fiery globe next to church", "starch", "", "Energy store of plant"],
    ["Disappear a bit like a delivery vehicle?", "vanish", "", "Disappear"],
    ["Son, I once took hold of this vegetable", "onion", "", "vegetable"],
    ["More taken in by index tracker", "extra", "", "More"],
    ["Secretary employs delays", "pauses", "", "delays"],
    ["Thin part of shelf included", "elfin", "", "Thin"],
    ["Surprise? Downstream a zebra drank this?", "amaze", "", "Surprise"],
    ["Spike messed up weeks before middle of April", "skewer", "", "Spike"],
    ["Separated from pack in second place with average time", "apart", "", "Separated"],
    ["Duck found in Avon with no tail and needing identification", "avoid", "", "Duck"],
    ["Suspend from arch angrily", "hang", "", "Suspend"],
    ["Analyze, ensuring this covers up one with cold symptoms?", "sneezy", "", "one with cold symptoms?"],
    ["Talent left to become part of carnival", "flair", "", "Talent"],
    ["Preserves blockages", "jams", "", "Preserves blockages"],
    ["Plant cups had stalk", "shadow", "", "stalk"],
    ["Baste cooked swine", "beast", "", "swine"],
    ["Wood is actually no better stripped in retrospect", "ebony", "", "Wood"],
    ["Composition of pharmaceuticals unnecessarily upset psychiatrists and neuropsychiatry centres", "essay", "", "Composition"],
    ["Father climbs to previous height", "apex", "", "height"],
    ["Container of brown potassium", "tank", "", "Container"],
    ["Small laugh at agricultural workers attire", "smock", "", "agricultural workers attire"],
    ["Near Circle Line, avoid having no ID on return", "oval", "", "Near circle"],
    ["A pet's chewed up stick", "paste", "", "stick"],
    ["Snail cycling over the end of your toes?", "nails", "", "over the end of your toes?"],
    ["Rigid part of ship", "stern", "", "Rigid part of ship"],
    ["Father, the almighty one, is a tower", "pagoda", "", "a tower"],
    ["Create a new law as vessel returns abducted by alien", "enact", "", "Create a new law"],
    ["Sticks ones nose in, in the ear to win this?", "prize", "", "to win this?"],
    ["Loud dog is fat", "flab", "", "fat"],
    ["Fit wire without cutting initially", "able", "", "Fit"],
    ["O disheartened! They pulled the plough", "oxen", "", "The pulled the plough"],
    ["Sound of CD is corrupt", "seedy", "", "corrupt"],
    ["Gaza leaders holding this flower", "azalea", "", "flower"],
    ["Black note at the end missing from how music should be played", "inky", "", "Black"],
    ["Pace of Mike and Papa restrained by broken toe", "tempo", "", "Pace"],
    ["Drove around with nothing to take too far", "overdo", "", "take too far"],
    ["Large container of soil with last of potato heading to the Far East", "silo", "", "Large container"],
    ["Boy's terrarium contains shellfish", "oyster", "", "shellfish"],
    ["Bumblebee - so very chubby", "obese", "", "very chubby"],
    ["Less than twice in the past", "once", "", "Less than twice in the past"],
    ["Use only characters disguised in that hot tattoo to make this promise", "oath", "", "promise"],
    ["Time sat on Brazilian city's three things", "trio", "", "three things"],
    ["Supporting male body", "form", "", "body"],
    ["Subtle changes are the most depressing", "bluest", "", "the most depressing"],
    ["A profit? Another time!", "again", "", "A profit? Another time!"],
    ["I clear off for a cake", "eclair", "", "cake"],
    ["Resident in Essex traveling more", "extra", "", "more"],
    ["Everyone that is joining duke is in league", "allied", "", "in league"],
    ["Loaf around in living room", "lounge", "", "Loaf around in living room"],
    ["Some bedlinen he's put outside", "sheet", "", "Some bedlinen"],
    ["Im getting wine to bring in", "import", "", "to bring in"],
    ["Constant amount for aviator", "pilot", "", "aviator"],
    ["Plenty of cargoes", "loads", "", "Plenty of cargoes"],
    ["Father interrupting road dispute", "spat", "", "dispute"],
    ["Performer with last gig replacing first Covid risk", "danger", "", "risk"],
    ["Twitch streamer begins recycling spam", "spasm", "", "Twitch"],
    ["Rope girl starts over", "lasso", "", "Rope"],
    ["Glen, a crazy person with wings?", "angel", "", "person with wings"],
    ["Principles lacking large thoughts", "ideas", "", "thoughts"],
    ["Begins black bird's basin", "bowl", "", "basin"],
    ["In-vitro olfactory turnover level", "floor", "", "level"],
    ["Leave former partner with sex appeal", "exit", "", "leave"],
    ["Yes, as structured homework assignment", "essay", "", "homework assignment"],
    ["Hold power amidst pure ignorance", "reign", "", "Hold power"],
    ["Not nice to look at guts of huge headless insect", "ugly", "", "Not nice to look at"],
    ["Diaristic epistles are read from the start", "dear", "", "start"],
    ["Tacky and thoughtless wearing trophy skins", "trashy", "", "Tacky"],
    ["Unpleasant first niff - a pig's house", "nasty", "", "Unpleasant"],
    ["Express relief with true vision", "sight", "", "vision"],
    ["Economic cut of staff is calculated", "fiscal", "", "Economic"],
    ["Take advantage of having had enough but not completely with a purpose", "useful", "", "purpose"],
    ["I shot flying crane", "hoist", "", "crane"],
    ["Pulled out fatigued", "drawn", "", "Pulled out fatigued"],
    ["People start to understand choices", "menu", "", "choices"],
    ["Draws processed meat back", "maps", "", "Draws"],
    ["Lots of minutes told of you and I", "ours", "", "you and I"],
    ["Inch slowly then regularly land in the sea", "isle", "", "land in the sea"],
    ["Cinderella RIP - she covered up wound line", "spiral", "", "wound line"],
    ["River dweller having time to spare taking in hotel with a difference", "other", "", "difference"],
    ["Attend to rhythm", "beat", "", "Attend to rhythm"],
    ["Cut or small bite", "snip", "", "Cut"],
    ["Tries bizarre ceremonies", "rites", "", "ceremonies"],
    ["Builds a home in Northeast street with first sweetheart", "nests", "", "Builds a home"],
    ["Quiet in front of leg", "shin", "", "front of leg"],
    ["Campfire snacks of small, medium or enormous crusts", "smores", "", "Campire snacks"],
    ["I, with brimless hat, will make food", "meat", "", "food"],
    ["Chance to get a bargain or depart, so we're told", "sale", "", "Chance to get a bargain"],
    ["Retrievers for practical studies?", "labs", "", "Retrievers for practical studies?"],
    ["Cage beneath ring is unlocked", "open", "", "unlocked"],
    ["Arrange trip North and publish", "print", "", "publish"],
    ["Actively aide thought", "idea", "", "thoughts"],
    ["Something happens within, but never in retrospect", "event", "", "Something happens"],
    ["Crude man dons disguise for popularity", "demand", "", "popularity"],
    ["Sneaking through ogre encampment at low level", "green", "", "low level"],
    ["Continued to not fully realize in confusion", "serial", "", "in confusion"],
    ["Zip, zilch, zero speed", "oomph", "", "Zip"],
    ["Comedy on the stage is distant cousin's first wife's finale", "farce", "", "Comedy on the stage"],
    ["Smells beginning to resemble squeaks", "reeks", "", "Smells"],
    ["Slice of Edam at cheese contest", "match", "", "contest"],
    ["One who dislikes that woman taking present", "hater", "", "One who dislikes"],
    ["Leader of Mozambique questions face coverings", "masks", "", "face coverings"],
    ["Meeting room has area for particular method of meat preparation", "halal", "", "particular method of meat preparation"],
    ["Pingu, look on at every other structure of ice", "igloo", "", "structure of ice"],
    ["Took a chance to choose almost in reverse", "diced", "", "Took a chance"],
    ["For each boy, at each drum, finally we get the beat", "rhythm", "", "we get the beat"],
    ["Might fall in 9's at the moment", "snow", "", "Might fall"],
    ["Part of car - spelling out he keeps it running smoothly", "oiler", "", "he keeps it running smoothly"],
    ["Warm beer?", "mild", "", "Warm beer?"],
    ["Thanksgiving's first beneficiary's associated with them", "their", "", "associated with them"],
    ["Spoken or exchanged tales centrally", "oral", "", "Spoken"],
    ["Excitable, blowing top is dangerous", "risky", "", "dangerous"],
    ["Heartless, damaged and frightened", "scared", "", "frightened"],
    ["Caught before tragic King Midas' finale becomes transparent", "clears", "", "transparent"],
    ["Darkness of Greek underground cycling", "shade", "", "Darkness"],
    ["Passed away and hidden by homicide advocate?!", "dead", "", "Passed away"],
    ["Part of dead rabbit is flat", "drab", "", "flat"],
    ["Taken around Devizes, five missing", "seized", "", "Taken"],
    ["When topless shout for suntan lotion", "cream", "", "suntan lotion"],
    ["Reversal of higher group", "upset", "", "Reversal"],
    ["Legend is great with the French", "fable", "", "Legend"],
    ["Drug cover is pleasant relative", "niece", "", "relative"],
    ["Ice cold - Beginning to freeze stiff?", "frigid", "", "Ice cold"],
    ["Tough street, sinful it’s said", "strong", "", "Tough"],
    ["Cloth that’s uniformly used", "khaki", "", "Cloth that’s uniformly used"],
    ["Zoo animals? Some escape sometimes", "apes", "", "Zoo animals?"],
    ["Shout when ex leaves demand for money?", "claim", "", "demand for money"],
    ["Goes on and on — awards not good", "rants", "", "Goes on and on"],
    ["Doing nothing, submerged in finer thoughts", "inert", "", "Doing nothing"],
    ["Prompts lines from what we hear", "cues", "", "Prompts"],
    ["Get rid of baggy garment", "sack", "", "Get rid of baggy garment"],
    ["Pillage with gun", "rifle", "", "Pillage with gun"],
    ["Enchantment for a period of time?", "spell", "", "Enchantment for a period of time?"],
    ["Set of values a little bit regressive", "data", "", "Set of values"],
    ["Decrepit odd couples going down a long way", "deep", "", "going down a long way"],
    ["Objective, less tense, dealing with nerves", "neural", "", "dealing with nerves"],
    ["Hefty shove dispatching bishop below cathedral’s east facade", "large", "", "Hefty"],
    ["Shocker – educator covering every individual with arsenic", "taser", "", "Shocker"],
    ["Lit up fixed bulb", "tulip", "", "bulb"],
    ["A belt strangely put on ice", "table", "", "put on ice"],
    ["Start 'Lost' binge", "begin", "", "Start"],
    ["Greet flying bird", "egret", "", "bird"],
    ["Spill large beer", "lager", "", "beer"],
    ["Change tip on order at a wine bar", "pinot", "", "order at a wine bar"],
    ["Hit by small vehicle", "struck", "", "Hit"],
    ["The beginnings of her and I's kinship? Uh, a poem!", "haiku", "", "a poem"],
    ["Lager from the East is magnificent", "regal", "", "magnificent"],
    ["Cake covering has mixed gin, I see", "icing", "", "Cake covering"],
    ["Grandma pursuing college degree in fruit", "banana", "", "fruit"],
    ["Cut back on fruit", "prune", "", "Cut back on fruit"],
    ["Cats maybe level up", "pets", "", "Cats"],
    ["Artful traitor conceals radical", "ultra", "", "radical"],
    ["Injured elbow and intestine", "bowel", "", "intestine"],
    ["Starts to allocate sulking kids summer chores", "tasks", "", "chores"],
    ["Fat pupil fed seconds of fruit", "apple", "", "fruit"],
    ["Become tense hearing mythical giant", "titan", "", "mythical giant"],
    ["Charge straight into rival football finalists", "toll", "", "Charge"],
    ["Encourage top team after jeers", "boost", "", "Encourage"],
    ["Expect Taiwan to ban nitrogen bomb", "await", "", "Expect"],
    ["Droopy airship heads off", "limp", "", "Droopy"],
    ["Shout for colour reduction", "yell", "", "Shout"],
    ["Coach holds on for more money", "bonus", "", "more money"],
    ["I have outgrown erotic skirts", "owner", "", "I have"],
    ["Journalist tailed a vehicle and got injured", "abused", "", "injured"],
    ["Whilst on board, ask for assistance to find showers", "sprays", "", "showers"],
    ["No litter", "refuse", "", "No litter"],
    ["Contaminate seabed by mistake", "debase", "", "Contaminate"],
    ["Thoughtless heartless embrace", "caress", "", "embrace"],
    ["Allow bum in American hospital department", "assent", "", "Allow"],
    ["Notice saying ‘Playground equipment‘", "seesaw", "", "Playground equipment"],
    ["Observe nothing in being old and infirm", "senile", "", "old and infirm"],
    ["Didn’t deny it’s a selfish characteristic", "agreed", "", "Didn't deny"],
    ["Take exception to being ordered to leave again", "resent", "", "Take exception"],
    ["In disorder, arm staff that will press home a charge", "ramrod", "", "press home a charge"],
    ["Give a telling-off to cook", "roast", "", "Give a telling-off to cook"],
    ["Trunk roots disturbed", "torso", "", "Trunk"],
    ["Foremost of players to speak in golf club", "putter", "", "golf club"],
    ["Untidy, dancing in state of undress", "nudity", "", "state of undress"],
    ["Carrot bachelor covered with cheese", "bribe", "", "Carrot"],
    ["Bet salary on first of runners", "wager", "", "Bet"],
    ["Soft and sexy old image", "photo", "", "image"],
    ["Woman drinking last of lager, overweight", "lardy", "", "overweight"],
    ["Fine spring", "well", "", "Fine spring"],
    ["Audible testosterone-fuelled letters", "mail", "", "letters"],
    ["Beastly sound, no sound?", "neigh", "", "Beastly sound"],
    ["Watch to send, wound up", "timer", "", "Watch"],
    ["Occasionally golden arms shine", "gleam", "", "shine"],
    ["Beheld: Seven minus five!", "seen", "", "Beheld"],
    ["Toys you only yank on suddenly at first", "yoyos", "", "toys"],
    ["The king lives in a peculiar way", "elvis", "", "The king"],
    ["tables broken, missing middle of leg in explosion", "blast", "", "explosion"],
    ["Tech leader to request introduction to Steve Jobs", "tasks", "", "jobs"],
    ["Team lead opposes losing pair", "twin", "", "pair"],
    ["Dummy drug", "dope", "", "Dummy drug"],
    ["Distress increases, then energy taxes cut by 80 per cent", "upset", "", "Distress"],
    ["Gut feeling about a cut of meat", "haunch", "", "cut of meat"],
    ["Beat most of the nick", "throb", "", "Beat"],
    ["No head for accounts problems", "ills", "", "problems"],
    ["Lightning flash?", "streak", "", "Lightning flash?"],
    ["Lacking muscle nearer biceps, all stripped", "scarce", "", "Lacking"],
    ["Allure of speed, quicker on and off", "seduce", "", "Allure"],
    ["Bake crumble containing cored apples", "roast", "", "Bake"],
    ["It keeps time for organ?", "ticker", "", "It keeps time for organ?"],
    ["Standard selection of women or men", "norm", "", "Standard"],
    ["Person showing partiality, we hear, for this drink", "cider", "", "drink"],
    ["Preserved food in difficult situation", "pickle", "", "Preserved food in difficult situation"],
    ["Award Duke received in middle of banquet", "medal", "", "Award"],
    ["Steers vote among one’s constituents", "oxen", "", "Steers"],
    ["Heard greeting moment of success", "high", "", "moment of success"],
    ["Amphitheater gripped by warfare, naturally", "arena", "", "Amphitheater"],
    ["Oust terrible aunts, embracing Bertie finally", "unseat", "", "Oust"],
    ["Employs and reportedly gives raises", "hires", "", "Employs"],
    ["Digit‘s hit with end turning black", "thumb", "", "Digit"],
    ["Surrounded in a feeble uprising", "amid", "", "Surrounded"],
    ["Probing hospital, MO started pretty well", "almost", "", "pretty well"],
    ["Girl, one in spectacles putting off outsiders", "lassie", "", "Girl"],
    ["Cold rebel touchy and irritable", "chippy", "", "touchy and irritable"],
    ["Seem to be a listener keeping very quiet", "appear", "", "Seems to be"],
    ["Spell out letters at end of crossword clue, all right?", "define", "", "Spell out"],
    ["Foolish characters adversely involved in shenanigans", "inane", "", "Foolish"],
    ["Correct sort of wordplay?", "punish", "", "Correct"],
    ["Replace button", "switch", "", "Replace button"],
    ["Physical young man carries large papers around", "bodily", "", "Physical"],
    ["Quoting auditor’s view at a given time", "citing", "", "Quoting"],
    ["Unsteady characters regularly took drugs", "used", "", "took drugs"],
    ["Cowardly snake in the end stabs lowly criminal", "yellow", "", "Cowardly"],
    ["Self-immolation comes from dissatisfaction", "sati", "", "Self-immolation"],
    ["Deuce shuffled with remainder and cut", "reduce", "", "cut"],
    ["Abandon Burgundy and Tuscan red", "maroon", "", "Abandon Burgundy and Tuscan red"],
    ["Close inside airless hutch", "shut", "", "close"],
    ["Pull to remove water", "strain", "", "Pull to remove water"],
    ["Coach or coaches?", "train", "", "Coach or coaches?"],
    ["Charm involves sex appeal and drink", "mojito", "", "drink"],
    ["Rust halved shower pressure", "strain", "", "pressure"],
    ["Broke flow in speech", "poor", "", "Broke"],
    ["Went climbing far down", "deep", "", "far down"],
    ["Strong flavor repels insect", "gnat", "", "insect"],
    ["Idiot’s about to get sack", "loot", "", "sack"],
    ["Fleet with some Israeli gadgetry traveling west", "agile", "", "Fleet"],
    ["Fabulous seasonal workers quietly unloading from storage boards", "elves", "", "Fabulous seasonal workers"],
    ["Neat but hollow attempt to conceal personality", "tidy", "", "Neat"],
    ["Jumper starts to feel less elastic again", "flea", "", "Jumpers"],
    ["Heroin consumed by green parrot", "echo", "", "parrot"],
    ["Returning craft carrying top quality half crown", "tiara", "", "half crown"],
    ["I made a mistake coming up with female parody", "spoof", "", "parody"],
    ["Weirdo ingesting titanium as cosmetic application", "lotion", "", "cosmetic application"],
    ["One can count on this unending support in an unfortunate situation, primarily", "abacus", "", "One can count on this"],
    ["Teetotal grabs a stinger – one always ends up crying", "sobber", "", "one always ends up crying"],
    ["Youngster says you’re primarily short", "teensy", "", "short"],
    ["Party cheese sliced at the end – drug added", "fete", "", "Party"],
    ["United Nations directed without direction", "unled", "", "without direction"],
    ["Lord Lieutenant straddling some mother’s fluffy pack animal", "llama", "", "fluffy pack animal"],
    ["Pizzazz ultimately created in essence", "zest", "", "essence"],
    ["Help mastermind partial withdrawal in trial", "sample", "", "trial"],
    ["Question for audience to get into", "where", "", "Question"],
    ["Combine ingredients of caramel dessert", "meld", "", "Combine"],
    ["Unsighted, tie around left!", "blind", "", "Unsighted"],
    ["Evil disrupted part of bridal outfit", "veil", "", "part of bridal outfit"],
    ["Higher revolt partially overturned", "over", "", "Higher"],
    ["8 o’clock to start with short tea time", "octet", "", "8"],
    ["Happen to be seen meandering round the bend", "ensue", "", "Happen"],
    ["Stifle a story describing pet peeves?", "fleas", "", "pet peeves?"],
    ["Huge jpg?", "epic", "", "Huge"],
    ["Might have succeeded in being honest", "candid", "", "being honest"],
    ["This culture evens out", "clue", "", "This"],
    ["Fisher finally back in boat", "raft", "", "boat"],
    ["Too awkward letting some orate at first", "also", "", "Too"],
    ["Oracle reported net income", "profit", "", "Oracle"],
    ["Recoiling inside, regrets a casual fling", "cast", "", "fling"],
    ["It can punctuate deep sleep, male admitted", "comma", "", "It can punctuate"],
    ["It hurts after guys endlessly cat call", "meow", "", "cat call"],
    ["Headline story: appeal for answer", "title", "", "Headline"],
    ["Fear doctor and drug commercial", "dread", "", "fear"],
    ["Suspect lacking in resemblance", "image", "", "resemblance"],
    ["Daughter banned from cutting bit of cake", "icing", "", "bit of cake"],
    ["It’s for measuring people’s head", "ruler", "", "It’s for measuring people’s head"],
    ["Push bike, by the sound of it", "peddle", "", "Push"],
    ["Subject of photo too short on top", "topic", "", "Subject"],
    ["Count on space explorer to swamp Twitter now with muscle", "expect", "", "Count on"],
    ["Trophy wife inspired by self-help group heads for remunerative divorce", "award", "", "Trophy"],
    ["Last stop on half-done tour ending in failure", "endure", "", "Last"],
    ["Touched cloth", "felt", "", "Touched cloth"],
    ["Former leaders of opposition now claim expenses", "once", "", "Former"],
    ["Television Academy leaders bore senior celebrity", "star", "", "celebrity"],
    ["Greencore veggie sandwiches on the counter, always", "ever", "", "always"],
    ["Comfort obtained from drugs delivered via mouth", "ease", "", "Comfort"],
    ["Put down made me annoyed, just a bit!", "demean", "", "Put down"],
    ["Exhausts foolish people?", "saps", "", "Exhausts foolish people?"],
    ["Newts swimming across river are scattered loosely", "strewn", "", "scattered loosely"],
    ["Deduce if no first-hand evidence recorded initially", "infer", "", "Deduce"],
    ["Butt in more artfully", "rear", "", "Butt"],
    ["Hang out beef and bacon, I say!", "meet", "", "Hang out"],
    ["Help, or he gets final warning", "rescue", "", "Help"],
    ["Leads regressively decay in ACs", "actors", "", "leads"],
    ["Writing oddly eases dad. Why, I ask you!", "essay", "", "Writing"],
    ["Sat up to every beginner, showing appreciation", "taste", "", "appreciation"],
    ["Not what it used to be, pig’s house buried by start of record unemployment", "rusty", "", "Not what it used to be"],
    ["Sweet older woman replaces company with sons", "sugar", "", "Sweet"],
    ["Southerner urinated with momentum", "speed", "", "momentum"],
    ["Funny Maine cartoon", "anime", "", "cartoon"],
    ["Vehicles that don’t start working – bad ignition?", "arson", "", "bad ignition?"],
    ["Cheap excursion holds high point", "apex", "", "high point"],
    ["Lots of lions terrified spider", "prides", "", "Lots of lions"],
    ["Argue Usher’s ahead of Prince? Quite the opposite!", "plead", "", "Argue"],
    ["Briefly vague about a fruit", "guava", "", "fruit"],
    ["Genuine about short metal", "real", "", "Genuine"],
    ["Strip of wood in rescue around time", "stave", "", "Strip of wood"],
    ["Monster having many heads from Hardy novel", "hydra", "", "Monster having many heads from Hardy novel"],
    ["Any use getting worried or agitated?", "uneasy", "", "agitated"],
    ["American gluttony’s accepted", "agreed", "", "accepted"],
    ["Battle axe?", "scrap", "", "Battle axe?"],
    ["A vicar, ill-disposed to delicacy", "caviar", "", "delicacy"],
    ["Return weapon and receive bit of gold", "nugget", "", "bit of gold"],
    ["Festival started late after second sleep", "siesta", "", "sleep"],
    ["Regularly taken chair lift to seize", "hijack", "", "seize"],
    ["Help a follower in Greece cycling", "abet", "", "Help"],
    ["Get away! Hide energy’s high-pitched sound", "scream", "", "high-pitched sound"],
    ["Perhaps security provided by a second set", "asset", "", "Perhaps security"],
    ["Screen state of matter", "plasma", "", "Screen state of matter"],
    ["Suggest University of Cambridge led by Roll", "submit", "", "Suggest"],
    ["Finally ask, can we smoke joint?", "knee", "", "joint"],
    ["Prepare cold oat dish from Mexico", "taco", "", "dish from Mexico"],
    ["Flash cropped jacket", "blaze", "", "Flash"],
    ["Sailing adrift burning one flare?", "signal", "", "flare"],
    ["Place in water and dissolve evenly", "isle", "", "Place in water"],
    ["Don’t start trouble, finding an alternative", "other", "", "an alternative"],
    ["I take temperature – hot, that is fine", "thief", "", "I take"],
    ["Bungling in record time?", "inept", "", "Bungling"],
    ["Urban Anaconda swallows jungle fruit?", "banana", "", "jungle fruit"],
    ["At first, open door directly into the yard. Strange thing!", "oddity", "", "Strange thing!"],
    ["Not exciting thanks to yours truly", "tame", "", "Not exciting"],
    ["You heard black is functional?", "usable", "", "functional"],
    ["Increasingly, just more beautiful", "fairer", "", "Increasingly, just more beautiful"],
    ["Advocate power and influence", "preach", "", "Advocate"],
    ["Jam ingredients", "stuff", "", "Jam ingredients"],
    ["Beat it, poet! Be quiet", "tiptoe", "", "Be quiet"],
    ["Remove clothes for party – quite revealing", "skimpy", "", "quite revealing"],
    ["Cram in orifice containing type of acid", "amino", "", "type of acid"],
    ["Criticize after both sides of debate go off track", "derail", "", "go off track"],
    ["Loose ends in Elf rather irritate audience", "free", "", "Loose"],
    ["Rotten blamed for Anarchy", "bedlam", "", "Anarchy"],
    ["Enter a seraglio holding rubber", "eraser", "", "rubber"],
    ["Not angry, not tense, but I must be moving on", "nomad", "", "I must be moving on"],
    ["Casino’s gambling area including that French card game?", "piquet", "", "card game"],
    ["Djado, as I see, features fertile spot", "oasis", "", "fertile spot"],
    ["A small department that’s dazzlingly skilled", "adept", "", "dazzlingly skilled"],
    ["Every now and then, upset head teachers split", "secede", "", "split"],
    ["Withdrawing component of charger: EV operation’s terminated", "over", "", "terminated"],
    ["Exploited in vacuous editorial", "used", "", "Exploited"],
    ["Religious figure‘s circle revolts", "cleric", "", "circle"],
    ["Head over heels friends high-five?", "slap", "", "high-five?"],
    ["At the end of all tests, student made top grade", "step", "", "grade"],
    ["Energy will come from wind, chiefly offshore", "gusto", "", "Energy"],
    ["Timeless artist echos results", "arises", "", "results"],
    ["Moniker concealed in a pen, a message", "name", "", "Moniker"],
    ["Treated herpes round ball", "sphere", "", "round ball"],
    ["Least eccentric inventor", "tesla", "", "inventory"],
    ["Obscure club’s lightweight openers pair up", "cloud", "", "Obscure"],
    ["Either way, zany show has no lead characters", "anyhow", "", "Either way"],
    ["Light cavalry on manoeuvres in Crimea initially", "comic", "", "Light"],
    ["Odd it isn’t stable", "even", "", "Odd it isn’t stable"],
    ["Walked and a doctor went first", "ambled", "", "Walked"],
    ["Little thanks after ten", "iota", "", "Little"],
    ["Desire to be stretched", "long", "", "Desire to be stretched"],
    ["Beach sounds okay", "shore", "", "Beach"],
    ["Outdo spreadsheet program?", "excel", "", "Outdo spreadsheet program?"],
    ["If best man regularly brought cheese", "feta", "", "cheese"],
    ["Opens the eyes and becomes active again", "awakes", "", "Opens the eyes and becomes active again"],
    ["Uneven progress, reportedly", "coarse", "", "Uneven"],
    ["Ratify Democratic reform", "amend", "", "reform"],
    ["Reserve bishop, advance two knights", "bank", "", "Reserve"],
    ["Book of maps for a returned seasoning", "atlas", "", "Book of maps"],
    ["Choice of an oddly light brown colour", "cocoa", "", "light brown color"],
    ["Interior decoration sample from nude corpse", "decore", "", "Interior decoration"],
    ["Extremes immersed extra finding purpose", "idea", "", "purpose"],
    ["Extremely bad boy upset confining ideology", "dismal", "", "Extremely bad"],
    ["Dirty text lacks maturity", "mess", "", "Dirty"],
    ["Energy-less morning brew at home – it might be needed when you’re late!", "coffin", "", "it might be needed when you’re late!"],
    ["Evaluate a couple of ships rounding point", "assess", "", "Evaluate"],
    ["Number needing a drink, not small", "thirty", "", "Number"],
    ["A-lister, beginning but not ending", "star", "", "A-lister"],
    ["Relative is vague missing last two characters", "uncle", "", "relative"],
    ["Facial guard - it is taken from guest", "visor", "", "Facial guard"],
    ["Feel bad as expert swallowing bench's conclusion", "ache", "", "Feel bad"],
    ["Stick commercial in this place", "adhere", "", "Stick"],
    ["Wanderer is certainly not crazy", "nomad", "", "Wanderer"],
    ["Remove dirt from lance frantically", "clean", "", "Remove dirt"],
    ["Somewhat fun if you join together", "unify", "", "join together"],
    ["Hurting from lasso restraint", "sore", "", "Hurting"],
    ["Strongbox found in Odessa ferry", "safe", "", "Strongbox"],
    ["Item of furniture hidden in stables", "table", "", "Item of furniture"],
    ["Gem found in chest on Exmoor", "stone", "", "Gem"],
    ["Wake up in trousers", "rouse", "", "Wake up"],
    ["Some sacred area of land", "acre", "", "area of land"],
    ["Gain control of unruly stream", "master", "", "Gain control"],
    ["Strange devil existed", "lived", "", "existed"],
    ["Many lost out", "lots", "", "many"],
    ["Competitive group cooked meat", "team", "", "Competitive group"],
    ["Unusual pastel dishes", "plates", "", "dishes"],
    ["Left altered fabric", "felt", "", "fabric"],
    ["Learnt about animal horn", "antler", "", "animal horn"],
    ["Told off idiot", "dolt", "", "idiot"],
    ["Change models infrequently", "seldom", "", "models"],
    ["Relaxed among local members", "calm", "", "Relaxed"],
    ["Seasoning adjusted last", "salt", "", "Seasoning"],
    ["Giant spotted in rural Argentina", "large", "", "Giant"],
    ["Relaxed among local members", "calm", "", "Relaxed"],
    ["Croat becomes thespian", "actor", "", "thespian"],
    ["Partner reformed team", "mate", "", "Partner"],
    ["Yobs scattered lads", "boys", "", "lads"],
    ["Lords some desired", "sire", "", "Lords"],
    ["Drew a different type of bird", "wader", "", "type of bird"],
    ["Text ramblings hold more", "extra", "", "more"],
    ["Position inside Midlands pottery", "spot", "", "Position"],
    ["Ruined photo", "shot", "", "Ruined photo"],
    ["The lady’s going after American court officials", "ushers", "", "court officials"],
    ["Regularly careworn for a very long time", "aeon", "", "a very long time"],
    ["Bird to jump without looking first", "finch", "", "Bird"],
    ["Appraisal was in the morning", "exam", "", "Appraisal"],
    ["Stove tops kitchen in London, new", "kiln", "", "Stove"],
    ["Task forces in sun, it seems", "units", "", "Task forces"],
    ["Expunge every record apparently suggesting extraneity at the outset", "erase", "", "Expunge"],
    ["Frog ultimately bird turns and bites", "gnaws", "", "bites"],
    ["Additional walk-on part", "extra", "", "Additional walk-on part"],
    ["Search for some unique styles", "quest", "", "Search"],
    ["Fear inspiring a king to be vigilant", "awake", "", "vigilant"],
    ["Middle East the first topic of discourse?", "theme", "", "topic of discourse"],
    ["Alcoholic wife attends fashionable ball", "wino", "", "Alcoholic"],
    ["Location around national stadium", "arena", "", "stadium"],
    ["Part of art in books on hook?", "barb", "", "hook"],
    ["Record by American; Olympic event", "discus", "", "Olympic event"],
    ["Catch clipped wings of kite in wind", "snake", "", "wind"],
    ["American crude oil I served with French fries?", "aioli", "", "served with French fries?"],
    ["Containing ‘fat one’ wearing yellow, oddly, on its head", "oily", "", "Containing fat"],
    ["Promise nothing to husband", "oath", "", "Promise"],
    ["Ship left to sink in swell", "bloat", "", "swell"],
    ["Fish’s back. Fish back", "heel", "", "back"],
    ["Story has a ‘Gack’ involved", "saga", "", "Story"],
    ["Back-track, right away", "tail", "", "trail"],
    ["Challenge a partner’s opinion", "view", "", "opinion"],
    ["What apology?", "sorry", "", "What apology?"],
    ["Pinch metal, I hear", "steal", "", "Pinch"],
    ["Puts in order after signal went wrong", "aligns", "", "Puts in order"],
    ["The changing tastes of America?", "states", "", "America?"],
    ["Nudity can be messy", "untidy", "", "messy"],
    ["Film has no ending? Get out of here!", "shoo", "", "Get out of here!"],
    ["Evidence for first appearance of oxygen gathered by academic", "proof", "", "Evidence for"],
    ["All-time worst section helps make flipping grid a nightmare!", "nadir", "", "All-time worst"],
    ["To live in metroplex is taxing", "exist", "", "To live"],
    ["Measure impedance of mineral", "quartz", "", "mineral"],
    ["10-0 in second half for Athletic? Quite unusual", "exotic", "", "Quite unusual"],
    ["Programmer’s beginning to abandon search for bug", "insect", "", "bug"],
    ["Root for big win after starters exit", "origin", "", "Root"],
    ["One story’s contents might have ruffled feathers?", "nest", "", "might have ruffled feathers?"],
    ["All liars take three turns with a false name", "alias", "", "false name"],
    ["Ceases to even be a nudist", "ends", "", "Ceases"],
    ["Surround sound", "ring", "", "Surround sound"],
    ["Furious lion, caged in October, is a wild cat", "ocelot", "", "a wild cat"],
    ["Leading on stage, Chris Rock gets slapped in a film award", "oscar", "", "film award"],
    ["Write off toll-bridges – quick thanks and take the second left", "total", "", "Write off"],
    ["Holy person is a New Testament fan", "saint", "", "Holy person"],
    ["Charges for sessions", "terms", "", "Charges for sessions"],
    ["Something fruity in spa? Pay attention!", "papaya", "", "Something fruity"],
    ["Take sailor on the Channel", "abduct", "", "Take"],
    ["Dry one intoxicated over there", "yonder", "", "over there"],
    ["Useless drug for cool guy", "dude", "", "cool guy"],
    ["Pocketed scarf", "stole", "", "Pocketed scarf"],
    ["Surrender pay", "yield", "", "Surrender pay"],
    ["Several dance topless just the same", "anyway", "", "just the same"],
    ["Rage, ridiculous rage, about Nationalist leader", "anger", "", "Rage"],
    ["Outre morgue packs a thrill", "tremor", "", "thrill"],
    ["Fighting was dull before right cross exchange", "boxing", "", "Fighting"],
    ["Small shrub provides cover", "sheath", "", "cover"],
    ["Make changes to current reflection", "edit", "", "Make changes"],
    ["Dipping from South Africa originally used chillis excessively", "sauce", "", "Dipping"],
    ["Registers to half-off Lisbon tours outside", "lists", "", "Registers"],
    ["It helps you see concerning metal trade, essentially", "retina", "", "It helps you see"],
    ["Parent embraces utilization of public building", "museum", "", "public building"],
    ["Snapper in America curiously lacking one", "camera", "", "Snapper"],
    ["Made out steps to identify technique", "style", "", "technique"],
    ["Expert packs up duffel bag", "able", "", "Expert"],
    ["Outlaw group sex", "bandit", "", "Outlaw"],
    ["Times temporizes when outing source", "tempo", "", "Times"],
    ["Bound stipends from prime positions", "tied", "", "Bound"],
    ["Little bit of half the alphabet", "atom", "", "Little bit"],
    ["Streaks in central Dallas", "lines", "", "Dallas"],
    ["Looked annoyed when volume is soft", "peeped", "", "Looked"],
    ["Primarily a rich or meaty appetizing smell", "aroma", "", "smell"],
    ["Fairy Liquid – sparkling!", "sprite", "", "Fairy Liquid – sparkling!"],
    ["Opening of Genesis has noisy parrot and reptile", "gecko", "", "reptile"],
    ["Heart-breaking for the planet", "earth", "", "planet"],
    ["Betrothed, Ian’s caught in iron grip", "fiance", "", "Betrothed"],
    ["I start to tire after siesta – that’s unfortunate", "inapt", "", "unfortunate"],
    ["Panel attached to home causing damage", "injury", "", "damage"],
    ["Woman I maltreated engaging brute", "animal", "", "brute"],
    ["Refrained from claiming and made a parting gesture, it is said", "waived", "", "Refrained"],
    ["Special-interest group involving 50% from Caucasia and America", "caucus", "", "Special-interest group"],
    ["Metal unknown in Cuba", "zinc", "", "Metal"],
    ["Jaw some vital knowledge", "talk", "", "Jaw"],
    ["Believer from Downside is troubled", "deist", "", "Believer"],
    ["Looks roughly east at regular intervals", "ogles", "", "Looks"],
    ["Kindly take a bit off the rent", "lease", "", "rent"],
    ["Pencil tie", "draw", "", "Pencil tie"],
    ["Awkwardly grips branch", "sprig", "", "branch"],
    ["Ring from MustafaG? Ask ethically!", "gasket", "", "Ring"],
    ["Draw breath after a kicking", "alive", "", "kicking"],
    ["Good God! Left without direct debit for huge sum", "googol", "", "huge sum"],
    ["Troll regularly found in bog garden", "ogre", "", "Troll"],
    ["Decree held up in court can expire", "enact", "", "Decree"],
    ["Really sour first-class jerk", "acetic", "", "Really sour"],
    ["Criminal trial about drug sales", "retail", "", "sales"],
    ["A father goes with your disinterest", "apathy", "", "disinterest"],
    ["Removes fruit", "prune", "", "Removes fruit"],
    ["Listener bound by strand of yarn describes gates", "pearly", "", "describes gates"],
    ["Sure to be uplifted in lesson review", "peruse", "", "review"],
    ["Principally, unity and love behind performance is genuine", "actual", "", "genuine"],
    ["Share case to stop &lit", "split", "", "Share"],
    ["Go on – Doctor, I…", "drone", "", "Go on"],
    ["Old farts discovered going back for more", "extra", "", "more"],
    ["Old American prosecutor recalled carrying terms to wrong case", "aged", "", "Old"],
    ["Tired, making ward’s head doctor miserable", "dreary", "", "miserable"],
    ["Flash Gordon’s first to get cooked meal", "gleam", "", "Flash"],
    ["Erratic at first, airplay evens out in good time", "early", "", "in good time"],
    ["Chic Mayfair café – calm barista finishes top of espresso", "crema", "", "top of espresso"],
    ["Nurse collaring hospital menace", "threat", "", "menace"],
    ["Pluto’s ultimate element?", "oxygen", "", "element"],
    ["Skilled brewer’s head swimming in beer", "able", "", "Skilled"],
    ["Reversed change in course", "tide", "", "course"],
    ["Inject drugs in terrible passion", "desire", "", "passion"],
    ["Polish language heard in Helsinki, reportedly", "finish", "", "Polish"],
    ["Foolish tsarina neglects houses", "inane", "", "Foolish"],
    ["Hits back in fight", "spar", "", "fights"],
    ["Tesla should periodically crash", "thud", "", "crash"],
    ["Scrap plan to make digital image", "bitmap", "", "digital image"],
    ["Defaces Spanish paintings", "spoils", "", "defaces"],
    ["Decent payoff airline provides", "fair", "", "Decent"],
    ["Fly from Abuja via Tenerife", "aviate", "", "Fly"],
    ["Sweet little creature holding son", "mousse", "", "Sweet"],
    ["Bagel I tested is filled to top", "elite", "", "top"],
    ["In the end, does it make sailor run back aboard ship?", "stern", "", "back aboard ship"],
    ["Pull back, arresting large oversupply", "glut", "", "oversupply"],
    ["Bloke in charge is crazy", "manic", "", "crazy"],
    ["Scales from gecko’s belly and legs", "climbs", "", "Scales"],
    ["Maybe a conspirator showed a signal", "beacon", "", "signal"],
    ["Copper has the last word about judgement", "acumen", "", "judgement"],
    ["Expert at Dior is affected", "adroit", "", "Expert"],
    ["Encounter many equally enthusiastic trainees initially", "meet", "", "Encounter"],
    ["Additional extract from “Nero: Murderous Revolutionary”", "more", "", "Additional"],
    ["Brutal campaign ultimately wiped out plant", "violet", "", "plant"],
    ["Where Dawn can be seen in gorge topless", "east", "", "Where Dawn can be seen"],
    ["Unfortunately almost every piece of salad gets used up", "alas", "", "Unfortunately"],
    ["Essentially band’s vices debased pieces of Heavy Metal", "anvils", "", "pieces of Heavy Metal"],
    ["Nose put out of joint for ages", "eons", "", "ages"],
    ["What a shame – we listened to complete rubbish!", "awful", "", "rubbish"],
    ["Shoot kawaii fangirl ultimately interrupting band on radio", "film", "", "Shoot"],
    ["University teacher makes noodles", "udon", "", "noodles"],
    ["Agency worker against French article on Church", "temple", "", "Church"],
    ["Some façades I argue in retrospect must get built", "raised", "", "built"],
    ["Troubled senator taking 5th conceals motive", "reason", "", "motive"],
    ["Vision of attack Everton demand: it starts from the back", "idea", "", "Vision"],
    ["Large-scale electronic image", "epic", "", "Large-scale"],
    ["Eat around four or six? Either is mouth-watering", "divine", "", "mouth-watering"],
    ["Serious damage done to robes", "sober", "", "Serious"],
    ["Dirt starts floating into large tree houses", "filth", "", "Dirt"],
    ["Remove squeaks from wild oldie", "oiled", "", "Remove squeaks"],
    ["There's no way prisoners make the ground white", "snow", "", "make the ground white"],
    ["Dugong get portion of recalled holiday drink", "eggnog", "", "holiday drink"],
    ["Fragment of mustard tree-topper", "star", "", "tree-topper"],
    ["Conrad only contains an element", "radon", "", "an element"],
    ["Vacate my pet wrongly", "empty", "", "Vacate"],
    ["See, I fish for a tobacco product", "cigar", "", "a tobacco product"],
    ["A not with half-goat friend", "amigo", "", "friend"],
    ["Alcohol from crazy dame", "mead", "", "Alcohol"],
    ["Church song contributing to sin; my hope overthrown", "hymn", "", "Church song"],
    ["Tree color sample comes back as engineer grows", "green", "", "Tree color"],
    ["In the morning I depart for friend overseas", "amigo", "", "friend overseas"],
    ["Dad starts off very early to make a road", "pave", "", "to make a road"],
    ["Critique Ryan's sample question", "query", "", "question"],
    ["In the old days on the wings of Concorde", "once", "", "In the old days"],
    ["Not so common way to cook a steak", "rare", "", "Not so common way to cook a steak"],
    ["Western emissaries agree to begin with new start on foods other than milk", "wean", "", "on foods other than milk"],
    ["It is unclear what finishes all of this off, so drop extra NASDAQ bureau closure", "opaque", "", "It is unclear"],
    ["Girl with a party", "gala", "", "party"],
    ["Miss caught in bottomless lake", "lack", "", "Miss"],
    ["Latest from top, right, left and bottom of this grid", "news", "", "Latest"],
    ["Grab broadcast dates", "sees", "", "dates"],
    ["Sent abroad to make a home", "nest", "", "to make a home"],
    ["Regarding the nerves, take time out of being sat on the fence", "neural", "", "Regarding the nerves"],
    ["You bet! Here America's in our houses", "casino", "", "You bet! Here"],
    ["Vegetable or fruit drink", "squash", "", "Vegetable or fruit drink"],
    ["Relative's Australian books", "aunt", "", "Relative"],
    ["Loud sounds of riverboat's propellers?", "roar", "", "Loud sounds"],
    ["Give John Hancock less ignoble content", "sign", "", "Give John Hancock"],
    ["Cancel the end of Houston: secured by the moon making a comeback", "annul", "", "Cancel"],
    ["Resound from the chorus", "echo", "", "Resound"],
    ["Period of green terror every so often", "retro", "", "Period"],
    ["Checked direction before recording temperature", "swept", "", "Checked"],
    ["Complicated diet secured", "tied", "", "secured"],
    ["Request that I be impersonated round building?", "dome", "", "round building"],
    ["Miss the heart of shipmates standing by old vessel", "mourn", "", "Miss"],
    ["Lads having time for baby's first playthings", "toys", "", "playthings"],
    ["Rising sign from nearby flowers perhaps after second drop of rain", "ascent", "", "Rising"],
    ["Rising sign for submariner", "nemo", "", "submariner"],
    ["Sulky being left stuck in sticky stuff", "glum", "", "Sulky"],
    ["Perfect what I do when in business", "ideal", "", "Perfect"],
    ["Phone card rising, sign to get hit badly", "miscue", "", "hit badly"],
    ["Blow is demonstration of anger", "huff", "", "Blow is demonstration of anger"],
    ["Iron Man is not a man?", "female", "", "not a man?"],
    ["Was impatient for restructuring of the CID", "itched", "", "Was impatient for"],
    ["Wild cats found every so often in sexy dreams", "eyras", "", "Wild cats"],
    ["Better pick option", "choice", "", "Better pick option"],
    ["Charge time for measurement", "feet", "", "measurement"],
    ["Underwear sector in disarray", "corset", "", "Underwear"],
    ["Sickening when being decapitated is legal", "awful", "", "Sickening"],
    ["Beds for baby climbing cucumbers to cold frames", "cots", "", "Beds for baby"],
    ["American returns with Southern greeting and some food", "sushi", "", "some food"],
    ["Father sat on small son's lap?", "pass", "", "lap?"],
    ["Involved in xenophobic hate speech", "chat", "", "speech"],
    ["Herb is at last inside, bail?", "basil", "", "Herb"],
    ["Decline of fruit trading borders", "slump", "", "Decline"],
    ["Square is quiet - Arizona split - Alabama returning", "plaza", "", "Square"],
    ["Measure reflected beam dimension", "yard", "", "Measure"],
    ["One with pockets is better", "amend", "", "better"],
    ["Keen music half-heartedly backed", "eager", "", "Keen"],
    ["Challenged boxer, ultimately in late round", "dared", "", "Challenged"],
    ["Twist with band", "wring", "", "Twist"],
    ["Spirit served by good landlord", "ghost", "", "Spirit"],
    ["Garden tool left out of financial inventory", "edger", "", "Garden tool"],
    ["Agile monkey hides fruit", "lemon", "", "fruit"],
    ["Herb Alpert at last extremely happy to meet me", "thyme", "", "Herb"],
    ["Start of shoreline with beach", "sand", "", "beach"],
    ["Variety of fruit, peeled", "range", "", "Variety"],
    ["Fish and chips are rather pricey, at first", "carp", "", "Fish"],
    ["Further allusion occasionally", "also", "", "Further"],
    ["Top fears: making mistakes", "errors", "", "mistakes"],
    ["'Small lie is off'", "stale", "", "off"],
    ["Gym in actual cancellation", "repeal", "", "cancellation"],
    ["Likelihood of Desperate Dan scoffing all starters", "odds", "", "Likelihood"],
    ["Suggested sex after drunken act", "tacit", "", "Suggested"],
    ["Entitled elite’s clothes shop", "deli", "", "shop"],
    ["Cheat’s wife leaving for bishop causing big hiccup", "belch", "", "big hiccup"],
    ["Letters make these; these make letters", "words", "", "Letters make these; these make letters"],
    ["Disclose some awful lethargy is returning", "tell", "", "Disclose"],
    ["Sell one with bill up front", "hawk", "", "Sell one with bill up front"],
    ["Sort a vet's post", "stave", "", "post"],
    ["Initially, zeppelins include no cast metal", "zinc", "", "metal"],
    ["Guerrilla war expert kept in the loop", "aware", "", "in the loop"],
    ["Hurt, but eschewing hospital and ready for action", "armed", "", "ready for action"],
    ["Perhaps falcon savaged parrot", "raptor", "", "Perhaps falcon"],
    ["Halt in vacant unoccupied zone", "freeze", "", "Halt"],
    ["Suspects story concealed in Dali biography", "alibi", "", "Suspects story"],
    ["Skill returned after old boy repeated phrase", "mantra", "", "repeated phrase"],
    ["Shares gossip: is he caught between hearts of Ada and Susie?", "dishes", "", "Shares gossip"],
    ["ITunes remixed releases", "unties", "", "releases"],
    ["I heard what's underfoot, people", "souls", "", "people"],
    ["Cause haphazard dressing", "sauce", "", "dressing"],
    ["Paste made from bits of mastic, isomers, serum, and olein", "miso", "", "Paste"],
    ["Enclosure of wetland by Chile's borders", "fence", "", "Enclosure"],
    ["Cook ramen containing vegetable", "okra", "", "vegetable"],
    ["Private meal after commencement", "inner", "", "Private"],
    ["Give access to copy menu, losing margins", "open", "", "Give access to"],
    ["Middle is garbage, it's said", "waist", "", "Middle"],
    ["Roadside assistance harbors notions", "ideas", "", "notions"],
    ["Odd wired contraption", "weird", "", "Odd"],
    ["Irreproachable, I hand out cards", "ideal", "", "Irreproachable"],
    ["Trendy car smashing up slate", "tesla", "", "Trendy car"],
    ["Timeless artist echos results", "arises", "", "results"],
    ["Allow a segment of orange in gin and tonic", "grant", "", "Allow"],
    ["Something happens within, but never in retrospect", "event", "", "Something happens"],
    ["Free at heart before explosive initiator produces waste", "refuse", "", "waste"],
    ["Sharp the stone tool at last, showing skin", "peel", "", "skin"],
    ["'Pick me up' sounds like sea of salary", "coffee", "", "'Pick me up'"],
    ["I'm in a pound for a wing?", "limb", "", "wing?"],
    ["Two balls trapped in record wind", "loop", "", "wind"],
    ["Plant vehicle’s heavy at the front", "bush", "", "Plant"],
    ["Surprisingly sparse asparagus?", "spears", "", "asparagus?"],
    ["Teach urchins about sanctuary", "church", "", "sanctuary"],
    ["Stockroom e-mailed back internal note", "memo", "", "note"],
    ["Warm up‘s time spent in wrong theater", "reheat", "", "Warm up"],
    ["Slash the middle of shower curtain and unleash evil cry", "snivel", "", "cry"],
    ["Tenor is enthralled by strange platitude", "truism", "", "platitude"],
    ["Cheese knife tarnished slightly", "feta", "", "Cheese"],
    ["To summarize: setter went backwards", "recap", "", "To summarize"],
    ["Record about castle goes on and on (and on)", "loop", "", "goes on and on (and on)"],
    ["Anxiety caused by contents of finer vessels", "nerves", "", "Anxiety"],
    ["Quietly! Go up for the stock", "sheep", "", "stock"],
    ["Appeared stitched up in conversation", "seemed", "", "Appeared"],
    ["Regularly eat lunch, coming back for sweet", "cute", "", "sweet"],
    ["Scavenger identified by any he mutilated?", "hyena", "", "Scavenger"],
    ["Singer back from Scotland.", "alto", "", "Singer"],
    ["Show the way for bullet", "lead", "", "Show the way for bullet"],
    ["Work making soup", "opus", "", "Work"],
    ]

//randomizerClue
exports.randomizerClue = async (req, res) => {
  const {dailyCrypticlePatreonToken } = req.body;
    const referer = req.headers.referer;
  
    if (referer != "https://dailycrypticle.com/" && referer != "https://www.dailycrypticle.com/")
      {
        return res.send(["Play at DailyCrypticle.com", "Play at DailyCrypticle.com", "Play at DailyCrypticle.com", "Play at DailyCrypticle.com"]);
      }
  
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing.' });
    }
  
    let response = [];
  
    //confirm patreon token is still valid
    if (dailyCrypticlePatreonToken)
    {
      try
      {
        const dailyCrypticlePatreonTokenDecoded = jwt.verify(dailyCrypticlePatreonToken, process.env.JWT_SECRET);

        if (Date.now() <= dailyCrypticlePatreonTokenDecoded.exp * 1000) {
          const randomIndex = Math.floor(Math.random() * randomizerCrypticles.length);
    
          response = randomizerCrypticles[randomIndex];
        }
        else{
          response = [
            "To play previous clues, become a Patreon member!",
            "",
            "Become a Patreon Member!",
            "Become a Patreon Member!"
          ];
        }
      }
      catch
      {
        console.log("Failed to validate JWT Token");
  
        response = [
          "To play previous clues, become a Patreon member!",
          "",
          "Become a Patreon Member!",
          "Become a Patreon Member!"
        ];
      }
    }     
    else{
      response = [
        "To play previous clues, become a Patreon member!",
        "",
        "Become a Patreon Member!",
        "Become a Patreon Member!"
      ];
    }
    
  
    res.send(response);
};

//link patreon account
exports.linkPatreon = async (req, res) => {
  const referer = req.headers.referer;

  if (referer != "https://dailycrypticle.com/" && referer != "https://www.dailycrypticle.com/")
    {
      return res.send(["Play at DailyCrypticle.com", "Play at DailyCrypticle.com", "Play at DailyCrypticle.com", "Play at DailyCrypticle.com"]);
    }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing.' });
  }

  const token = authHeader.split(' ')[1];

  try 
  {
    jwt.verify(token, process.env.JWT_SECRET);
  }
  catch
  {
    return res.status(401).json({ message: 'Authorization header is missing.' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const email = decoded.email;

  //call Patreon API for all members of my campaign
  let patreonMemberId = "";

  var myHeaders = new Headers();
  const patreonToken = "Bearer " + process.env.PATREON_TOKEN;
  myHeaders.append("Authorization", patreonToken);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };


  //Paging through all members
  let page = "&page%5Bcursor%5D=";
  let next = "";
  let attempt = 1;

  //while we are on the first attempt, or there is another page
  while (attempt == 1 || next != null)
  {
    let patreonURL = "https://www.patreon.com/api/oauth2/v2/campaigns/13308804/members?fields[member]=email,patron_status&include=currently_entitled_tiers" + page + next;

    await fetch(patreonURL, requestOptions)
    .then(response => response.text())
    .then(result => {
      //Parse response from Patreon call
      let resultJson = JSON.parse(result);

      //If there is no Patreon data, avoid infinite loop
      if (!resultJson.data)
      {
        attempt++;
        next = null;
        next;
      }

      //Find the memberId for our user through user's email
      for (var index = 0; index < resultJson.data.length; ++index) {

        var patreonMember = resultJson.data[index];
        
        if (patreonMember.attributes.email == email){
          patreonMemberId = patreonMember.id;
          break;
        }
        }

        //If we found a member Id, update the user, if not return false
        if (patreonMemberId)
        {
          //Update user's member Id
          (async function() {
            const user = await User.findOne({ email });

            if (!user || !user.emailVerified)
                return res.status(500).json({
                success: false,
                message: 'User not found.',
                });

            let updatedUser = user;

            updatedUser.memberId = patreonMemberId;

            await User.findOneAndUpdate({email: user.email}, updatedUser);
          })();

          return res.send(["True", "Linked Patreon account."]);
        }
        else
        {
          next = resultJson.meta.pagination.cursors.next;
        }
    })
    .catch(error => console.log('error', error));

    attempt = attempt + 1;
  }
};

// Check authentication endpoint
exports.checkAuth = async (req, res) => {

  const referer = req.headers.referer;
  if (referer != "https://dailycrypticle.com/" && referer != "https://www.dailycrypticle.com/")
    {
      return res.send(["Play at DailyCrypticle.com", "Play at DailyCrypticle.com", "Play at DailyCrypticle.com", "Play at DailyCrypticle.com"]);
    }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing.' });
  }

  //Check if we already have a valid patreon token
  if (req.body.dailyCrypticlePatreonToken)
  {
    try
    {
      const dailyCrypticlePatreonToken = req.body.dailyCrypticlePatreonToken;
      const dailyCrypticlePatreonTokenDecoded = jwt.verify(dailyCrypticlePatreonToken, process.env.JWT_SECRET);
  
      if (Date.now() <= dailyCrypticlePatreonTokenDecoded.exp * 1000) {
        return res.status(200).json({ dailyCrypticlePatreonToken });
      }
    }
    catch
    {
      console.log("Token is no loger valid. Patreon validation needed.")
    }
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const email = decoded.email;

     const user = await User.findOne({ email });

      if (!user || !user.emailVerified || !user.memberId)
          return res.status(500).json({
          success: false,
          message: 'User not found as Patreon member.',
          });

    //Call Patreon API, confirm member is active, and generate token to return
    var myHeaders = new Headers();
    const patreonToken = "Bearer " + process.env.PATREON_TOKEN;
    myHeaders.append("Authorization", patreonToken);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

  const memberURL = "https://www.patreon.com/api/oauth2/v2/members/" + user.memberId + "?fields[member]=email,full_name,patron_status&include=currently_entitled_tiers";
    
    fetch(memberURL, requestOptions)
        .then(response => response.text())
        .then(result => {
          //Parse response from Patreon call
          let resultJson = JSON.parse(result);

          //if (resultJson.data.attributes.patron_status = "Something")
          for (var index = 0; index < resultJson.included.length; ++index) {

            var currentTier = resultJson.included[index];
            
            //Only give token to users that are paid and active patreon members (or my account)
            if ((currentTier.id == "24653323" && resultJson.data.attributes.patron_status == "active_patron") || user.memberId == 'a4b8d7ef-64c9-4255-a07b-a4fc6227c4bf'){
              // Generate a JWT token
              const memberId = user.memberId;
              const dailyCrypticlePatreonToken = jwt.sign({ memberId }, process.env.JWT_SECRET, { expiresIn: '1w' });

              return res.status(200).json({ dailyCrypticlePatreonToken });
            }
            }

            return res.status(401).json({ message: 'Invalid or expired token.' });
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

//generateUserClue
exports.generateUserClue = async (req, res) => {

  const {dailyCrypticlePatreonToken, clue, ans, def } = req.body;

  const referer = req.headers.referer;
  
    if (referer != "https://dailycrypticle.com/" && referer != "https://www.dailycrypticle.com/")
      {
        return res.send(["Play at DailyCrypticle.com", "Play at DailyCrypticle.com", "Play at DailyCrypticle.com", "Play at DailyCrypticle.com"]);
      }
  
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing.' });
    }
  
    let responseArray = [];
  
    //confirm patreon token is still valid
    if (dailyCrypticlePatreonToken)
    {
      try
      {
        const dailyCrypticlePatreonTokenDecoded = jwt.verify(dailyCrypticlePatreonToken, process.env.JWT_SECRET);

        if (Date.now() <= dailyCrypticlePatreonTokenDecoded.exp * 1000) {
          let encryptedClue = CryptoJS.AES.encrypt(clue, process.env.JWT_SECRET);
          let encryptedAns  = CryptoJS.AES.encrypt(ans, process.env.JWT_SECRET);
          let encryptedDef  = CryptoJS.AES.encrypt(def, process.env.JWT_SECRET);

          const url = "https://www.dailycrypticle.com/playUserClue.html" 
          + "?clue=" + encodeURIComponent(encryptedClue) 
          + "&ans=" + encodeURIComponent(encryptedAns)
          + "&def=" + encodeURIComponent(encryptedDef);

          responseArray = [url];
        }
        else{
          responseArray = [
            "To create your own clues, become a Patreon member!"
          ];
        }
      }
      catch
      {
        console.log("Failed to validate JWT Token");
  
        responseArray = [
          "To create your own clues, become a Patreon member!"
        ];
      }
    }     
    else{
      responseArray = [
        "To create your own clues, become a Patreon member!"
      ];
    }
    
    console.log(responseArray);
  
    res.send(responseArray);
};

//playUserClue
exports.playUserClue = async (req, res) => {
  const {clue, ans, def } = req.body;
    const referer = req.headers.referer;
  
    if (referer != "https://dailycrypticle.com/" && referer != "https://www.dailycrypticle.com/")
      {
        return res.send(["Play at DailyCrypticle.com", "Play at DailyCrypticle.com", "Play at DailyCrypticle.com", "Play at DailyCrypticle.com"]);
      }
  
    let response = [];
  
      try
      {
          // Decrypt
          var clueBytes  = CryptoJS.AES.decrypt(clue, process.env.JWT_SECRET);
          var originalClue = clueBytes.toString(CryptoJS.enc.Utf8);

          var ansBytes  = CryptoJS.AES.decrypt(ans, process.env.JWT_SECRET);
          var originalAns = ansBytes.toString(CryptoJS.enc.Utf8);

          var defBytes  = CryptoJS.AES.decrypt(def, process.env.JWT_SECRET);
          var originalDef = defBytes.toString(CryptoJS.enc.Utf8);

          response = [
            originalClue,
            originalAns,
            "https://www.youtube.com/@DailyCrypticle",
            originalDef
          ];
      }
      catch
      {
        response = [
          "Failed to load clue",
          "",
          "Failed to load clue",
          "Failed to load clue"
        ];
      }
  
    res.send(response);
};