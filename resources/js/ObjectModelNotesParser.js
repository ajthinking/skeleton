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
        // trim preciding newlines
        this.text = this.text.replace(/^\n+/,"")
        // trim trailing newlines
        this.text = this.text.replace(/\n+$/, "");
        // remove exessive newlines
        this.text = this.text.replace(/\n\s+\n/, "\n\n");
        // remove comments
        this.text = this.text.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "");
        return this;
    }

    segment() {
        if(!this.text) return [];
        var parts = this.text.split(/\n\s*\n/);
        return this.text.split(/\n\s*\n/).map((chunk) => ObjectModelEntity.fromText(chunk));        
    }        
}
