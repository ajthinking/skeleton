import ModelPipe from "./pipes/ModelPipe"
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
        this.text = this.text.replace(new RegExp(marker, "g"), text);
    }

    blockReplace(marker, text) {
        if(text == "") return this.removeBlock(marker)

        var matches = RegExp('([ ]*)(' + marker + ')').exec(this.text)
        var tabsBeforeItem = matches[1].length/4;
        var fullMarker = matches[0];

        this.text = this.text.replace(
            new RegExp(fullMarker, "g"),
            this.indent(text, tabsBeforeItem)
        )
    }

    indent(text, tabs) {
        return text.split('\n').map(line => {
            if(line == "") return line; // No extra indentation for empty lines
            return " ".repeat(tabs*4) + line
        }).join('\n')
    }

    removeBlock(marker) {
        var regex = '^([\\n])*[ ]*' + marker + '[\\n]([\\n]+)?';
        var matches = RegExp(regex, "gm").exec(this.text)

        let spacingAbove = matches[1]
        let spacingBelow = matches[2]
        
        this.text = this.text.replace(
            new RegExp(regex, "gm"),
            (!!spacingAbove && !!spacingBelow) ? "\n" : ""
        )


    }
}