
'use strict';

import { NativeModules } from 'react-native'

const { TwitterLoginModule } = NativeModules

class TwitterModule  {
  init = (twitterCredentials) => (
     TwitterLoginModule.init(twitterCredentials)
  )
};

export default new TwitterModule();
