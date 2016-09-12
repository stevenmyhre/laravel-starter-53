'use strict';

angular.module("globalErrors", ['angular-growl', 'ngAnimate'])
    .config(function(growlProvider, $provide, $httpProvider) {
        growlProvider.globalPosition('top-center');
        growlProvider.globalDisableIcons(true);
        growlProvider.globalDisableCountDown(true);

        $httpProvider.interceptors.push('myHttpInterceptor');
    })
    .factory("myHttpInterceptor",
        function ($q, $log, $location, $rootScope, growl, growlMessages, $filter) {
            var numLoading = 0;
            return {
                request: function (config) {
                    if (config.showLoader !== false) {
                        numLoading++;
                        $rootScope.loading = true;
                    }
                    return config || $q.when(config)
                },
                response: function (response) {
                    if (response.config.showLoader !== false) {
                        numLoading--;
                        $rootScope.loading = numLoading > 0;
                    }
                    var errs = $filter('filter')(growlMessages.getAllMessages(), { severity: 'error' });
                    if(errs.length) { // clear messages on next success XHR
                        for (var i = errs.length - 1; i >= 0; i--) {
                            errs[i].destroy();
                        }
                    }
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    //$log.debug("error with status " + rejection.status + " and data: " + rejection.data['message']);
                    numLoading--;
                    $rootScope.loading = numLoading > 0;
                    switch (rejection.status) {
                        case 401:
                            document.location = "/auth/login";
                            growl.error("You are not logged in!");
                            break;
                        case 403:
                            var msg = rejection.data.message ? ': ' + rejection.data.message : (rejection.data ? ': ' + rejection.data : null);
                            growl.error("You don't have the right to do this" + msg);
                            break;
                        case 0:
                            growl.error("No connection, internet is down?");
                            break;
                        default:
                            if (rejection.data && rejection.data['message']) {
                                var mes = rejection.data['message'];
                                if (rejection.data.errors) {
                                    for (var k in rejection.data.errors) {
                                        mes += "<br/>" + rejection.data.errors[k];
                                    }
                                }
                                growl.error("" + mes, {title: "Error"});
                            } else {
                                growl.error("There was an unknown error processing your request", {title: "Error"});
                            }
                            break;
                    }
                    return $q.reject(rejection);
                }
            };
        })
    // .factory("stacktraceService", function () {
    //     // "printStackTrace" is a global object.
    //     return ({
    //         fromError: StackTrace.fromError
    //     });
    // })
    // .provider("$exceptionHandler", {
    //     $get: function (errorLogService) {
    //         return ( errorLogService );
    //     }
    // })
    // .factory('errorLogService', function ($log, $window, ENDPOINT, stacktraceService) {
    //     var errorCount = 0;
    //     function log(exception, cause) {
    //         // Pass off the error to the default error handler
    //         // on the AngualrJS logger. This will output the
    //         // error to the console (and let the application
    //         // keep running normally for the user).
    //         $log.error.apply($log, arguments);
    //         // Now, we need to try and log the error the server.
    //
    //         try {
    //             var errorMessage = exception.toString();
    //             var logit = function (stacktrace) {
    //                 // Log the JavaScript error to the server.
    //                 if(errorCount++ < 50) {
    //                     $.ajax({
    //                         type: "POST",
    //                         url: ENDPOINT.url + '/error',
    //                         contentType: "application/json",
    //                         data: angular.toJson({
    //                             errorUrl: $window.location.href,
    //                             errorMessage: errorMessage,
    //                             stackTrace: stacktrace,
    //                             cause: ( cause || "" )
    //                         })
    //                     });
    //                 }
    //             };
    //             stacktraceService.fromError(exception)
    //                 .then(function (frames) {
    //                     var stringifiedStack = frames.map(function (sf) {
    //                         return sf.toString();
    //                     }).join('\n');
    //                     logit(stringifiedStack);
    //                 }).catch(function (err) {
    //                     console.log(err.message);
    //                 });
    //
    //         } catch (loggingError) {
    //             // For Developers - log the log-failure.
    //             $log.warn("Error logging failed");
    //             $log.log(loggingError);
    //         }
    //
    //     }
    //
    //     // Return the logging function.
    //     return ( log );
    // });