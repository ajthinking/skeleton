import Template from '../Template'
import ModelPipe from './ModelPipe';

export default class UserPipe extends ModelPipe {
    static make() {
        return new UserPipe()
    }
    
    name() {
        return this.constructor.name
    }

    calculateFiles(omc = ObjectModelCollection) {
        if(!omc.hasUserModel()) return [];
        let user = omc.userModel()
        return [{
            path: "app/User.php",
            content: Template.for('User').replace({
                //FILLABLE: this.fillable_attributes(), // placed in super class ModelPipe
                //HIDDEN: this.hidden_attributes(), // placed in super class ModelPipe
                ___RELATIONSHIP_METHODS_BLOCK___: ""//this.relationshipMethods(),
            })
        }]
    }
}