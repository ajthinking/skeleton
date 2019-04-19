import ModelPipe from "./ModelPipe"
import Templates from "./Templates"

export default class Template {
    constructor(text) {
        this.originalText = text
        this.text = text
    }

    static for(templateName) {
        return new this(
            Templates[templateName]
        )
    }

    replace(replacementPairs) {
        Object.keys(replacementPairs).forEach(marker => {
            if(marker.endsWith("_BLOCK")) return this.blockReplace(marker, replacementPairs[marker]);
            this.inlineReplace(marker, replacementPairs[marker])
        })

        return this.text
    }

    inlineReplace(marker, text) {
        this.text = this.text.replace(new RegExp(marker,"g"), text);
    }

    blockReplace(marker, text) {

    }


}