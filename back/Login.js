const mongoUser = require("./Users").mongoUser
module.exports = 
class Login {
    constructor() {}

    get login () {
        return this._login
    }

    async setLogin (login) {
        await this.newLoginValid(login)
        .then((response) => {
            if (response) {
                this._login = login
                return this
            }
            else return new Error('bad Login')
        })
    }

    async newLoginValid (login) {
        if (login.length >= 6 && login.length <= 128) {
            await mongoUser.find({ "userData.Login.login": login }).exec()
            .then((response) => {
                console.log("1", Boolean(response.length))
                if (response.length) {
                    return false
                }
                else return true
            })
        }
        return false
    }
}