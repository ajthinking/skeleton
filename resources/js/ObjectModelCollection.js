import collect from 'collect.js'

export default class ObjectModelCollection {
    constructor(segments, modelDefinition = "LaravelModel") {
        this.segments = collect(segments)
        this.Model = modelDefinition
    }

    static fromSegments(segments) {
        return new this(segments)
    }

    hasUserModel() {
        return this.userModel().count() > 0
    }

    userModel() {
        return this.segments.filter(segment => segment.isUserModel())
    }

    models() {
        return this.segments.filter(segment => segment.hasModel())
    }

    modelsExceptUser() {
        return this.models().filter(model => !model.isUserModel())
    }
}