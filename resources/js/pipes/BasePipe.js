export default class BasePipe {
    static make() {
        return new this()
    }
        
    name() {
        return this.constructor.name
    }
}