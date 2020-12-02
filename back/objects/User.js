const Login = require('./Login.js')
const Password = require('./Password.js')
module.exports =
class User{
    constructor(login, password, privilege = 'user', cash = 0, freshAuctions = [], lostAuctions = [], wonAuctions = [], participatedAuctions = [], _id = "ObjectId") {
        this.Password = new Password(password)
        this.Login = new Login(login)
        this.privilege = privilege
        this.cash = cash,
        this.freshAuctions = freshAuctions
        this.lostAuctions = lostAuctions
        this.wonAuctions = wonAuctions
        this.participatedAuctions = participatedAuctions
        this._id = _id
    }

    get User () {
        return {
            'Login': this.Login,
            'Password': this.Password,
            'privilege': this.privilege,
            'cash': this.cash,
            'freshAuctions': this.freshAuctions,
            'lostAuctions': this.lostAuctions,
            'wonAuctions': this.wonAuctions,
            'participatedAuctions': this.participatedAuctions
        }
    }

    set User (user) {
        this.Password = new Password(user.password)
    }

    static toUserReg (user) {
        return new User(
            typeof user.Login !== "undefined" ? (typeof user.Login.login !== "undefined" ? user.Login.login : user.Login._login) : user.login,
            typeof user.Password !== "undefined" ? (typeof user.Password.password !== "undefined" ? user.Password.password : user.Password._password) : user.password,
        )
    }

    static toUser (user) {
        return new User(
            typeof user.userData.Login !== "undefined" ? (typeof user.userData.Login.login !== "undefined" ? user.userData.Login.login : user.userData.Login._login) : user.login,
            typeof user.userData.Password !== "undefined" ? (typeof user.userData.Password.password !== "undefined" ? user.userData.Password.password : user.userData.Password._password) : user.password,
            user.userData.privilege,
            user.userData.cash,
            user.userData.freshAuctions,
            user.userData.lostAuctions,
            user.userData.wonAuctions,
            user.userData.participatedAuctions,
            user._id
        )
    }
}