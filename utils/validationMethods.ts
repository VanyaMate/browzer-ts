export const validLogin = function (login: string): boolean {
    if (login === undefined || login === null) {
        return false;
    }

    if (login.length < 3 || login.length > 16) {
        return false;
    }

    if (login.match(/[\d\w_]/gi)?.join('') !== login) {
        return false;
    }

    return true;
}

export const validPassword = function (password: string): boolean {
    if (password === undefined || password === null) {
        return false;
    }

    if (password.length < 8 || password.length > 24) {
        return false;
    }

    if (password.match(/[\d\w_!*+-]/gi)?.join('') !== password) {
        return false;
    }

    return true;
}

export const validEmail = function (email: string): boolean {
    if (email === undefined || email === null) {
        return false;
    }

    if (email.length > 50 || email.length < 4) {
        return false;
    }

    if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)?.join('') !== email) {
        return false;
    }

    return true;
}

export const validName = function (name: string): boolean {
    if (name === undefined || name === null) {
        return false;
    }

    if (name.length > 24 || name.length < 2) {
        return false;
    }

    if (name.match(/^[а-яa-z]+$/i)?.join('') !== name) {
        return false;
    }

    return true;
}

export const validComponentName = function (name: string): boolean {
    if (name === undefined || name === null) {
        return false;
    }

    if (name.length > 10 || name.length < 2) {
        return false;
    }

    if (name.match(/^[а-яa-z\d_<>\s.\+!()/\\\[\]]+$/i)?.join('') !== name) {
    //if (name.match(/^[а-яa-z\d()]+$/i)?.join('') !== name) {
        return false;
    }

    return true;
}