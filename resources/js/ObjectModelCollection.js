import collect from 'collect.js'

export default class ObjectModelCollection {
    constructor(segments, modelDefinition = "LaravelModel") {
        this.segments = collect(segments)
        this.Model = modelDefinition
    }

    static fromSegments(segments) {
        return new this(segments)
    }

    models() {
        return this.segments.filter(segment => segment.hasModel())
    }
}