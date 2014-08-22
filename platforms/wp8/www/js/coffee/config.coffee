atea = angular.module 'atea', [ 'ngRoute', 'ngAnimate', 'ngResource', 'ja.qr', 'ngCookies' ]

# atea = angular.module 'atea', [ 'ngRoute', 'ngAnimate', 'ngResource', 'ja.qr', 'ngCookies' ]

atea.config [ '$interpolateProvider', ($interpolateProvider) ->
	$interpolateProvider.startSymbol '~'
	$interpolateProvider.endSymbol '~'
]

atea.value 'COMPANY_ID', 13

atea.constant 'baseURL',
	BASE: 'http://event.congresso.no'
	FEEDS: '/'
	FEED: '/feed/:feedId'
	FEEDHREF: '/feed'
	PARTNERS: '/:feedId/partners'
	PARTNER: '/:feedId/partners/:partnerId'
	PARTNERHREF: '/partners/'
	RATES: '/:feedId/rate.html'
	RATE: '/rate.html'
	SCANPAGE: '/:feedId/scan'
	SCANHREF: '/scan'
	COMMENTPAGE: '/:feedId/scan/comment'
	COMMENTPAGEHREF: '/scan/comment'
	SCHEDULES: '/:feedId/schedules'
	SCHEDULE: '/:feedId/schedules/:scheduleId'
	SCHEDULESHREF: '/schedules'
	RATES: '/:feedId/rateses'
	RATESHREF: '/rateses'
	RATE: '/:feedId/rateses/:rateseId'
	PROFILE: '/profile'
	LOGIN: '/login'
	MYPAGE: '/congressomulti/mypage'

atea.config [ '$routeProvider', 'baseURL', ($routeProvider, baseURL) ->
	$routeProvider
		.when '/',
			templateUrl: 'template/events.html'
			controller: 'EventsController'
		.when baseURL.FEED,
			templateUrl: 'template/guest.html'
			controller: 'GuestController'
		.when baseURL.PARTNERS,
			templateUrl: 'template/partners.html'
			controller: 'PartnersController'
		.when baseURL.PARTNER,
			templateUrl: 'template/partner.html'
			controller: 'PartnerController'
		.when baseURL.SCANPAGE,
			templateUrl: 'template/scan.html'
			controller: 'ScanController'
		.when baseURL.COMMENTPAGE,
			templateUrl: 'template/comment.html'
			controller: 'CommentController'
		.when baseURL.SCHEDULES,
			templateUrl: 'template/schedules.html'
			controller: 'SchedulesController'
		.when baseURL.SCHEDULE,
			templateUrl: 'template/schedule.html'
			controller: 'ScheduleController'
		.when baseURL.RATES,
			templateUrl: 'template/rates.html'
			controller: 'RatesController'
		.when baseURL.RATE,
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
	$httpProvider.defaults.useXDomain = true
	$httpProvider.defaults.withCredentials = true
	delete $httpProvider.defaults.headers.common['X-Requested-With']
	$httpProvider.defaults.headers.put = {}
]

atea.run [ 'baseURL', '$rootScope', 'client', '$location', '$routeParams', '$window',
(baseURL, $rootScope, client, userStatus, $location, $routeParams, $window) ->
	$rootScope.status = userStatus.role
	$rootScope.baseURL = baseURL

	FastClick.attach document.body
]

atea.filter 'dayMonth', (local) ->
	(date) ->
		if date
			d = [ "th", "st", "nd", "rd" ]
			months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
			# months = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
			now = new Date().toString()
			date = new Date date*1000
			dateString = date.toString()
			day = date.getDate()
			month = date.getMonth()
			if now.slice(0, 15) is dateString.slice 0, 15
				"Today"
			else
				v = day % 100
				day + (d[(v-20)%10]||d[v]||d[0]) + ' ' + months[month]

atea.filter 'hourMinute', ->
	(date) ->
		if date
			date = new Date date*1000
			hour = date.getHours().toString()
			minute = date.getMinutes().toString()
			hour = if hour.length is 1 then '0' + hour else hour
			minute = if minute.length is 1 then '0' + minute else minute
			hour + ':' + minute

atea.filter 'fullDate', ->
	(date) ->
		if date
			w = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]
			# w = [ "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье" ]
			d = [ "th", "st", "nd", "rd" ]
			months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
			# months = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
			date = new Date date*1000
			day = date.getDay()
			dat = date.getDate()
			v = dat % 100
			v = dat + (d[(v-20)%10]||d[v]||d[0])
			month = date.getMonth()
			y = date.getFullYear()
			w[day] + ' ' + v + ' ' + months[month] + ' ' + y