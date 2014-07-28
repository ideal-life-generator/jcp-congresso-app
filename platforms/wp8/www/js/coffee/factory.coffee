atea = angular.module 'atea'

atea.factory 'getDataTest', [ '$resource', ($resource) ->
	# $resource "http://188.226.184.59/congressomulti/api/:resource/:id", { },
	$resource "http://dev.congressomulti-loc.no/api/:resource/:id", { },
		get: method: "GET", cache: true
		noCache: method: "GET", cache: false
		save: method: "POST", headers: 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		put: method: "PUT", headers: 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
]

atea.factory 'message', [ '$timeout', '$q', ($timeout, $q) ->
	elementDuration = parseFloat window.getComputedStyle(document.querySelector('message')).transitionDuration
	duration = elementDuration * 1000
	timeAfter = 300
	data =
	close: ->
		defer = $q.defer()
		if data.makeFastClose
			data.afterFn()
			data.makeFastClose = false
			data.fastClose = true
		if data.makeClose
			data.class = 'display'
			$timeout ->
				delete data.class
				delete data.message
				defer.resolve()
			, duration + timeAfter
		if data.fastTClose
			delete data.class
		promise = defer.promise
	wait: (message) ->
		data.start = (new Date).getTime()
		data.message = message
		data.class = 'wait'
	warning: (message) ->
		data.makeClose = true
		data.message = message
		data.class = 'wait'
	warningClose: (message, afterFn) ->
		data.warning message
		$timeout ->
			data.fastTClose = true
			data.close()
			data.fastTClose = false
		, duration + timeAfter * 3
	warningAfter: (message) ->
		defer = $q.defer()
		equal = (new Date).getTime() - data.start
		if data.start and equal < duration + timeAfter
			$timeout ->
				data.warning message
				defer.resolve()
			, duration + timeAfter - equal
		else
			data.warning message
			defer.resolve()
		defer.promise
	success: (message, afterFn) ->
		promise = data.warningAfter message
		if afterFn
			data.afterFn = afterFn
			promise.then ->
				data.makeFastClose = true
				if not data.fastClose
					$timeout ->
						if not data.fastClose
							data.makeFastClose = false
							promiseCloser = data.close()
							promiseCloser.then ->
								afterFn()
							data.fastClose = false
					, duration + timeAfter * 3
]

atea.run [ 'message', '$timeout', (message, $timeout) ->
	# $timeout ->
	# 	message.warning 'Предупреждение.'
	# , 1000
	# $timeout ->
	# 	message.wait "Подождите пожалуйста."
	# 	$timeout ->
	# 		 message.warningAfter 'Ошибка с поздним негативным результатом.'
	# 	, 600
	# , 1000
	# $timeout ->
	# 	message.wait "Подождите пожалуйста."
	# 	$timeout ->
	# 		message.success 'Обработка результата с задержкой прошла удачно', -> console.log 'END'
	# 	, 600
	# , 1000
	# $timeout ->
	# 	message.wait "Подождите пожалуйста."
	# 	$timeout ->
	# 		message.success 'Обработка результата с задержкой прошла удачно', -> console.log 'END'
	# 	, 600
	# , 10000
]

atea.factory 'client', [ '$location', 'Auth', 'getDataTest', '$q', 'storage',
($location, Auth, getDataTest, $q, storage) ->
	self = @
	@path = $location.$$path
	@lastPath = @path
	@navigator = if /[W-w]indows [P-p]hone/.test window.navigator.userAgent
		'Windows Phone'
	@animationClass = (->
		if self.navigator is 'Windows Phone'
			content:
				left: ''
				right: ''
			logo: 'ease'
			leftMenu: 'ease'
		else
			content:
				left: 'hard-left'
				right: 'hard-right'
			logo: 'hard'
			leftMenu: 'hard'
	)()
	@user =
		detail: (->
			if storage.getObject 'user'
				user = storage.getObject 'user'
				Auth.setCredentials user.email, user.password
				user
			else
				null
		)()
		login: (username, password) ->
			defer = $q.defer()
			Auth.setCredentials username, password
			getDataTest.noCache resource: "login", (result) ->
				data = result.data
				self.user.detail = data
				data.password = password
				storage.setObject 'user', data
				defer.resolve data
			, (error) ->
				defer.reject error
			defer.promise
		logOut: ->
			storage.delete 'user'
			Auth.clearCredentials()
			self.detail = null
	@
]

atea.factory 'storage', [ '$window', ($window) ->
	@setObject = (name, object) ->
		$window.localStorage.setItem name, $window.JSON.stringify object
	@getObject = (name) ->
		$window.JSON.parse($window.localStorage.getItem name)
	@delete = (name) ->
		$window.localStorage.removeItem name
	@
]

atea.factory 'connection', [ ->
	connection =
		status: off
		error: (f) ->
			connection.status = on
			connection.loading = off
			connection.handler = f
]

atea.factory 'connectionTest', [ 'getDataTest', (getDataTest) ->
	connection =
		makeLoad: (property) ->
			for prop, value of property
				connection[prop] = property[prop]
			property.scope.loader = on
			property.scope.loading = on
			property.scope.update = on
			f = ->
				property.scope.warning = off
				data = if property.data then property.data else { }
				getDataTest[connection.type] connection.params, data, (result) ->
					data = result.data
					property.handler data
					property.scope.loading = off
					property.scope.loader = off
					property.scope.update = off
				, (error) ->
					if not property.scope.f
						property.scope.f = f
					property.scope.loading = off
					property.scope.warning = on
					property.scope.update = off
			f()
]