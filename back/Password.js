module.exports =
class Password {
    constructor(password) {
        if (this.newPasswordValid(password))
            this.password = password
        else return new Error('bad Password')
    }

    constructor() {
        return this.password = Math.random().toString(36).slice(-8)
    }

    get getPassword () {
        return this.password
    }

    set setPassword (password) {
        if (this.newPasswordValid(password))
            this.password = password
        else return new Error('bad Password')
    }

    validPassword(password) {
        return this.password === password
    }

    newPasswordValid (password) {
        return password.length >= 6 && password.length <= 512
    }
}