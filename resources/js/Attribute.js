export default class Attribute {
    constructor(properties) {
        Object.keys(properties).map((key) => {
            this[key] = properties[key]
        })
    }
}