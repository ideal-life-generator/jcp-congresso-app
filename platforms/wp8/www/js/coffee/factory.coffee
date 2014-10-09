atea = angular.module 'atea'

atea.factory 'getData', [ '$resource', 'baseURL', ($resource, baseURL) ->
	# $resource "http://event.congresso.no/api/:resource/:id", { },
	$resource "#{baseURL.BASE}/api/:resource/:id", { },
	# $resource "http://dev.congressomulti-loc.no/api/:resource/:id", { },
		get: method: "GET", cache: true
		noCache: method: "GET", cache: false
		save: method: "POST", headers: 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		put: method: "PUT", headers: 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
]

atea.factory "$history", ($location) ->
	self = @
	@history = [ ]
	$history = @history
	@history.add = (path) ->
		$history.push path
	@history.back = ->
		$location.path $history[$history.length-2]
		$history.length = $history.length-2
	@history

atea.config (localProvider) ->
	localProvider.lang =
		if navigator.language is "hu"
			"hu"
		else
			"en"

atea.factory 'client', [ '$location', 'Auth', 'getData', '$q', 'storage',
($location, Auth, getData, $q, storage) ->
	version = "1.2.5"
	self = @
	@path = $location.$$path
	@lastPath = @path
	@navigator = if /[W-w]indows [P-p]hone/.test window.navigator.userAgent
		'Windows Phone'
	@animationClass = (->
		if self.navigator is 'Windows Phone'
			content:
				left: 'hard-left'
				right: 'hard-right'
			logo: 'hard'
			leftMenu: 'hard'
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
				if user.version is version
					Auth.setCredentials user.email, user.password
					user
				else
					storage.delete 'user'
					Auth.clearCredentials()
					null
			else
				null
		)()
		login: (username, password) ->
			defer = $q.defer()
			Auth.setCredentials username, password
			getData.noCache resource: "login", (result) ->
				data = result.data
				self.user.detail = data
				data.password = password
				data.version = version
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

atea.factory 'connection', [ 'getData' , '$rootScope', (getData, $rootScope) ->
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
				getData[connection.type] connection.params, data, (result) ->
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

atea.factory "loto", ->
	loto =
		run: (number, fn) ->
			if typeof number is "number"
				number = (number).toString()
			loto.afterFn = fn
			if number.length > loto.length.length
				loto.length = (i for i in [0...number.length])
			else
				for i in [0...loto.length.length-number.length]
					number = "0" + number
			loto.number = number
		length: [ 0, 1, 2 ]
		krugi: 2
		speed: 1000
		frames: 16
		height: 105
		_count: 0

atea.factory "message", ($timeout, $animate) ->
	timeout = 2000
	message =
		odinAndClose: (text, callback1, callback2) ->
			message._close = true
			message._callback1 = callback1
			message._callback2 = callback2
			message.text = text
			$animate.removeClass message._element, "ng-hide", ->
				if message._callback1
					message._callback1()
					message._callback1 = null
		authoClose: (text, callback1, callback2) ->
			message._close = true
			message._callback1 = callback1
			message._callback2 = callback2
			message.text = text
			$animate.removeClass message._element, "ng-hide", ->
				if message._callback1
					message._callback1()
					message._callback1 = null
				$timeout ->
					$animate.addClass message._element, "ng-hide", ->
						if message._callback2
							message._callback2()
							message._callback2 = null
				, timeout
		open: (text, callback1) ->
			message._close = false
			message._callback1 = callback1
			message.text = text
			$animate.removeClass message._element, "ng-hide", ->
				if message._callback1
					message._callback1()
					message._callback1 = null
		noClose: (text, callback1, callback2) ->
			message._close = true
			message._callback2 = callback2
			message.text = text
			if callback1
				callback1()
		close: ->
			$animate.addClass message._element, "ng-hide", ->
				if message._callback2
					message._callback2()
					message._callback2 = null


atea.filter 'dayMonth', (local) ->
	(date) ->
		if date
			months = local.static.months
			date = new Date date*1000
			day = date.getDate()
			month = date.getMonth()
			day + '. ' + months[month].toLowerCase()

atea.filter 'hourMinute', ->
	(date) ->
		if date
			date = new Date date*1000
			hour = date.getHours().toString()
			minute = date.getMinutes().toString()
			hour = if hour.length is 1 then '0' + hour else hour
			minute = if minute.length is 1 then '0' + minute else minute
			hour + ':' + minute

atea.filter 'fullDate', (local) ->
	(date) ->
		if date
			w = local.static.days
			months = local.static.months
			date = new Date date*1000
			day = date.getDay()
			month = date.getMonth()
			y = date.getFullYear()
			w[day] + ' ' + day + '. ' + months[month].toLowerCase() + ' ' + y