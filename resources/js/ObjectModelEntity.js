export default class ObjectModelEntity {
    constructor(chunk) {
        this.parts = chunk.split('\n')
        this.heading = this.parts[0]
        this.attributes = this.parts.slice(1)
    }

    static fromText(chunk) {
        return new this(chunk)
    }

    hasModel() {
        // a Model is indicated by capital first letter
        return this.heading[0] == this.heading[0].toUpperCase()
    }
}