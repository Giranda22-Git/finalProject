const passwordHash = require('password-hash')
const Login = require('./Login.js')
module.exports =
class Password extends Login {
    constructor(password) {
        super()
        if (passwordHash.isHashed(password))
            this._password = password
        else if (this.newPasswordValid(password))
            this._password = passwordHash.generate(password)
        else return new Error('bad Password')
    }

    get password () {
        return this._password
    }

    set password (password) {
        if (this.newPasswordValid(password))
            this._password = passwordHash.generate(password)
        else return new Error('bad Password')
    }

    passwordVerify(password) {
        return passwordHash.verify( password, this._password )
    }

    newPasswordValid (password) {
        return password.length >= 6 && password.length <= 512
    }

    static generate () {
        return this.password = Math.random().toString(36).slice(-8)
    }
}