var User = require('../models/user');   // get our mongoose User model
var q = require('q');  // q promise

var db_utilities = this;
module.exports = db_utilities; // I export its methods so i can use it like a library


//========= ERROR CODE ====== //
var ERR_DB_DUPLICATE_KEY = '11000';

/*
    function : addUser(user)
    Adds a user to the database
*/
this.addUser = function (user) {
    var deferred = q.defer();

    //TODO Implement this in mongoose Schema
    if (!user.password || user.password == "" || user.password.length < 4) {
        deferred.reject('la password deve avere almeno 4 caratteri');
        return deferred.promise;
    }
    if (!user.admin)
    { user.admin = false; }

    // creates a user that has to respect the mongoose Schema
    var generatedUser = new User(user);

    // save the sample user
    generatedUser.save()
        .then(function (user) {
            logger.debug('utente salvato ' + JSON.stringify(user));
            deferred.resolve(user);
        })
        .catch(function (err) {
            if (err.code == ERR_DB_DUPLICATE_KEY) {
                deferred.reject({
                    code: 'ERR_DB_DUPLICATE_KEY',
                    msg: 'questo utente esiste gia'
                });
            }
            else
            { logger.error('[addUser] errore salvataggio utente ' + err.errmsg); }
            deferred.reject(err.errmsg);
        });
    return deferred.promise;
}


