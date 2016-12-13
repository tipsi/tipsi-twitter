
'use strict';

const TwitterLoginModule = require('react-native').NativeModules.TwitterLoginModule;

module.exports = {

  init(twitterCredentials: object): Promise<any> {
    return TwitterLoginModule.init(twitterCredentials);
  },

};
