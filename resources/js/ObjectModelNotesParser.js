import ObjectModelEntity from './ObjectModelEntity'

export default class ObjectModelNoteParser {
    constructor(text) {
        this.text = text
    }

    static makeWithText(text) {
        return new ObjectModelNoteParser(text)
    }

    static parse(text) {
        return this.makeWithText(text).clean()
    }

    clean() {
        this.text = this.text
            // trim preciding line space
            .replace(/[^\S\r\n]/gm,"")        
            // trim trailing line space
            .replace(/[\t]+$/gm,"")        
            // trim preciding newlines
            .replace(/^\n+/,"")
            // trim trailing newlines
            .replace(/\n+$/, "")
            // remove exessive newlines
            .replace(/\n\s+\n/, "\n\n")
            // remove comments
            .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "")
        
        return this;
    }

    /* returns an array with items of type ObjectModelEntity */
    segment() {
        return !this.text ? [] : this.text.split(/\n\s*\n/).map((chunk) => ObjectModelEntity.fromText(chunk))        

    }        
}
