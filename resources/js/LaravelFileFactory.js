import UserPipe from './pipes/UserPipe'
import ModelPipe from './pipes/ModelPipe'

export default class LaravelFileFactory {
    constructor(objectModelCollection) {
        this.omc = objectModelCollection
    }

    static pipes() {
        return [
            UserPipe,
            ModelPipe,
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
        console.log(this.pipes.map(pipe => {
            return pipe.make().calculateFiles(this.omc)
        }))

        return this.pipes.map(pipe => {
            return pipe.make().calculateFiles(this.omc)
        }).reduce((pipeFileList, allFiles) => {
            return allFiles.concat(pipeFileList)
        }, []);
    }

    user() {
        return "file"
    }
}