import Templates from './Templates'

export default class Laravel {
    static models(OMC) {
        return OMC.models().map(() => {
            return Templates.Model
        })
    }
}