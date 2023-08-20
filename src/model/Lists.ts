import { Item } from './Item';

export const lists :{ [key: string]: string[] } = {
    "Travel Aids": [
        'books',
        'bottled water',
        'chewing gum',
        'earplugs',
        'notebook & pen',
        'sleeping mask',
        'snacks',
        'travel pillow',
        'travel sickness remedy'
    ],
    
    "Money Stuff": [
        'cash',
        'credit cards',
        'wallet',
    ],

    "Travel Info": [
        'driving license',
        'itinerary',
        'map',
        'passport',
    ],

    "Documents": [
        'address book',
        'car insurance',
        'copies of travel docs',
        'medical insurance card',
        'phone numbers',
        'travel insurance',
    ],

    "Bags": [
        'collapsible tote bag',
        'day bag',
        'luggage tags',
        'money belt',
        'plastic bags',
        'purse',
    ],

    "Laundry": [
        'laundry bag',
        'laundry kit',
        'sewing kit',
    ],

    "Misc": [
        'house keys',
        'travel lock and keys',
        'umbrella',
    ],

    "Tech": [
        'alarm clock',
        'batteries',
        'camera charter',
        'camera',
        'headphones',
        'laptop charger',
        'laptop',
        'mobile phone charger',
        'mobile phone',
        'music player',
        'switch charger',
        'switch',
        'torch',
        'travel adapter',
        'watch charger',
        'work laptop charger',
        'work laptop',
    ],

    "Clothes - Basic": [
        'bathrobe',
        'nightware',
        'socks',
        'underwear',
    ],

    "Clothes - Basic (women)": [
        'bra',
        'tights',
    ],

    "Clothes - Formal": [
        'blazers',
        'shirts',
        'slacks',
        'suits',
        'tuxedo',
    ],

    "Clothes - Formal (women)": [
        'dresses',
        'skirts',
    ],

    "Clothes - Gym": [
        'gym shorts',
        'gym socks',
        'gym underwear',
        'running overlayer',
        'trainers',
        'workout shirt',
    ],

    "Clothes - Gym (women)": [
        'sports bra',
    ],

    "Clothes - Swimming": [
        'goggles',
        'swim cap',
        'swim suit',
        'towel',
    ],

    "Clothes - Casual": [
        'jeans',
        'jumper',
        'shorts',
        't-shirts',
    ],

    "Clothes - Outerware": [
        'coat',
        'gloves',
        'hat',
        'jacket',
        'raincoat',
        'scarf',
    ],

    "Clothes - Footware": [
        'casual shoes',
        'formal shoes',
        'sandals',
        'slippers',
    ],

    "Clothes - Accessories": [
        'belts',
        'glasses case',
        'glasses',
        'jewellery',
        'sunglasses',
        'ties',
        'watch',
    ],

    "Dental Care": [
        'dental floos',
        'gum guard',
        'toothbrush',
        'toothpaste',
    ],

    "Hair": [
        'conditioner',
        'curling iron',
        'hair accessories',
        'hair brush/comb',
        'hairdryer',
        'shampoo',
        'styling products',
    ],

    "Personal Care": [
        'cotton buds',
        'deodorant',
        'facecloth',
        'feminine hygiene',
        'lip balm',
        'moisturizer',
        'nail clippers',
        'nail file',
        'perfume / cologne',
        'razor',
        'shaving cream',
        'soap',
        'tissues',
        'tweezers',
    ],

    "Make-up": [
        'make-up remover',
        'make-up',
        'mirror',
        'nail polish',
    ],

    "This and That": [
        'beach towel',
        'birth control',
        'contact lenses and case',
        'first-aid kit',
        'hand towel',
        'hand wipes',
        'insect repellent',
        'lint roller',
        'medication',
        'multi tool',
        'painkillers',
        'sunscreen',
        'tea bags',
        'travel wash',
        'vitamins',
    ],

    "Ski": [
        'cheap sunglasses',
        'hand warmers',
        'hip flask',
        'salopettes',
        'ski boots',
        'ski friendly rucksack',
        'ski gloves',
        'ski goggles',
        'ski helmet',
        'ski jacket',
        'ski socks',
        'skis',
        'snood',
        'thermal leggings',
        'thermal top',
        'thermos',
    ],

    "Cycling": [
        "cycle jacket",
        "cycle shirts",
        "cycle shorts",
        "base layer",
        "waterproof trousers",
        "bike shoes",
        "cycle overshoes",
        "cycle socks",
        "cycle cap",
        "sunglasses",
        "helmet",
        "tyre patches",
        "bike water bottles",
        "chain lube",
        "spare inner tubes",
        "minipump",
        "tyre levers",
        "multitool",
        "headlight",
        "tail light",
        "bike light chargers",
        "gels",
        "cereal bars",
        "spare water bottle",
    ]
}



export const allLists = Object.keys(lists);

export const defaultNotSelected: string[] = [
    "Ski",
    "Clothes - Gym (women)",
    "Clothes - Formal (women)",
    "Clothes - Basic (women)",
    "Make-up",
];
export const defaultSelection: string[] = allLists.filter(item =>
    !defaultNotSelected.includes(item)
)

export function createList(nameList: string[]): Item[] {
    return nameList.map(name => new Item(name));
}

export function mergeLists(selectedLists: string[]): Item[] {
    if (selectedLists.length === 0) {
        selectedLists = allLists;
    }

    const items: string[] = selectedLists.map(listName => {
        if (listName in lists) {
            return lists[listName];
        } else {
            return [];
        }
    }).flat();

    return createList(items);
}
