class Entity {
    constructor(displayName, desc) {
        this.displayName = displayName;
        this.desc = desc;
        this.sayResponse = function(message){
            return false;
        }
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

const entrance = new Room("blocked entrance", "You awake in a dark room. You're an adventurer, at least you think, guided by mysterious voices. One such voice identifies itself as Vigenere and speaks to you, <br><br>\"Vo gwvgj. Patience is key.\"")
entrance.openDirs = [true, false, false, false];

const firstHall = new Room("decrepit hall", "There are cracks along the stone walls. Wherever you are, it has clearly not been maintained for some time. A voice named Caesar warns,<br><br>\"Phbibqlk kloqetbpq!\"")
firstHall.openDirs = [true, false, true, false];

const firstCorner = new Room("dusty corner", "To the north is a metal door chained up with a lock, but there is white light coming through. To the west is a foreboding doorway into a dark room.")
firstCorner.openDirs = [false, false, true, true];

const exit = new Room("brightly-lit exit", "You feel the warmth of sunlight on your face as you step through the once-chained metal door. It seems you are free from this place.")
exit.openDirs = [true, false, true, false];

const skeletonRoom = new Room("skeleton's chamber", "The ground is strewn with various trinkets, and cuffs hang from the walls by chains.");
skeletonRoom.openDirs = [false, true, false, false];
skeleton = new Entity("skeleton", "It tries to attack you, and you have no way to fight back! But suddenly, you receive advice from the voice Ay-won:<br><br>\"19-1-25  25-15-21-18  19-11-21-12-12  12-15-15-11-19  14-9-3-5\"");
skeleton.pacified = false;
skeleton.sayResponse = function(message) {
    if (message == "your skull looks nice" && !this.pacified) {
        this.desc = "It looks at you happily, its day brightened by your compliment, and wishes you luck in finding a way to escape.";
        describeAction("The skeleton is surprised, and stops attacking.<br><br>\"...Really? Wow, nobody has said anything nice to me ever since I became a skeleton..! Here, take this key. It doesn't work on the main door, but maybe it will still help?\"");
        this.pacified = true;
        return true;
    }
    return false;
}
skeletonRoom.ent = skeleton;

const roomGrid = [
    [null, exit, null, null],
    [skeletonRoom, firstCorner, null, null],
    [null, firstHall, null, null],
    [null, entrance, null, null]
];
roomPos = [3, 1];
canSee = false;

function getCurrentRoom() {
    return roomGrid[roomPos[0]][roomPos[1]];
}
function getRoom(y, x) {
    return roomGrid[y][x];
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
                    gridSpace.style.borderTop = "thick solid black"
                }

                if (room == getCurrentRoom()) {
                    gridSpace.style.backgroundColor = "yellow";
                } else {
                    gridSpace.style.backgroundColor = canSee ? "rgb(150, 150, 150)" : "black";
                }
            }
        }
    }
}

function describeRoom(overrideName = "", overrideDesc = "") {
    document.getElementById("roomdesc").innerHTML = (overrideName == "" ? "You are in a " + getCurrentRoom().displayName + "." : overrideName) + "<br><br>" + (overrideDesc == "" ? getCurrentRoom().desc : overrideDesc) + ((getCurrentRoom().ent != null) ? "<br><br>There is a " + getCurrentRoom().ent.displayName + " here. " + getCurrentRoom().ent.desc : "");
}
function describeAction(override = "") {
    document.getElementById("actiondesc").innerHTML = (override == "" ? "What will you do?" : override) 
}

document.getElementById("userinput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        let input = document.getElementById("userinput").value.toString().toLowerCase().split(" ");
        document.getElementById("userinput").value = "";

        switch (input[0]) {
            case "go":
                if (!goDirection(input[1])) {
                    describeAction("Can't go there.");
                }
                return;
            case "say":
                if (getCurrentRoom().ent == null) {
                    describeAction("You speak, but nobody is around to hear you.");
                } else {
                    input.splice(0,1);
                    tellEntity(getCurrentRoom().ent, input.join(" "));
                }
                return;
        }
        describeAction("Can't do that.");
    }
});

function goDirection(dir) {
    switch (dir) {
        case "north":
            if (getCurrentRoom().openDirs[0]) {
                return moveTo(roomPos[0]-1, roomPos[1]);
            }
        break;
        case "east":
            if (getCurrentRoom().openDirs[1]) {
                return moveTo(roomPos[0], roomPos[1]+1);
            }
        break;
        case "south":
            if (getCurrentRoom().openDirs[2]) {
                return moveTo(roomPos[0]+1, roomPos[1]);
            }
        break;
        case "west":
            if (getCurrentRoom().openDirs[3]) {
                return moveTo(roomPos[0], roomPos[1]-1);
            }
        break;
    }
    return false;
}
function moveTo(y, x) {
    if (y >= 0 && y < roomGrid.length && x >= 0 && x < roomGrid[y].length) {
        let target = getRoom(y, x);
        if (target != null) {
            canSee = true;
            roomPos = [y,x];
            mapDisplay();
            describeRoom();
            describeAction();
            return true;
        }
    }
    return false;
}

function tellEntity(ent, message) {
    if (!ent.sayResponse(message)) {
        describeAction("The " + ent.displayName + " does not react to your words.");
    }
}

mapDisplay();
describeRoom();