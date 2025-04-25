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
        this.leftChar = null;
        this.rightChar = null;
    }
}