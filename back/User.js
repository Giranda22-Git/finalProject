const Login = require('./Login.js')
const Password = require('./Password.js')
module.exports =
class User extends Password {
    constructor(login, password, privilege) {
        try {
            super(password)
            async () => {
                await this.setLogin(login)
                .then(() => {
                    console.log(this.login, this.password)
                    if ( !this.login || !this.password ) throw new Error("bad")
                    this.privilege = privilege
                })
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    get getUser () {
        return {'Login': this.Login, 'Password': this.Password}
    }

    set setUser (user) {
        this.Login = new Login(user.login)
        this.Password = new Password(user.password)
    }

    static toUser (user) {
        return new User(
            typeof user.Login !== "undefined" ? user.Login.login : user.login,
            typeof user.Password !== "undefined" ? user.Password.password : user.password,
            user.privilege
        )
    }
}