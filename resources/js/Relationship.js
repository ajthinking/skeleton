export default class Relationship {
    constructor(first, second, type) {
        this.first = first
        this.second = second
        this.type = type
    }

    toString() {
        return [
            this.first.heading,
            this.type,
            this.second.heading
        ].join(" ")
    }
}