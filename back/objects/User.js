const Login = require('./Login.js')
const Password = require('./Password.js')
module.exports =
class User{
    constructor(login, password, privilege = 'user') {
        this.Password = new Password(password)
        this.Login = new Login(login)
        this.privilege = privilege
    }

    get User () {
        return {'Login': this.Login, 'Password': this.Password}
    }

    set User (user) {
        this.Password = new Password(user.password)
        this.privilege = user.privilege
    }

    static toUser (user) {
        console.log(user)
        return new User(
            typeof user.Login !== "undefined" ? user.Login.login : user.login,
            typeof user.Password !== "undefined" ? user.Password.password : user.password,
            user.privilege
        )
    }
}