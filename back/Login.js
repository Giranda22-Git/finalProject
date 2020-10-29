module.exports = 
class Login {
    constructor(login) {
        if (this.newLoginValid(login))
            this.login = login
        else return new Error('bad Login')
    }

    get getLogin () {
        return this.login
    }

    set setLogin (login) {
        if (this.newLoginValid(login))
            this.login = login
        else return new Error('bad Login')
    }

    newLoginValid (login) {
        return login.length >= 6 && login.length <= 128
    }
}