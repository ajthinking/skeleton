
import defaultSchema from './defaultSchema'
import defaultSketch from './defaultSketch'
import collect from 'collect.js'
const pipes = require.context('./pipes', false, /\.js$/);

export default class FileFactory {
    constructor(objectModelCollection) {
        this.omc = objectModelCollection
    }

    static pipes() {
        return [
            pipes("./UserPipe.js").default,
            pipes("./ModelPipe.js").default,
            pipes("./MigrationPipe.js").default,
            pipes("./ControllerPipe.js").default,
            pipes("./APIControllerPipe.js").default,
            pipes("./SeederPipe.js").default,            
            pipes("./FactoryPipe.js").default,                        
            //APIRoutesPipe,
        ]
    }

    static defaultSchema() {
        return defaultSchema;
    }

    static defaultSketch() {
        return defaultSketch;
    }    

    static from(objectModelCollection) {
        return new this(objectModelCollection)
    }

    withPipes(pipes) {
        this.pipes = pipes
        return this
    }

    calculateFiles() {
        return collect(this.pipes.map(pipe => {
            return pipe.with(this.omc).calculateFiles(this.omc)
        }).reduce((pipeFileList, allFiles) => {
            return allFiles.concat(pipeFileList)
        }, [])).sortBy('path').toArray();
    }
}