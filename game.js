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
firstCorner.openDirs = [false, false, true, true];

const exit = new Room("brightly-lit exit", "You feel the warmth of sunlight on your face as you step through the once-chained metal door. It seems you are free from this place.")
exit.openDirs = [true, false, true, false];

const roomGrid = [
    [null, exit, null, null],
    [null, firstCorner, null, null],
    [null, firstHall, null, null],
    [null, entrance, null, null]
];
roomPos = [3, 1];

function getCurrentRoom() {
    return roomGrid[roomPos[0]][roomPos[1]];
}

function mapDisplay() {
    for (let i = 0 ; i < roomGrid.length ; i++) {
        for (let j = 0 ; j < roomGrid[i].length ; j++) {
            let gridSpace = document.getElementById(i.toString() + j.toString());
            let room = roomGrid[i][j];
            if (room == null) {
                gridSpace.style.backgroundColor = "black";
            } else {
                if (room.openDirs[0]) {
                    gridSpace.style.borderTop = "";
                } else {
                    gridSpace.style.borderTop = "thick solid #000000"
                }

                if (room == getCurrentRoom()) {
                    gridSpace.style.backgroundColor = "yellow";
                } else {
                    gridSpace.style.backgroundColor = "rgb(150, 150, 150)";
                }
            }
        }
    }
}

mapDisplay();