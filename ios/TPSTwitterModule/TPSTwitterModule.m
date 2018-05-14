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

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

@end
