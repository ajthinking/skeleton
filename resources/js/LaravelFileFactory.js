import UserPipe from './pipes/UserPipe'
import ModelPipe from './pipes/ModelPipe'
import MigrationPipe from './pipes/MigrationPipe'
import collect from 'collect.js'

export default class LaravelFileFactory {
    constructor(objectModelCollection) {
        this.omc = objectModelCollection
    }

    static pipes() {
        return [
            UserPipe,
            ModelPipe,
            MigrationPipe
        ]
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