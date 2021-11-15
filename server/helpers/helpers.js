require('dotenv').config();
const { sign } = require("jsonwebtoken");
const { genSaltSync, hashSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtsalt = process.env.JWT_SALT


module.exports = {
    giveToken: (data) => {
        const {
            userId
        } = data
        return sign({
            userId: userId
        }, process.env.JWT_SALT, {
            expiresIn: "1d"
        });
    },

    hashData: (data) => {
        const salt = genSaltSync(10)
        let hash = hashSync(data, salt)
        console.log(hash);
        return hash
    },

    decodeToken: (token, callBack) => {
        if (!token) {
            callBack(null);
        }
        jwt.verify(token, jwtsalt, (err, decoded) => {
            console.log(err);
            if (err) {
                callBack(null)
            } else {
                callBack(decoded);
            }
        });
    },

}