module.exports =
class log {
    constructor (initiator, action, timeStamp = null) {
        this.initiator = initiator
        this.action = action
        timeStamp ? this.timeStamp = Date(timeStamp) : this.timeStamp = new Date()
    }

    get log () {
        return `${this.timeStamp.toUTCString} ${this.initiator} ${this.action}`
    }

    static toLog (initiator, action, timeStamp) {
        return new log(
            initiator,
            action,
            timeStamp
        )
    }
}