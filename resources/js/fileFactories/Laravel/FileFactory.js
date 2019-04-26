import UserPipe from './pipes/UserPipe'
import ModelPipe from './pipes/ModelPipe'
import MigrationPipe from './pipes/MigrationPipe'
import ControllerPipe from './pipes/ControllerPipe'
import APIControllerPipe from './pipes/APIControllerPipe'
import SeederPipe from './pipes/SeederPipe'
import APIRoutesPipe from './pipes/APIRoutesPipe'

import defaultSchema from './defaultSchema'

import collect from 'collect.js'

export default class FileFactory {
    constructor(objectModelCollection) {
        this.omc = objectModelCollection
    }

    static pipes() {
        return [
            UserPipe,
            ModelPipe,
            //MigrationPipe,
            //ControllerPipe,
            //APIControllerPipe,
            //SeederPipe,
            //APIRoutesPipe,
        ]
    }

    static defaultSchema() {
        return defaultSchema;
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