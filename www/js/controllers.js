// Generated by CoffeeScript 1.7.1
(function() {
  var atea;

  atea = angular.module('atea');

  atea.controller('RateController', [
    '$scope', '$location', 'baseURL', '$routeParams', 'connection', '$filter', '$compile', 'getData', '$http', 'loto', '$timeout', 'message', '$rootScope', '$history', function($scope, $location, baseURL, $routeParams, connection, $filter, $compile, getData, $http, loto, $timeout, message, $rootScope, $history) {
      connection.makeLoad({
        params: {
          resource: 'surveyQuestion',
          data: {
            survey_id: $routeParams.rateseId
          }
        },
        handler: function(data) {
          var tokes;
          $scope.fields = [];
          angular.forEach(data, function(field) {
            return $scope.fields.push(field);
          });
          $scope.fields = $filter('orderBy')($scope.fields, 'name');
          tokes = angular.element(document.querySelector("form[name='surveyForm'] ul"));
          return angular.forEach($scope.fields, function(field, i) {
            return tokes.append($compile("<survey-" + $scope.fields[i].type + " setting='fields[" + i + "]'></survey-" + $scope.fields[i].type + ">")($scope));
          });
        },
        scope: $scope,
        type: "noCache"
      });
      return $scope.submitSurveyQuestions = function() {
        var result;
        if ($scope.surveyForm.$valid) {
          message.open($scope.local.processing_data);
          result = [];
          angular.forEach($scope.fields, function(field, i) {
            var proto;
            proto = {};
            if (field.value) {
              if (field.type === "checkboxlist") {
                return angular.forEach(field.options, function(option) {
                  if (option.value) {
                    proto = {};
                    proto.answer_value = option.answer_value;
                    proto.survey_id = $routeParams.rateseId;
                    proto.question_id = field.id;
                    return result.push(proto);
                  }
                });
              } else {
                proto.answer_value = field.value;
                proto.survey_id = $routeParams.rateseId;
                proto.question_id = field.id;
                return result.push(proto);
              }
            }
          });
          if (result.length && $scope.surveyForm.$valid) {
            return getData.save({
              resource: 'surveyAnswer'
            }, {
              data: {
                records: result
              }
            }, function(result) {
              return message.open($scope.local.form_saved, function() {
                if ($scope.event.tokensActive) {
                  message.open($scope.local.form_token);
                  return getData.put({
                    resource: 'participant'
                  }, {
                    data: {
                      id: $scope.participient.id,
                      extraParam: {
                        addTokens: 'passageSurvey',
                        survey_id: $routeParams.rateseId
                      }
                    }
                  }, function(result) {
                    var data, tokens;
                    data = result.data;
                    if (data.success) {
                      tokens = data.message.receivedTokens;
                      $rootScope.updateTokens();
                      return loto.run(tokens, function() {
                        return message.noClose($scope.polyglot.t("tokens_add", ~~tokens), function() {
                          return void 0;
                        }, function() {
                          if ($scope.contentAnimate !== $scope.animationContentRight) {
                            $scope.contentAnimate = $scope.animationContentRight;
                          }
                          $timeout(function() {
                            return $history.back();
                          }, 100);
                          return loto.number = null;
                        });
                      });
                    } else {
                      return message.noClose($scope.local.error_server, function() {
                        if ($scope.contentAnimate !== $scope.animationContentRight) {
                          $scope.contentAnimate = $scope.animationContentRight;
                        }
                        $timeout(function() {
                          return $history.back();
                        }, 100);
                        return loto.number = null;
                      });
                    }
                  });
                } else {
                  return message.authoClose($scope.local.form_saved, function() {
                    return void 0;
                  }, function() {
                    if ($scope.contentAnimate !== $scope.animationContentRight) {
                      $scope.contentAnimate = $scope.animationContentRight;
                    }
                    $timeout(function() {
                      return $history.back();
                    }, 100);
                    return loto.number = null;
                  });
                }
              });
            }, function(error) {
              return message.noClose($scope.local.no_connection);
            });
          } else {
            return message.noClose($scope.local.form_fill);
          }
        } else {
          return message.odinAndClose($scope.local.form_error1);
        }
      };
    }
  ]);

  atea.controller('RatesController', [
    '$scope', '$location', 'baseURL', '$routeParams', 'connection', '$rootScope', '$timeout', 'message', '$history', function($scope, $location, baseURL, $routeParams, connection, $rootScope, $timeout, message, $history) {
      return connection.makeLoad({
        params: {
          resource: 'survey',
          data: {
            event_id: $routeParams.feedId
          }
        },
        handler: function(data) {
          if (!data.success) {
            $scope.surveys = [];
            angular.forEach(data, function(survey) {
              return $scope.surveys.push(survey);
            });
            if (!$scope.surveys.length) {
              return message.authoClose($scope.local.no_surveys, function() {
                return $history.back();
              });
            }
          } else {
            return message.authoClose($scope.local.no_surveys, function() {
              return $history.back();
            });
          }
        },
        scope: $scope,
        type: "noCache"
      });
    }
  ]);

  atea.controller('ScheduleController', [
    '$scope', '$location', 'baseURL', '$routeParams', 'getData', '$http', '$rootScope', 'connection', function($scope, $location, baseURL, $routeParams, getData, $http, $rootScope, connection) {
      $rootScope.survey = null;
      return connection.makeLoad({
        params: {
          resource: 'activity',
          id: $routeParams.scheduleId
        },
        handler: function(data) {
          $scope.schedule = data;
          if ($scope.schedule.survey_id !== "0") {
            return getData.noCache({
              resource: 'survey',
              id: $scope.schedule.survey_id
            }, function(result) {
              return $rootScope.survey = result.data;
            });
          }
        },
        scope: $scope,
        type: "noCache"
      });
    }
  ]);

  atea.controller('SchedulesController', [
    '$scope', '$location', '$routeParams', 'getData', '$filter', '$http', '$rootScope', 'connection', 'message', function($scope, $location, $routeParams, getData, $filter, $http, $rootScope, connection, message) {
      var getSchedules;
      getSchedules = function(data) {
        var dayyy, oldData, ressuulltt, timeee;
        oldData = data;
        ressuulltt = [];
        data = [];
        dayyy = [];
        timeee = [];
        angular.forEach(oldData, function(ths) {
          return data.push(ths);
        });
        data = $filter('orderBy')(data, '+start_time');
        angular.forEach(data, function(ths, i, data) {
          var date, dateNext, day, dayNext, month, monthNext, n;
          date = new Date(ths.start_time * 1000);
          day = date.getDate();
          month = date.getMonth();
          if (data[i + 1]) {
            n = 1;
          } else {
            n = -1;
          }
          dateNext = new Date(data[i + n].start_time * 1000);
          dayNext = dateNext.getDate();
          monthNext = dateNext.getMonth();
          if (ths.start_time === data[i + n].start_time && i !== data.length - 1) {
            timeee.push(ths);
          } else {
            timeee.push(ths);
            dayyy.push(timeee);
            timeee = [];
          }
          if (!(day === dayNext && month === monthNext) || i === data.length - 1) {
            ressuulltt.push(dayyy);
            return dayyy = [];
          }
        });
        return $scope.schedules = ressuulltt;
      };
      return connection.makeLoad({
        params: {
          resource: "activity",
          data: "{'event_id': " + $routeParams.feedId + "}"
        },
        handler: getSchedules,
        scope: $scope,
        type: "noCache"
      });
    }
  ]);

  atea.controller('CommentController', [
    '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', '$http', '$timeout', 'connection', 'message', 'getData', '$history', function($scope, $location, baseURL, $routeParams, $rootScope, $http, $timeout, connection, message, getData, $history) {
      connection.makeLoad({
        params: {
          resource: 'leadType'
        },
        handler: function(data) {
          $scope.categories = [];
          return angular.forEach(data, function(ths) {
            return $scope.categories.push(ths);
          });
        },
        scope: $scope,
        type: "noCache"
      });
      if (!$scope.commentLead) {
        $scope.commentLead = {
          lead_type_id: "",
          interest: "5",
          revenue: "5",
          method: "save"
        };
      }
      $scope.commentLead.categorieSingle = $scope.local.select_category;
      return $scope.submit = function() {
        var data;
        if ($scope.commentLead.lead_type_id) {
          message.open($scope.local.data_sending);
          if ($scope.commentLead.method === "save") {
            data = {
              participant_id: $scope.participantScan.id,
              event_id: $scope.event.id,
              lead_type_id: $scope.commentLead.lead_type_id,
              interest: $scope.commentLead.interest,
              revenue: $scope.commentLead.revenue,
              comment: $scope.commentLead.comment
            };
            return getData.save({
              resource: 'partnerLead'
            }, {
              data: data
            }, function(result) {
              data = result.data;
              message.authoClose($scope.local.lead_sent);
              if ($scope.contentAnimate !== $scope.animationContentRight) {
                $scope.contentAnimate = $scope.animationContentRight;
              }
              return $timeout(function() {
                return $location.path($history.back());
              }, 100);
            }, function() {
              return message.noClose($scope.local.error_server);
            });
          } else if ($scope.commentLead.method === "put") {
            data = {
              id: $scope.commentLead.id,
              lead_type_id: $scope.commentLead.lead_type_id,
              interest: $scope.commentLead.interest,
              revenue: $scope.commentLead.revenue,
              comment: $scope.commentLead.comment
            };
            return getData.put({
              resource: 'partnerLead'
            }, {
              data: data
            }, function(result) {
              data = result.data;
              message.authoClose($scope.local.lead_sent);
              if ($scope.contentAnimate !== $scope.animationContentRight) {
                $scope.contentAnimate = $scope.animationContentRight;
              }
              return $timeout(function() {
                return $location.path($history.back());
              }, 100);
            }, function() {
              return message.noClose($scope.local.error_server);
            });
          }
        } else {
          return message.odinAndClose($scope.local.select_category);
        }
      };
    }
  ]);

  atea.controller('PartnerController', [
    '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', 'connection', 'getData', '$http', 'message', function($scope, $location, baseURL, $routeParams, $rootScope, connection, getData, $http, message) {
      connection.makeLoad({
        params: {
          resource: 'partnerCompany',
          id: $routeParams.partnerId
        },
        handler: function(data) {
          return $scope.partner = data;
        },
        scope: $scope,
        type: "get"
      });
      return $scope.submitQuestion = function() {
        if ($scope.questionToPartner) {
          message.open($scope.local.processing_data);
          return getData.save({
            resource: 'partnerMessage'
          }, {
            data: {
              event_id: $routeParams.feedId,
              message: $scope.questionToPartner,
              partner_company_id: $scope.partner.id
            }
          }, function(result) {
            message.authoClose($scope.local.quest_sent);
            $scope.questionToPartner = "";
            return $scope.invalid = false;
          }, function(error) {
            return message.noClose($scope.local.no_connection);
          });
        } else if ($scope.partnerForm) {
          return message.odinAndClose($scope.local.quest_error);
        } else {
          message.odinAndClose($scope.local.fill_input);
          return $scope.invalid = true;
        }
      };
    }
  ]);

  atea.controller('PartnersController', [
    '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', '$http', '$filter', 'getData', 'connection', function($scope, $location, baseURL, $routeParams, $rootScope, $http, $filter, getData, connection) {
      var getPartners;
      getPartners = function(data) {
        var partners;
        partners = [];
        angular.forEach(data, function(partner) {
          partner.rating = ~~partner.rating;
          return partners.push(partner);
        });
        return $scope.partners = $filter('orderBy')(partners, "+rating");
      };
      return connection.makeLoad({
        params: {
          resource: 'partnerCompany',
          data: "{extraParam: {'event_id': " + $routeParams.feedId + "}}"
        },
        handler: getPartners,
        scope: $scope,
        type: "get"
      });
    }
  ]);

  atea.controller('GuestController', [
    '$scope', '$window', '$location', 'baseURL', '$routeParams', '$rootScope', 'client', 'getData', 'connection', 'loto', 'message', function($scope, $window, $location, baseURL, $routeParams, $rootScope, client, getData, connection, loto, message) {
      return $scope.scanActivator = function() {
        return cordova.plugins.barcodeScanner.scan(function(result) {
          if (!result.cancelled) {
            message.open($scope.local.check_scan);
          }
          return getData.noCache({
            resource: 'member',
            data: {
              extraParam: {
                barcode: result.text
              }
            }
          }, function(result) {
            var data;
            data = result.data;
            if (data.success) {
              return message.noClose($scope.local.error_scaning);
            } else {
              return getData.noCache({
                resource: 'participant',
                data: {
                  event_id: $scope.event.id,
                  member_id: data.id,
                  extraParam: "globalSearch"
                }
              }, function(result) {
                data = result.data;
                $rootScope.participantScan = null;
                angular.forEach(data, function(part) {
                  return $rootScope.participantScan = part;
                });
                if ($rootScope.participantScan.id !== $scope.participient.id) {
                  if ($rootScope.participantScan.event_id === $scope.event.id) {
                    return getData.noCache({
                      resource: 'partnerLead',
                      data: {
                        event_id: $scope.event.id,
                        participant_id: $rootScope.participantScan.id
                      }
                    }, function(result) {
                      data = result.data;
                      $rootScope.commentLead = null;
                      if (data.success === "false") {
                        message.close();
                        $location.path($routeParams.feedId + baseURL.COMMENTPAGEHREF);
                        return $scope.$apply();
                      } else {
                        angular.forEach(data, function(comment) {
                          return $rootScope.commentLead = comment;
                        });
                        $rootScope.commentLead.method = "put";
                        message.close();
                        $location.path($routeParams.feedId + baseURL.COMMENTPAGEHREF);
                        return $scope.$apply();
                      }
                    });
                  } else {
                    return message.noClose($scope.local.scan_error2);
                  }
                } else {
                  return message.noClose($scope.local.scan_warning1);
                }
              });
            }
          });
        });
      };
    }
  ]);

  atea.controller('EventsController', [
    '$scope', '$filter', 'baseURL', '$location', '$rootScope', '$routeParams', 'connection', 'client', function($scope, $filter, baseURL, $location, $rootScope, $routeParams, connection, client) {
      $rootScope.event = null;
      return $rootScope.updateEvents();
    }
  ]);

  atea.controller('ProfileController', [
    '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', 'connection', 'getData', function($scope, $location, baseURL, $routeParams, $rootScope, connection, getData) {
      return $scope.dyna.tokens_val = $scope.polyglot.t("tokens_val", ~~$scope.participient.tokens);
    }
  ]);

  atea.controller('MainController', [
    '$scope', '$location', 'baseURL', '$rootScope', '$routeParams', '$timeout', '$window', 'client', '$route', '$filter', 'getData', 'connection', 'loto', 'COMPANY_ID', 'local', 'message', '$sce', '$history', function($scope, $location, baseURL, $rootScope, $routeParams, $timeout, $window, client, $route, $filter, getData, connection, loto, COMPANY_ID, local, message, $sce, $history) {
      var contentBlock, leftMenu;
      $scope.local = local["static"];
      $scope.dyna = {};
      $scope.polyglot = local.dynamic;
      $scope.noConnectionMessage = $scope.local.page_nointernet;
      $rootScope.updateTokens = function() {
        return getData.noCache({
          resource: 'participant',
          data: {
            event_id: $rootScope.event.id
          }
        }, function(result) {
          var data;
          data = result.data;
          return angular.forEach(data, function(participant) {
            if (participant.event_id === $rootScope.event.id) {
              $scope.participient = participant;
              return $scope.dyna.tokens_val = $scope.polyglot.t("tokens_val", ~~participant.tokens);
            }
          });
        });
      };
      $rootScope.updateEvents = function() {
        var getEvents;
        $scope.futureEvents = [];
        $scope.pastEvents = [];
        getEvents = function(data) {
          var now;
          $rootScope.events = data;
          now = (new Date()).getTime() / 1000;
          angular.forEach($rootScope.events, function(event) {
            if (event.ical_end > now) {
              return $scope.futureEvents.push(event);
            } else {
              return $scope.pastEvents.push(event);
            }
          });
          $scope.pastEvents = $filter('orderBy')($scope.pastEvents, '+ical_start');
          return $scope.futureEvents = $filter('orderBy')($scope.futureEvents, '+ical_start');
        };
        return connection.makeLoad({
          params: {
            resource: 'event',
            data: {
              account_id: COMPANY_ID
            }
          },
          handler: getEvents,
          scope: $scope,
          type: "noCache"
        });
      };
      $scope.$on('$locationChangeStart', function() {
        return $history.add($location.$$path);
      });
      $scope.$on('$routeChangeSuccess', function(ev, ls) {
        var path;
        path = $location.$$path;
        if ($rootScope.event && path === baseURL.FEEDS) {
          $rootScope.event = null;
          $scope.participient = null;
        }
        if (!$rootScope.event && path !== baseURL.FEEDS && path !== baseURL.LOGIN) {
          $rootScope.backButton = true;
          connection.makeLoad({
            params: {
              resource: 'event',
              id: $routeParams.feedId
            },
            handler: function(data) {
              $rootScope.event = data;
              if ($rootScope.user) {
                return getData.noCache({
                  resource: 'participant',
                  data: {
                    event_id: $rootScope.event.id
                  }
                }, function(result) {
                  data = result.data;
                  return angular.forEach(data, function(participant) {
                    if (participant.event_id === $rootScope.event.id) {
                      $scope.participient = participant;
                      return $scope.dyna.tokens_val = $scope.polyglot.t("tokens_val", ~~participant.tokens);
                    }
                  });
                });
              }
            },
            scope: $scope,
            type: "noCache"
          });
        }
        if (path === baseURL.LOGIN) {
          $rootScope.forgot = true;
        } else {
          $rootScope.forgot = false;
        }
        if (path !== baseURL.FEEDS) {
          $scope.backButton = true;
        } else if ($scope.backButton) {
          $scope.backButton = false;
        }
        if (path === baseURL.PROFILE) {
          return $scope.edit = true;
        } else if ($scope.edit) {
          return $scope.edit = false;
        }
      });
      $scope.pastEventsCollapseder = function() {
        if ($scope.pastEventsCollapsed) {
          $scope.pastEventsCollapsed = false;
          return $scope.futureEventsCollapsed = true;
        } else {
          $scope.pastEventsCollapsed = true;
          return $scope.futureEventsCollapsed = true;
        }
      };
      $scope.futureEventsCollapseder = function() {
        if (!$scope.futureEventsCollapsed) {
          $scope.pastEventsCollapsed = false;
          return $scope.futureEventsCollapsed = true;
        } else {
          $scope.pastEventsCollapsed = false;
          return $scope.futureEventsCollapsed = false;
        }
      };
      leftMenu = document.querySelector(".pushy-left");
      contentBlock = document.querySelector(".push-page");
      $scope.leftMenuBlur = function($event) {
        if ($event.stopPropagation) {
          $event.stopPropagation();
        }
        leftMenu.classList.remove("pushy-open");
        return contentBlock.classList.remove("container-push");
      };
      $scope.leftMenuActivator = function($event) {
        if ($event.stopPropagation) {
          $event.stopPropagation();
        }
        leftMenu.classList.add("pushy-open");
        return contentBlock.classList.add("container-push");
      };
      $scope.logoMainAnimateClass = {};
      $scope.logoMainAnimateClass[client.animationClass.logo] = $scope.logoSize;
      $scope.$watch('event', function(data) {
        return $scope.logoMainAnimateClass[client.animationClass.logo] = data;
      });
      $scope.animationContentLeft = client.animationClass.content.left;
      $scope.animationContentRight = client.animationClass.content.right;
      $scope.leftMenuAnimationType = client.animationClass.leftMenu;
      $scope.nextLocation = function(path, desc, data) {
        $rootScope[desc] = data;
        if ($scope.contentAnimate !== $scope.animationContentLeft) {
          $scope.contentAnimate = $scope.animationContentLeft;
        }
        return $timeout(function() {
          return $location.path(path);
        }, 100);
      };
      $scope.backLocation = function(path) {
        if ($scope.contentAnimate !== $scope.animationContentRight) {
          $scope.contentAnimate = $scope.animationContentRight;
        }
        return $timeout(function() {
          return $location.path(path);
        }, 100);
      };
      $scope.backHistory = function() {
        if ($scope.contentAnimate !== $scope.animationContentRight) {
          $scope.contentAnimate = $scope.animationContentRight;
        }
        return $timeout(function() {
          return $history.back();
        }, 100);
      };
      $scope.changeEvent = function(path, event) {
        $rootScope.event = event;
        if ($rootScope.user) {
          getData.noCache({
            resource: 'participant',
            data: {
              event_id: $rootScope.event.id
            }
          }, function(result) {
            var data;
            data = result.data;
            return angular.forEach(data, function(participant) {
              if (participant.event_id === $rootScope.event.id) {
                $scope.participient = participant;
                if ($scope.event.tokensActive && $scope.participient.is_first_visit === "1") {
                  message.open($scope.local.first_login);
                  return getData.put({
                    resource: 'participant'
                  }, {
                    data: {
                      id: $scope.participient.id,
                      extraParam: {
                        addTokens: 'firstLogin'
                      }
                    }
                  }, function(result) {
                    var tokens;
                    data = result.data;
                    tokens = data.message.receivedTokens;
                    $rootScope.updateTokens();
                    return loto.run(tokens, function() {
                      return message.noClose($scope.polyglot.t("tokens_add", ~~tokens));
                    });
                  });
                }
              }
            });
          });
        }
        return $scope.nextLocation(path);
      };
      $scope.logOut = function() {
        client.user.logOut();
        $rootScope.user = null;
        $rootScope.participient = null;
        if ($location.$$path !== baseURL.FEEDS) {
          connection.makeLoad({
            params: {
              resource: 'event',
              id: $rootScope.event.id
            },
            handler: function(data) {
              if ($rootScope.user && $rootScope.event) {
                connection.makeLoad({
                  params: {
                    resource: 'participant',
                    data: {
                      data: {
                        event_id: $rootScope.event.id
                      }
                    }
                  },
                  handler: function(data) {
                    return angular.forEach(data, function(participant) {
                      return $rootScope.participient = participant;
                    });
                  },
                  scope: $scope,
                  type: "noCache"
                });
              }
              return $rootScope.event = data;
            },
            scope: $scope,
            type: "noCache"
          });
        }
        $scope.pastEvents = $scope.futureEvents = null;
        $rootScope.updateEvents();
        return $location.path(baseURL.FEEDS);
      };
      $scope.toDifferentUrl = function(url) {
        return $window.open(url, '_system');
      };
      document.addEventListener("deviceready", function() {
        return document.addEventListener('backbutton', function() {
          if ($location.$$path !== baseURL.FEEDS) {
            if ($scope.contentAnimate !== $scope.animationContentRight) {
              $scope.contentAnimate = $scope.animationContentRight;
            }
            return $timeout(function() {
              return $history.back();
            }, 100);
          } else {
            return navigator.app.exitApp();
          }
        }, true);
      });
      $rootScope.user = client.user.detail;
      $scope.share = "http%3A%2F%2Fwww%2Eatea%2Eno%2Fhovedmeny%2Fatea-community-2014%2F";
      $scope.toComment = function() {
        return $location.path($routeParams.feedId + baseURL.COMMENTPAGEHREF);
      };
      return $scope.renderHtml = function(html) {
        return $sce.trustAsHtml(html);
      };
    }
  ]);

  atea.controller('LoginController', [
    '$scope', '$http', '$rootScope', '$location', 'baseURL', '$routeParams', '$timeout', 'client', 'connection', 'message', '$history', 'Auth', function($scope, $http, $rootScope, $location, baseURL, $routeParams, $timeout, client, connection, message, $history, Auth) {
      $scope.go_submit = function() {
        if ($scope.auth.$dirty && $scope.auth.$valid) {
          message.open($scope.local.log_in);
          return client.user.login($scope.auth.username, $scope.auth.password).then(function(data) {
            $rootScope.user = data;
            return message.authoClose($scope.polyglot.t("login_message", {
              name: data.first_name
            }), function() {
              if ($rootScope.event) {
                connection.makeLoad({
                  params: {
                    resource: 'event',
                    id: $rootScope.event.id
                  },
                  handler: function(data) {
                    $rootScope.event = data;
                    return connection.makeLoad({
                      params: {
                        resource: 'participant',
                        data: {
                          data: {
                            event_id: $rootScope.event.id
                          }
                        }
                      },
                      handler: function(data) {
                        return angular.forEach(data, function(participant) {
                          return $rootScope.participient = participant;
                        });
                      },
                      scope: $scope,
                      type: "noCache"
                    });
                  },
                  scope: $scope,
                  type: "noCache"
                });
              }
              if ($scope.contentAnimate !== $scope.animationContentRight) {
                $scope.contentAnimate = $scope.animationContentRight;
              }
              return $history.back();
            });
          }, function(error) {
            if (error.status === 401) {
              message.odinAndClose($scope.local.user_exist);
              $rootScope.user = null;
            } else {
              message.odinAndClose($scope.local.no_connection);
            }
            return Auth.clearCredentials();
          });
        } else {
          return message.odinAndClose($scope.local.incorrect_credentials);
        }
      };
      return $scope.pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    }
  ]);

}).call(this);
