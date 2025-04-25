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
        this.sayResponse = function(message){
            return false;
        }
        this.ent = null;
        this.openDirs = [false,false,false,false]; // North East South West
    }
}

const entrance = new Room("blocked entrance", "You awake in a dark room. You're an adventurer, at least you think, guided by mysterious voices. One such voice identifies itself as Vigenere and speaks to you, <br><br>\"Vo gwvgj. Patience is key.\"")
entrance.openDirs = [true, false, false, false];
entrance.gotKey = false;
entrance.sayResponse = function(message) {
    if (message == "nothing") {
        describeAction("Your vision goes dark as the guiding voices speak to you for what you feel may be the final time. First Ay-won, then Caesar, and lastly Vigenere give you their guidance in one combined message.<br><br>\"23-16-20-3-2-26  5-25-19  26-26-10  18-2-19  26-25-11-19-7  15-19-22  26-4-24-22.  17-5-2  8-2-22  6-16  22-12-18-15-16.\"");
        return true;
    }
    return false;
}

const firstHall = new Room("decrepit hall", "There are cracks along the stone walls. Wherever you are, it has clearly not been maintained for some time. A voice named Caesar warns,<br><br>\"Phbibqlk kloqetbpq!\"")
firstHall.openDirs = [true, false, true, false];

const firstCorner = new Room("dusty corner", "To the north is a metal door chained up with a lock, but there is white light coming through. To the west is a foreboding doorway into a dark room. To the east is a cramped-looking tunnel.")
firstCorner.openDirs = [false, true, true, true];

const exit = new Room("brightly-lit exit", "You feel the warmth of sunlight on your face as you step through the once-chained metal door. Freedom is just a few steps to the north.")
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
        slimeApproach.openDirs[2] = true;
        slimeApproach.desc = "Just when you thought this place couldn't be less pleasant, this hallway has various splatters of translucent green slime. With the skeleton's key, you unlock the door at the south end of the hallway.";
        return true;
    }
    return false;
}
skeletonRoom.ent = skeleton;

const tunnelHall = new Room("narrow tunnel", "As your crawl through, you have to wonder who chose to build this in the first place. The tunnel ends at east and west.");
tunnelHall.openDirs = [false, true, false, true];

const tunnelCorner = new Room("tunnel's end", "You emerge from the cramped space and thankfully see a much wider hallway south. You could go back west, as much as you dread the thought.");
tunnelCorner.openDirs = [false, false, true, true];

const slimeApproach = new Room("slimy hallway", "Just when you thought this place couldn't be less pleasant, this hallway has various splatters of translucent green slime, leading south to a locked door.");
slimeApproach.openDirs = [true, false, false, false];

const slimeRoom = new Room("slime closet", "It is a small room occupied almost fully by its occupant, but surprisingly clean besides all the slime.");
slime = new Entity("giant, talking slime", "It imparts upon you some sort of psychic message, not unlike the voices guiding you.<br><br>\"I know what you seek, and where you may find it. Go back whence you came, and declare yourself silent.\"");
slimeRoom.ent = slime;
slimeRoom.openDirs = [true, false, false, false];

const roomGrid = [
    [null, exit, null, null],
    [skeletonRoom, firstCorner, tunnelHall, tunnelCorner],
    [null, firstHall, null, slimeApproach],
    [null, entrance, null, slimeRoom]
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
                if (room.openDirs[1]) {
                    gridSpace.style.borderRight = "";
                } else {
                    gridSpace.style.borderRight = "thick solid black"
                }
                if (room.openDirs[2]) {
                    gridSpace.style.borderBottom = "";
                } else {
                    gridSpace.style.borderBottom = "thick solid black"
                }
                if (room.openDirs[3]) {
                    gridSpace.style.borderLeft = "";
                } else {
                    gridSpace.style.borderLeft = "thick solid black"
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
                input.splice(0,1);
                if (getCurrentRoom().ent == null) {
                    tellRoom(getCurrentRoom(), input.join(" "));
                } else {
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
        case "lock":
            if (getCurrentRoom() == firstCorner) {
                describeAction("You became the key and unlocked the chain around the metal door.");
                firstCorner.openDirs[0] = true;
                return true;
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

function tellRoom(room, message) {
    if (!room.sayResponse(message)) {
        describeAction("You speak, but nobody is around to hear you.");
    }
}
function tellEntity(ent, message) {
    if (!ent.sayResponse(message)) {
        describeAction("The " + ent.displayName + " does not react to your words.");
    }
}

mapDisplay();
describeRoom();