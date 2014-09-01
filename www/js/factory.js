// Generated by CoffeeScript 1.7.1
(function() {
  var atea;

  atea = angular.module('atea');

  atea.factory('getData', [
    '$resource', function($resource) {
      return $resource("http://188.226.184.59/congressomulti/api/:resource/:id", {}, {
        get: {
          method: "GET",
          cache: true
        },
        noCache: {
          method: "GET",
          cache: false
        },
        save: {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        },
        put: {
          method: "PUT",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }
      });
    }
  ]);

  atea.factory("$history", function($location) {
    var $history, self;
    self = this;
    this.history = [];
    $history = this.history;
    this.history.add = function(path) {
      return $history.push(path);
    };
    this.history.back = function() {
      $location.path($history[$history.length - 2]);
      return $history.length = $history.length - 2;
    };
    return this.history;
  });

  atea.config(function(localProvider) {
    return localProvider.lang = navigator.language === "hu" ? "hu" : "en";
  });

  atea.factory('client', [
    '$location', 'Auth', 'getData', '$q', 'storage', function($location, Auth, getData, $q, storage) {
      var self;
      self = this;
      this.path = $location.$$path;
      this.lastPath = this.path;
      this.navigator = /[W-w]indows [P-p]hone/.test(window.navigator.userAgent) ? 'Windows Phone' : void 0;
      this.animationClass = (function() {
        if (self.navigator === 'Windows Phone') {
          return {
            content: {
              left: 'hard-left',
              right: 'hard-right'
            },
            logo: 'hard',
            leftMenu: 'hard'
          };
        } else {
          return {
            content: {
              left: 'hard-left',
              right: 'hard-right'
            },
            logo: 'hard',
            leftMenu: 'hard'
          };
        }
      })();
      this.user = {
        detail: (function() {
          var user;
          if (storage.getObject('user')) {
            user = storage.getObject('user');
            if (user.version === "1.0.0") {
              Auth.setCredentials(user.email, user.password);
              return user;
            } else {
              storage["delete"]('user');
              Auth.clearCredentials();
              return null;
            }
          } else {
            return null;
          }
        })(),
        login: function(username, password) {
          var defer;
          defer = $q.defer();
          Auth.setCredentials(username, password);
          getData.noCache({
            resource: "login"
          }, function(result) {
            var data;
            data = result.data;
            self.user.detail = data;
            data.password = password;
            data.version = "1.0.0";
            storage.setObject('user', data);
            return defer.resolve(data);
          }, function(error) {
            return defer.reject(error);
          });
          return defer.promise;
        },
        logOut: function() {
          storage["delete"]('user');
          Auth.clearCredentials();
          return self.detail = null;
        }
      };
      return this;
    }
  ]);

  atea.factory('storage', [
    '$window', function($window) {
      this.setObject = function(name, object) {
        return $window.localStorage.setItem(name, $window.JSON.stringify(object));
      };
      this.getObject = function(name) {
        return $window.JSON.parse($window.localStorage.getItem(name));
      };
      this["delete"] = function(name) {
        return $window.localStorage.removeItem(name);
      };
      return this;
    }
  ]);

  atea.factory('connection', [
    'getData', function(getData) {
      var connection;
      return connection = {
        makeLoad: function(property) {
          var f, prop, value;
          for (prop in property) {
            value = property[prop];
            connection[prop] = property[prop];
          }
          property.scope.loader = true;
          property.scope.loading = true;
          property.scope.update = true;
          f = function() {
            var data;
            property.scope.warning = false;
            data = property.data ? property.data : {};
            return getData[connection.type](connection.params, data, function(result) {
              data = result.data;
              property.handler(data);
              property.scope.loading = false;
              property.scope.loader = false;
              return property.scope.update = false;
            }, function(error) {
              if (!property.scope.f) {
                property.scope.f = f;
              }
              property.scope.loading = false;
              property.scope.warning = true;
              return property.scope.update = false;
            });
          };
          return f();
        }
      };
    }
  ]);

  atea.factory("loto", function() {
    var loto;
    return loto = {
      run: function(number, fn) {
        var i, _i, _ref;
        if (typeof number === "number") {
          number = number.toString();
        }
        loto.afterFn = fn;
        if (number.length > loto.length.length) {
          loto.length = (function() {
            var _i, _ref, _results;
            _results = [];
            for (i = _i = 0, _ref = number.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
              _results.push(i);
            }
            return _results;
          })();
        } else {
          for (i = _i = 0, _ref = loto.length.length - number.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            number = "0" + number;
          }
        }
        return loto.number = number;
      },
      length: [0, 1, 2],
      krugi: 2,
      speed: 1000,
      frames: 16,
      height: 105,
      _count: 0
    };
  });

  atea.run(function($timeout, message) {});

  atea.factory("message", function($timeout, $animate) {
    var message, timeout;
    timeout = 2000;
    return message = {
      odinAndClose: function(text, callback1, callback2) {
        message._close = true;
        message._callback1 = callback1;
        message._callback2 = callback2;
        message.text = text;
        return $animate.removeClass(message._element, "ng-hide", function() {
          if (message._callback1) {
            message._callback1();
            return message._callback1 = null;
          }
        });
      },
      authoClose: function(text, callback1, callback2) {
        message._close = true;
        message._callback1 = callback1;
        message._callback2 = callback2;
        message.text = text;
        return $animate.removeClass(message._element, "ng-hide", function() {
          if (message._callback1) {
            message._callback1();
            message._callback1 = null;
          }
          return $timeout(function() {
            return $animate.addClass(message._element, "ng-hide", function() {
              if (message._callback2) {
                message._callback2();
                return message._callback2 = null;
              }
            });
          }, timeout);
        });
      },
      open: function(text, callback1) {
        message._close = false;
        message._callback1 = callback1;
        message.text = text;
        return $animate.removeClass(message._element, "ng-hide", function() {
          if (message._callback1) {
            message._callback1();
            return message._callback1 = null;
          }
        });
      },
      noClose: function(text, callback1, callback2) {
        message._close = true;
        message._callback2 = callback2;
        message.text = text;
        if (callback1) {
          return callback1();
        }
      },
      close: function() {
        return $animate.addClass(message._element, "ng-hide", function() {
          if (message._callback2) {
            message._callback2();
            return message._callback2 = null;
          }
        });
      }
    };
  });

  atea.filter('dayMonth', function(local) {
    return function(date) {
      var day, month, months;
      if (date) {
        months = local["static"].months;
        date = new Date(date * 1000);
        day = date.getDate();
        month = date.getMonth();
        return day + '. ' + months[month].toLowerCase();
      }
    };
  });

  atea.filter('hourMinute', function() {
    return function(date) {
      var hour, minute;
      if (date) {
        date = new Date(date * 1000);
        hour = date.getHours().toString();
        minute = date.getMinutes().toString();
        hour = hour.length === 1 ? '0' + hour : hour;
        minute = minute.length === 1 ? '0' + minute : minute;
        return hour + ':' + minute;
      }
    };
  });

  atea.filter('fullDate', function(local) {
    return function(date) {
      var day, month, months, w, y;
      if (date) {
        w = local["static"].days;
        months = local["static"].months;
        date = new Date(date * 1000);
        day = date.getDay();
        month = date.getMonth();
        y = date.getFullYear();
        return w[day] + ' ' + day + '. ' + months[month].toLowerCase() + ' ' + y;
      }
    };
  });

}).call(this);
