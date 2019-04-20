import ObjectModelEntity from "../ObjectModelEntity"

export default class ModelEntity extends ObjectModelEntity {
    className() {
        return this.heading
    }
}