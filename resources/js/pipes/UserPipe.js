import Template from '../Template'
import ModelPipe from './ModelPipe';
import Templates from '../Templates';

export default class UserPipe extends ModelPipe {
    calculateFiles(omc = ObjectModelCollection) {
        if(!omc.hasUserModel()) return [];
        let user = omc.userModel()
        return [{
            path: "app/User.php",
            content: Template.for('User').replace({
                ___HIDDEN___: this.hiddenAttributes(user),
                ___FILLABLE___: this.fillableAttributes(user),
                ___CASTS___: this.casts(user),
                ___RELATIONSHIP_METHODS_BLOCK___: this.relationshipMethods(user),
            })
        }]
    }
}