#import "TPSTwitterModule.h"
#import <TwitterKit/TwitterKit.h>
#import <Social/Social.h>
#import <React/RCTUtils.h>
#import "OAuthCore.h"

typedef void(^TWTAPIHandler)(NSData *data, NSError *error);
typedef void(^TWTRSessionHandler)(TWTRSession *session, NSError *error);

static NSString * const TPSTwitterConsumerKey = @"twitter_key";
static NSString * const TPSTwitterConsumerSecretKey = @"twitter_secret";

static NSString * const TPSTwitterAuthTokenKey = @"authToken";
static NSString * const TPSTwitterAuthTokenSecretKey = @"authTokenSecret";
static NSString * const TPSTwitterUserIDKey = @"userID";
static NSString * const TPSTwitterUserNameKey = @"userName";

static NSString * const TPSTwitterErrorDomainKey = @"errorDomain";
static NSString * const TPSTwitterErrorCodesKey = @"errorCodes";

static NSString * const TPSTwitterErrorDomain = @"com.tipsi.twitter";

static NSString * const TPSTwitterErrorCodeUnknownKey = @"unknown";
static NSString * const TPSTwitterErrorCodeLogInCanceledKey = @"logInCanceled";
static NSString * const TPSTwitterErrorCodeNoConsumerKey = @"noConsumerKey";
static NSString * const TPSTwitterErrorCodeNoConsumerSecretKey = @"noConsumerSecret";
static NSString * const TPSTwitterErrorCodeNoTwitterKeysKey = @"noTwitterKeys";
static NSString * const TPSTwitterErrorCodeNoAuthConfigurationKey = @"noAuthConfiguration";
static NSString * const TPSTwitterErrorCodeAccountPermissionDeniedKey = @"accountPermissionDenied";
static NSString * const TPSTwitterErrorCodeCannotLoadAccountKey = @"cannotLoadAccount";

typedef NS_ENUM(NSUInteger, TPSTwitterError) {
    TPSTwitterErrorUnknown,
    TPSTwitterErrorLogInCanceled,
    TPSTwitterErrorNoConsumerKey,
    TPSTwitterErrorNoConsumerSecret,
    TPSTwitterErrorNoTwitterKeys,
    TPSTwitterErrorNoAuthConfiguration,
    TPSTwitterErrorAccountPermissionDenied,
    TPSTwitterErrorCannotLoadAccount,
};

@interface TPSTwitterModule ()

@property (nonatomic, copy) NSString *consumerKey;
@property (nonatomic, copy) NSString *consumerSecret;

@end

@implementation TPSTwitterModule

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

- (NSDictionary *)constantsToExport {
    return @{
             TPSTwitterErrorDomainKey : TPSTwitterErrorDomain,
             TPSTwitterErrorCodesKey : @{
                     TPSTwitterErrorCodeUnknownKey : TPSTwitterErrorCodeUnknownKey,
                     TPSTwitterErrorCodeLogInCanceledKey : TPSTwitterErrorCodeLogInCanceledKey,
                     TPSTwitterErrorCodeNoConsumerKey : TPSTwitterErrorCodeNoConsumerKey,
                     TPSTwitterErrorCodeNoConsumerSecretKey : TPSTwitterErrorCodeNoConsumerSecretKey,
                     TPSTwitterErrorCodeNoTwitterKeysKey : TPSTwitterErrorCodeNoTwitterKeysKey,
                     TPSTwitterErrorCodeNoAuthConfigurationKey : TPSTwitterErrorCodeNoAuthConfigurationKey,
                     TPSTwitterErrorCodeAccountPermissionDeniedKey : TPSTwitterErrorCodeAccountPermissionDeniedKey,
                     TPSTwitterErrorCodeCannotLoadAccountKey : TPSTwitterErrorCodeCannotLoadAccountKey,
                     },
             };
};

- (NSDictionary *)errorCodesMap {
    return @{
             @(TPSTwitterErrorUnknown) : TPSTwitterErrorCodeUnknownKey,
             @(TPSTwitterErrorLogInCanceled) : TPSTwitterErrorCodeLogInCanceledKey,
             @(TPSTwitterErrorNoConsumerKey) : TPSTwitterErrorCodeNoConsumerKey,
             @(TPSTwitterErrorNoConsumerSecret) : TPSTwitterErrorCodeNoConsumerSecretKey,
             @(TPSTwitterErrorNoTwitterKeys) : TPSTwitterErrorCodeNoTwitterKeysKey,
             @(TPSTwitterErrorNoAuthConfiguration) : TPSTwitterErrorCodeNoAuthConfigurationKey,
             @(TPSTwitterErrorAccountPermissionDenied) : TPSTwitterErrorCodeAccountPermissionDeniedKey,
             @(TPSTwitterErrorCannotLoadAccount) : TPSTwitterErrorCodeCannotLoadAccountKey,
             };
}

RCT_EXPORT_METHOD(init:(NSDictionary*)twitterCredentials
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    NSString *consumerKey = twitterCredentials[TPSTwitterConsumerKey];
    NSString *consumerSecret = twitterCredentials[TPSTwitterConsumerSecretKey];
    if (consumerKey && consumerSecret) {
        self.consumerKey = consumerKey;
        self.consumerSecret = consumerSecret;
        [[Twitter sharedInstance] startWithConsumerKey:consumerKey consumerSecret:consumerSecret];
        // Nothing return to JS
        resolve(nil);
    } else if (!consumerKey && consumerSecret) {
        NSError *rejectError = [self buildErrorWithCode:TPSTwitterErrorNoConsumerKey localizedDescription:NSLocalizedString(@"Missing Twitter application's consumer key", nil)];
        reject([self buildErrorCodeForError:rejectError], rejectError.localizedDescription, rejectError);
    } else if (consumerKey && !consumerSecret) {
        NSError *rejectError = [self buildErrorWithCode:TPSTwitterErrorNoConsumerSecret localizedDescription:NSLocalizedString(@"Missing Twitter application's consumer secret", nil)];
        reject([self buildErrorCodeForError:rejectError], rejectError.localizedDescription, rejectError);
    } else {
        NSError *rejectError = [self buildErrorWithCode:TPSTwitterErrorNoTwitterKeys localizedDescription:NSLocalizedString(@"You should pass Twitter application's consumer key and secret", nil)];
        reject([self buildErrorCodeForError:rejectError], rejectError.localizedDescription, rejectError);
    }
}

RCT_EXPORT_METHOD(login:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    if (self.consumerKey && self.consumerSecret) {
        [[Twitter sharedInstance] logInWithCompletion:^(TWTRSession * _Nullable session, NSError * _Nullable error) {
            if (error) {
                NSError *rejectError = [self buildCannotLoadAccountErrorWithUnderlyingError:error];
                reject([self buildErrorCodeForError:rejectError], rejectError.localizedDescription, rejectError);
            } else {
                NSDictionary *result = @{
                                         TPSTwitterAuthTokenKey: session.authToken,
                                         TPSTwitterAuthTokenSecretKey: session.authTokenSecret,
                                         TPSTwitterUserIDKey: session.userID,
                                         TPSTwitterUserNameKey: session.userName
                                         };
                resolve(result);
            }
        }];
    } else {
        NSError *rejectError = [self buildErrorWithCode:TPSTwitterErrorNoAuthConfiguration localizedDescription:NSLocalizedString(@"Before call login you have to call init with Twitter application's consumer key and secret", nil)];
        reject([self buildErrorCodeForError:rejectError], rejectError.localizedDescription, rejectError);
    }

    /*
     -------------------------------------------------------------------------
     Use TWTRSessionStore instead of ACAccountStore.accounts
     When a user authorizes your app to use their account, Twitter Kit will save the session for you. After the first log in you can use Twitter.sharedInstance().sessionStore.session() to get the current authorized session rather than triggering a new log-in flow.
     
     Twitter.sharedInstance().sessionStore.hasLoggedInUsers() lets you test if there are any sessions in your app.
     --------------------------------------------------------------------------
     ACAccountStore *account = [[ACAccountStore alloc] init];
    ACAccountType *accountType = [account accountTypeWithAccountTypeIdentifier:ACAccountTypeIdentifierTwitter];
    
    __typeof__(self) __weak weakSelf = self;
    [account requestAccessToAccountsWithType:accountType options:nil completion:^(BOOL granted, NSError *error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (granted) {
                NSArray *accounts = [account accountsWithAccountType:accountType];
                if (accounts.count) {
                    NSString *title = nil;
                    UIAlertControllerStyle alertStyle = UIAlertControllerStyleActionSheet;
                    
                    if ([UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPad) {
                        title = @"Please choose your Twitter account";
                        alertStyle = UIAlertControllerStyleAlert;
                    }
                    
                    UIAlertController *alert = [UIAlertController alertControllerWithTitle:title message:nil preferredStyle:alertStyle];
                    
                    // Login With ACAccount Actions
                    for (ACAccount *account in accounts) {
                        void(^createSessionFromAccountHandler)(TWTRSession *, NSError *) = ^(TWTRSession *session, NSError *error) {
                            __strong typeof(self) strongSelf = weakSelf;
                            if (error) {
                                NSError *rejectError = [strongSelf buildCannotLoadAccountErrorWithUnderlyingError:error];
                                reject([strongSelf buildErrorCodeForError:rejectError], rejectError.localizedDescription, rejectError);
                            } else {
                                NSDictionary *result = @{
                                                         TPSTwitterAuthTokenKey: session.authToken,
                                                         TPSTwitterAuthTokenSecretKey: session.authTokenSecret,
                                                         TPSTwitterUserIDKey: session.userID,
                                                         TPSTwitterUserNameKey: session.userName
                                                         };
                                resolve(result);
                            }
                        };
                        void(^actionHandler)(UIAlertAction *) = ^(UIAlertAction *action) {
                            __strong typeof(self) strongSelf = weakSelf;
                            [strongSelf createSessionFromAccount:account withHandler:createSessionFromAccountHandler];
                        };
                        NSString *title = [NSString stringWithFormat:@"@%@", account.username];
                        UIAlertAction *action = [UIAlertAction
                                                 actionWithTitle:title
                                                 style:UIAlertActionStyleDefault
                                                 handler:actionHandler];
                        [alert addAction:action];
                    }
                    
                    // Login With Web Based Action
                    void(^webLoginActionHandler)(UIAlertAction *) = ^(UIAlertAction *action) {
                        __strong typeof(self) strongSelf = weakSelf;
                        [strongSelf webBasedLogin:resolve rejecter:reject];
                    };
                    UIAlertAction *webLoginAction = [UIAlertAction
                                                     actionWithTitle:NSLocalizedString(@"Log in as another user", nil)
                                                     style:UIAlertActionStyleDefault
                                                     handler:webLoginActionHandler];
                    [alert addAction:webLoginAction];
                    
                    // Cancel Action
                    void(^cancelActionHandler)(UIAlertAction *) = ^(UIAlertAction *action) {
                        __strong typeof(self) strongSelf = weakSelf;
                        NSError *rejectError = [strongSelf buildLogInCanceledErrorWithUnderlyingError:nil];
                        reject([strongSelf buildErrorCodeForError:rejectError], rejectError.localizedDescription, rejectError);
                    };
                    UIAlertAction *cancelAction = [UIAlertAction
                                                   actionWithTitle:NSLocalizedString(@"Cancel", nil)
                                                   style:UIAlertActionStyleCancel
                                                   handler:cancelActionHandler];
                    [alert addAction:cancelAction];
                    
                    [RCTPresentedViewController() presentViewController:alert animated:YES completion:nil];
                } else {
                    __strong typeof(self) strongSelf = weakSelf;
                    [strongSelf webBasedLogin:resolve rejecter:reject];
                }
            } else {
                __strong typeof(self) strongSelf = weakSelf;
                NSError *rejectError = [strongSelf buildAccountPermissionDeniedErrorWithUnderlyingError:error];
                reject([strongSelf buildErrorCodeForError:rejectError], rejectError.localizedDescription, rejectError);
            }
        });
    }];
    */
}

#pragma mark - NSError

- (NSError *)buildErrorWithCode:(NSInteger)code localizedDescription:(NSString *)localizedDescription {
    return [self buildErrorWithCode:code localizedDescription:localizedDescription underlyingError:nil];
}

- (NSError *)buildErrorWithCode:(NSInteger)code localizedDescription:(NSString *)localizedDescription underlyingError:(NSError *)underlyingError {
    NSMutableDictionary *userInfo = [[NSMutableDictionary alloc] init];

    if ([localizedDescription length]) {
        userInfo[NSLocalizedDescriptionKey] = localizedDescription;
    }
    if (underlyingError) {
        userInfo[NSUnderlyingErrorKey] = underlyingError;
    }

    return [NSError errorWithDomain:TPSTwitterErrorDomain code:code userInfo:userInfo];
}

- (NSError *)buildUnknownErrorWithUnderlyingError:(NSError *)underlyingError {
    return [self buildErrorWithCode:TPSTwitterErrorUnknown localizedDescription:NSLocalizedString(@"Unknown error", nil) underlyingError:underlyingError];
}

- (NSError *)buildLogInCanceledErrorWithUnderlyingError:(NSError *)underlyingError {
    return [self buildErrorWithCode:TPSTwitterErrorLogInCanceled localizedDescription:NSLocalizedString(@"User cancelled authentication", nil) underlyingError:underlyingError];
}

- (NSError *)buildAccountPermissionDeniedErrorWithUnderlyingError:(NSError *)underlyingError {
    return [self buildErrorWithCode:TPSTwitterErrorAccountPermissionDenied localizedDescription:NSLocalizedString(@"Account Permission Denied", nil) underlyingError:underlyingError];
}

- (NSError *)buildCannotLoadAccountErrorWithUnderlyingError:(NSError *)underlyingError {
    return [self buildErrorWithCode:TPSTwitterErrorCannotLoadAccount localizedDescription:NSLocalizedString(@"Can not Load Account", nil) underlyingError:underlyingError];
}

- (NSError *)buildErrorForTwitterKitError:(NSError *)twitterKitError {
    NSError *error = nil;

    if ([twitterKitError.domain isEqualToString:TWTRLogInErrorDomain]) {
        if (twitterKitError.code == TWTRLogInErrorCodeCancelled) {
            // log in canceled error
            error = [self buildLogInCanceledErrorWithUnderlyingError:twitterKitError];
        } else {
            // unknown error
            error = [self buildUnknownErrorWithUnderlyingError:twitterKitError];
        }
    } else {
        // unknown error
        error = [self buildUnknownErrorWithUnderlyingError:twitterKitError];
    }

    return error;
}

- (NSString *)buildErrorCodeForError:(NSError *)error {
    NSParameterAssert([error.domain isEqualToString:TPSTwitterErrorDomain]);

    NSString *errorCode = [self errorCodesMap][@(error.code)];

    NSAssert(errorCode != nil, @"Error code should be");

    return errorCode;
}

@end
