export default class BasePipe {
    static make() {
        return new this()
    }
        
    name() {
        return this.constructor.name
    }

    horisontalStringList(names, defaultValue) {
        let result = names.map(name => {
            return "'" + name + "'"
        }).join(", ")

        return result ? result : defaultValue
    }
}