class Entity {
    constructor(displayName, desc) {
        this.displayName = displayName;
        this.desc = desc;
    }
}

class Room {
    constructor(displayName, desc) {
        this.displayName = displayName;
        this.desc = desc;
        this.ent = null;
        this.openDirs = [false,false,false,false]; // North East South West
    }
}

const entrance = new Room("blocked entrance", "You awake in a dark room. You're an adventurer, at least you think, guided by mysterious voices. One such voice identifies itself as Vigenere and speaks to you, \"Vo gwvgj. Patience is key.\"")
entrance.openDirs = [true, false, false, false];

const firstHall = new Room("decrepit hall", "There are cracks along the stone walls. Wherever you are, it has clearly not been maintained for some time.")
firstHall.openDirs = [true, false, true, false];

const firstCorner = new Room("dusty corner", "To the north is a metal door chained up with a lock, but there is white light coming through. To the west is a foreboding doorway into a dark room.")
firstHall.openDirs = [false, false, true, true];

const roomGrid = [
    [null, null, null, null],
    [null, firstCorner, null, null],
    [null, firstHall, null, null],
    [null, entrance, null, null]
];