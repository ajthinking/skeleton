import F from '../utilities/Formatter'

export default class Segment {
    constructor(chunk) {
        let parts = chunk.split('\n')
        this.heading = this.parts[0]
        this.attributes = this.parts.slice(1)
    }

    static fromText(chunk) {
        return new this(chunk)
    }
}