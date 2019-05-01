import F from '../utilities/Formatter'

export default class Segment {
    constructor(chunk) {
        let parts = chunk.split('\n')
        this.heading = parts[0]
        this.attributes = parts.slice(1)
    }

    static fromText(chunk) {
        return new this(chunk)
    }

    hasModel() {
        // a Model is indicated by capital first letter
        return this.heading[0] == this.heading[0].toUpperCase()
    }

    hasUserModel() {
        return this.heading == "User"
    }    
}