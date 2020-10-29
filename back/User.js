const Login = require('./Login.js')
const Password = require('./Password.js')
module.exports =
class User {
    constructor(login, password) {
        this.Login = new Login(login)
        this.Password = new Password(password)
    }

    get getUser () {
        return {'Login': this.Login, 'Password': this.Password}
    }

    set setUser (user) {
        this.Login = new Login(user.login)
        this.Password = new Password(user.password)
    }
}