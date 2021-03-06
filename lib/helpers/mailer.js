/**
 * External dependencies.
 */
var Mailgun = require('mailgun-js');
var Promise = require('es6-promise').Promise;

/**
 * Configuration object
 */
var config = {
  mailer: require('./../config/mailer'),
  server: require('./../config/server')
};

/**
 * Initialize a mailgun object with the configuration
 */
var mailgun = new Mailgun(config.mailer);

/**
 * Send a mail to the given user
 * @param {Object} user
 * @param {Function} next
 * @api public
 */
exports.sendMail = function(user) {
  return new Promise(function(reject, resolve) {
    var mailToSend = {
      from: config.mailer.fromWho,
      to: user.email,
      subject: config.mailer.subject,
      html: '<h1>Your Token: ' + user.token + '</h1><a href="http://' +
      config.server.serverUrl +':' + config.server.port + '/users?token=' +
      user.token + '">Check our users here!</a>'
    };

    mailgun.messages().send(mailToSend, function(err, body) {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

