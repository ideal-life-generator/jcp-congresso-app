atea = angular.module 'atea', [ 'ngRoute', 'ngAnimate', 'ngCookies' ]

atea.config [ '$interpolateProvider', ($interpolateProvider) ->
	$interpolateProvider.startSymbol '_'
	$interpolateProvider.endSymbol '_'
]

atea.constant 'baseURL',
	BASE: 'http://188.226.155.227:5000'
	FEEDS: '/feed'
	FEED: '/feed/:feedId'
	PARTNERS: '/:feedId/partners.html'
	RATES: '/:feedId/rate.html'
	RATE: '/rate.html'
	PARTNER: '/partners.html'
	PROFILE: '/profile'
	LOGIN: '/login'

atea.config [ '$routeProvider', 'baseURL', ($routeProvider, baseURL) ->
	$routeProvider
		.when baseURL.FEEDS,
			templateUrl: 'template/events.html'
			controller: 'FeedController'
		.when baseURL.FEED,
			templateUrl: 'template/guest.html'
			controller: 'GuestController'
		.when baseURL.PARTNERS,
			templateUrl: 'template/partners.html'
			controller: 'PartnersController'
		.when baseURL.RATES,
			templateUrl: 'template/rate.html'
			controller: 'RateController'
		.when baseURL.PROFILE,
			templateUrl: 'template/profile.html'
			controller: 'ProfileController'
		.when baseURL.LOGIN,
			templateUrl: 'template/login.html'
			controller: 'LoginController'
]

atea.config [ '$httpProvider', ($httpProvider) ->
	$httpProvider.defaults.withCredentials = true
]

atea.factory 'eventsFeed', [ '$http', '$q', 'baseURL', ($http, $q, baseURL) ->
	self = @
	@getData = (->
		defer = $q.defer()
		$http
			method: 'GET'
			url: "#{baseURL.BASE}/events"
		.success (result) ->
			defer.resolve result
			self.data = result
		.error (error) ->
			defer.reject error
		defer.promise
	)()
	@
]

atea.factory 'page', [ '$location', ($location) ->
	@path = $location.$$path
	@lastPath = @path
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

atea.factory 'userStatus', [ '$http', '$q', '$location', 'storage', '$window', '$cookies', '$timeout', 'page', 'baseURL', '$rootScope',
($http, $q, $location, storage, $window, $cookies, $timeout, page, baseURL, $rootScope) ->
	self = @
	@login = (username, password) ->
		defer = $q.defer()
		$http
			method: 'POST'
			url: "#{baseURL.BASE}/users/login"
			data: $window.JSON.stringify
				username: username
				password: password
		.then (result) ->
			# $cookies.sid = "4a2acf793e7f9d0cd275f96897a197db588834120d6f9c043865ab0e2e8daba1e3f234f2177ae0b4b5b918214d9bc37290d2760e2cbc1206db1c3f75c7cfa8fd"
			# $cookies.sid = result.data.id
			# document.cookie = "sid=#{result.data.id}"
			$http
				method: 'GET'
				url: 'http://188.226.155.227:5000/users/me'
			.then (result) ->
				data = result.data
				self.detail = data
				self.role = self.detail.role
				storage.setObject 'user', data
				$rootScope.status = self.role
				defer.resolve storage.getObject "user"
				if page.lastLocation isnt baseURL.LOGIN
					$location.path page.lastLocation
				else
					$location.path baseURL.FEEDS
			, (error) ->
				defer.reject error
		, (error) -> defer.reject error
		defer.promise
	@logOut = ->
		storage.delete 'user'
		self.detail = null
		self.role = 'user'
		$rootScope.status = self.role
	@detail =
		# if storage.getObject 'user'
		# 	storage.getObject 'user'
		# else
			null
	@role =
		if @detail
			@detail.role
		else
			'user'
	@
]

atea.run [ 'baseURL', '$rootScope', 'page', 'userStatus', '$location', '$routeParams', (baseURL, $rootScope, page, userStatus, $location, $routeParams) ->
	$rootScope.status = userStatus.role
	$rootScope.baseURL = baseURL
	$rootScope.profileActive = if $location.$$path is baseURL.PROFILE then true else false
	$rootScope.rateActive = if $location.$$path is '/' + $routeParams.feedId + baseURL.RATE then true else false
	$rootScope.$on '$routeChangeStart', (data, newL, oldL) ->
		page.lastLocation = $location.$$path
		$rootScope.backButton =
			if $location.$$path is baseURL.FEEDS or $location.$$path is baseURL.PROFILE
				false
			else
				true
]

atea.controller 'RateController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope',
($scope, $location, baseURL, $routeParams, $rootScope) ->
	$rootScope.rateActive = if $location.$$path is '/' + $routeParams.feedId + baseURL.RATE then true else false
	$rootScope.profileActive = if $location.$$path is baseURL.PROFILE then true else false
	$location.prevLocation = baseURL.FEEDS + '/' + $routeParams.feedId
]

atea.controller 'ProfileController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope',
($scope, $location, baseURL, $routeParams, $rootScope) ->
	$rootScope.rateActive = if $location.$$path is '/' + $routeParams.feedId + baseURL.RATE then true else false
	$rootScope.profileActive = if $location.$$path is baseURL.PROFILE then true else false
	$location.prevLocation = baseURL.FEEDS + '/'
]

atea.controller 'PartnersController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', 'eventsFeed', '$http', '$filter',
($scope, $location, baseURL, $routeParams, $rootScope, eventsFeed, $http, $filter) ->
	$rootScope.rateActive = if $location.$$path is '/' + $routeParams.feedId + baseURL.RATE then true else false
	$rootScope.profileActive = if $location.$$path is baseURL.PROFILE then true else false
	$location.prevLocation = baseURL.FEEDS + '/' + $routeParams.feedId
	$http
		method: 'GET'
		url: "#{baseURL.BASE}/partners"
		cache: true
	.then (result) ->
		$scope.partners = $filter('orderBy')(result.data, 'name')
	, (error) -> alert 'partner list error'
]

atea.controller 'GuestController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', 'eventsFeed',
($scope, $location, baseURL, $routeParams, $rootScope, eventsFeed) ->
	$rootScope.rateActive = if $location.$$path is '/' + $routeParams.feedId + baseURL.RATE then true else false
	$rootScope.profileActive = if $location.$$path is baseURL.PROFILE then true else false
	$location.prevLocation = baseURL.FEEDS
	$scope.feedId = $routeParams.feedId
	eventsFeed.getData.then (result) ->
		angular.forEach result, (ev) ->
			if ev.id is $routeParams.feedId
				$rootScope.community = ev.eventName
				return
]

atea.controller 'MainController', [ '$scope', '$location', 'baseURL', 'userStatus', 'eventsFeed', '$rootScope', '$routeParams',
($scope, $location, baseURL, userStatus, eventsFeed, $rootScope, $routeParams) ->
	$rootScope.rateActive = if $location.$$path is '/' + $routeParams.feedId + baseURL.RATE then true else false
	$rootScope.profileActive = if $location.$$path is baseURL.PROFILE then true else false
	$scope.leftMenuActivator = ->
		$scope.leftMenuActive = !$scope.leftMenuActive
	$scope.leftMenuHide = ->
		$scope.leftMenuActive = false
	$scope.backLocation = ->
		if $location.$$path isnt baseURL.FEEDS
			$location.path $location.prevLocation
	$scope.logOut = ->
		userStatus.logOut()
		$scope.leftMenuActive = false
		$location.path $location.prevLocation

]

atea.controller 'FeedController', [ '$scope', 'eventsFeed', 'userStatus', '$filter', 'baseURL', '$location', '$rootScope', '$routeParams',
($scope, eventsFeed, userStatus, $filter, baseURL, $location, $rootScope, $routeParams) ->
	$rootScope.rateActive = if $location.$$path is '/' + $routeParams.feedId + baseURL.RATE then true else false
	$rootScope.profileActive = if $location.$$path is baseURL.PROFILE then true else false
	$scope.futureEvents = []
	$scope.pastEvents = []
	eventsFeed.getData.then (result) ->
		now = (new Date()).toISOString()
		result = $filter('orderBy')(result, 'startDate')
		result.forEach (event) ->
			if event.endDate > now
				$scope.futureEvents.push event
			else
				$scope.pastEvents.push event
	, (error) ->
		alert 'event error'
	$scope.pastEvents.fieldCollapsed = ->
		if $scope.pastEvents.collapsed
			$scope.pastEvents.collapsed = false
			$scope.futureEvents.collapsed = true
		else	
			$scope.pastEvents.collapsed = true
			$scope.futureEvents.collapsed = true
	$scope.futureEvents.fieldCollapsed = ->
		if !$scope.futureEvents.collapsed
			$scope.pastEvents.collapsed = false
			$scope.futureEvents.collapsed = true
		else
			$scope.pastEvents.collapsed = false
			$scope.futureEvents.collapsed = false

	$scope.openEvent = (ev) ->
		eventsFeed.eventActive = ev
		$location.path "#{baseURL.FEEDS}/#{ev.id}"
]

atea.controller 'LoginController', [ '$scope', '$http', '$rootScope', 'userStatus', '$location', 'baseURL', '$routeParams',
($scope, $http, $rootScope, userStatus, $location, baseURL, $routeParams) ->
	$rootScope.rateActive = if $location.$$path is '/' + $routeParams.feedId + baseURL.RATE then true else false
	$rootScope.profileActive = if $location.$$path is baseURL.PROFILE then true else false
	$location.prevLocation = baseURL.FEEDS
	$scope.login = { }
	$scope.login.submit = ->
		userStatus.login $scope.login.username, $scope.login.password
		.then (result) ->
			$rootScope.status = userStatus.role
		, (error) ->
			$rootScope.status = 'user'
]