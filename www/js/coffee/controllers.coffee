atea = angular.module 'atea'

atea.controller 'RateController', [ '$scope', '$location', 'baseURL', '$routeParams', 'connectionTest', '$filter', '$compile', 'message', 'getDataTest', '$http', 'loto', '$timeout',
($scope, $location, baseURL, $routeParams, connectionTest, $filter, $compile, message, getDataTest, $http, loto, $timeout) ->
	$location.prevLocation = $routeParams.feedId + baseURL.RATESHREF

	connectionTest.makeLoad
		params:
			resource: 'surveyQuestion'
			data: survey_id: $routeParams.rateseId
		handler: (data) ->
			$scope.fields = [ ]
			angular.forEach data, (field) ->
				$scope.fields.push field
			$scope.fields = $filter('orderBy')($scope.fields, 'name')
			tokes = angular.element document.querySelector("form[name='surveyForm'] ul")
			angular.forEach $scope.fields, (field, i) ->
				tokes.append $compile("<survey-" + $scope.fields[i].type + " setting='fields[" + i + "]'></survey-" + $scope.fields[i].type + ">")($scope)
		scope: $scope
		type: "noCache"

	$scope.submitSurveyQuestions = ->
		if $scope.surveyForm.$valid
			message.wait $scope.local.processing_data
			result = [ ]
			angular.forEach $scope.fields, (field, i) ->
				proto = { }
				if field.value
					if field.type is "checkboxlist"
						angular.forEach field.options, (option) ->
							if option.value
								proto = { }
								proto.answer_value = option.answer_value
								proto.survey_id = $routeParams.rateseId
								proto.question_id = field.id
								result.push proto
					else
						proto.answer_value = field.value
						proto.survey_id = $routeParams.rateseId
						proto.question_id = field.id
						result.push proto

			if result.length and $scope.surveyForm.$valid
				getDataTest.save { resource: 'surveyAnswer' }, { data: records: result }, (result) ->
					message.success $scope.local.form_saved, ->
						if $scope.event.tokensActive
							message.wait $scope.local.form_token
							getDataTest.put { resource: 'participant' }, { data: id: $scope.participient.id, extraParam: addTokens: 'passageSurvey', survey_id: $routeParams.rateseId }, (result) ->
								data = result.data
								tokens = data.message.receivedTokens
								loto.run tokens, ->
									message.success ($scope.polyglot.t "tokens_add", ~~tokens), ->
										if $scope.contentAnimate isnt $scope.animationContentRight
											$scope.contentAnimate = $scope.animationContentRight
										history.back()
						else
							if $scope.contentAnimate isnt $scope.animationContentRight
								$scope.contentAnimate = $scope.animationContentRight
							history.back()
				, (error) ->
					message.warningAfter $scope.local.no_connection
			else
				message.warningAfter $scope.local.form_error
		else
			message.warningAfter $scope.local.form_error1

	# message.wait $scope.local.first_login
	# tokens = 456
	# loto.run tokens, ->
	# 	message.warningAfter ($scope.polyglot.t "tokens_add", ~~tokens)
]

atea.controller 'RatesController', [ '$scope', '$location', 'baseURL', '$routeParams', 'connectionTest', 'message', '$rootScope',
($scope, $location, baseURL, $routeParams, connectionTest, message, $rootScope) ->
	$location.prevLocation = baseURL.FEEDS + '/' + $routeParams.feedId

	connectionTest.makeLoad
		params:
			resource: 'survey'
			data: event_id: $routeParams.feedId
			# id: $routeParams.rateseId
		handler: (data) ->
			if not data.success
				$scope.surveys = [ ]
				angular.forEach data, (survey) ->
					$scope.surveys.push survey
				if not $scope.surveys.length
					message.success $scope.local.no_surveys, ->
						history.back()
			else
				message.warningAfter $scope.local.no_content
		scope: $scope
		type: "noCache"
]

atea.controller 'ScheduleController', [ '$scope', '$location', 'baseURL', '$routeParams', 'getDataTest', '$http', 'message', '$rootScope', 'connection', 'connectionTest',
($scope, $location, baseURL, $routeParams, getDataTest, $http, message, $rootScope, connection, connectionTest) ->
	$location.prevLocation = $routeParams.feedId + '/schedules'

	connectionTest.makeLoad
		params:
			resource: 'activity'
			id: $routeParams.scheduleId
		handler: (data) ->
			$scope.schedule = data
			getDataTest.noCache { resource: 'survey', id: $scope.schedule.survey_id }, (result) ->
				data = { }
				angular.forEach result.data, (ths) ->
					data = ths
				if data.is_answered isnt "0"
					$scope.schedule.is_visible = true
		scope: $scope
		type: "noCache"
]

atea.controller 'SchedulesController', [ '$scope', '$location', '$routeParams', 'getDataTest', '$filter', '$http', 'connection', '$rootScope', 'connectionTest',
($scope, $location, $routeParams, getDataTest, $filter, $http, connection, $rootScope, connectionTest) ->
	$location.prevLocation = '/' + $routeParams.feedId

	getSchedules = (data) ->
		oldData = data
		ressuulltt = [ ]
		data = [ ]
		dayyy = [ ]
		timeee = [ ]
		angular.forEach oldData, (ths) ->
			data.push ths
		data = $filter('orderBy')(data, '+start_time')
		angular.forEach data, (ths, i, data) ->
			date = new Date ths.start_time*1000
			day = date.getDate()
			month = date.getMonth()

			if data[i+1] then n = 1
			else n = -1

			dateNext = new Date data[i+n].start_time*1000
			dayNext = dateNext.getDate()
			monthNext = dateNext.getMonth()

			if ths.start_time is data[i+n].start_time and i isnt data.length-1
				timeee.push ths
			else
				timeee.push ths
				dayyy.push timeee
				timeee = [ ]

			if !(day is dayNext and month is monthNext) or i is data.length-1
				ressuulltt.push dayyy
				dayyy = [ ]

		$scope.schedules = ressuulltt

	connectionTest.makeLoad
		params:
			resource: "activity"
			data: "{'event_id': #{$routeParams.feedId}}"
		handler: getSchedules
		scope: $scope
		type: "noCache"
]

atea.controller 'CommentController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', '$http', '$timeout', 'message', 'connectionTest',
($scope, $location, baseURL, $routeParams, $rootScope, $http, $timeout, message, connectionTest) ->
	$location.prevLocation = baseURL.FEEDS + "/" + $routeParams.feedId

	connectionTest.makeLoad
		params:
			resource: 'leadType'
		handler: (data) ->
			$scope.categories = [ id: null, name: $scope.local.select_category ]
			angular.forEach data, (ths) ->
				$scope.categories.push ths
		scope: $scope
		type: "noCache"

	$scope.categorieActive = $scope.local.select_category
	$scope.interest = "5"
	$scope.revenue = "5"
	$scope.submit = ->
		if $scope.categorieActive isnt $scope.categories[0].name
			$scope.noValid = false
			data =
				interrogatorId: userStatus.detail.eventId
				categorie: $scope.categorieActive
				interest: $scope.interest
				revenue: $scope.revenue
				comment: $scope.comments
			message.wait = $scope.local.data_sending
			getData.submitRecord data
			.$promise.then ->
				message.success $scope.local.message_posted, ->
					$location.path $location.prevLocation
		else
			$scope.noValid = true
]

atea.controller 'PartnerController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', 'message', 'connectionTest', 'getDataTest', '$http',
($scope, $location, baseURL, $routeParams, $rootScope, message, connectionTest, getDataTest, $http) ->
	$location.prevLocation = $routeParams.feedId + '/partners'

	connectionTest.makeLoad
		params:
			resource: 'partnerCompany'
			id: $routeParams.partnerId
		handler: (data) ->
			$scope.partner = data
		scope: $scope
		type: "noCache"

	$scope.submitQuestion = ->
		console.log $scope
		if $scope.questionToPartner
			message.wait $scope.local.processing_data
			getDataTest.save { resource: 'partnerMessage' }, { data: { event_id: $routeParams.feedId, message: $scope.questionToPartner } }, (result) ->
				message.success $scope.local.quest_sent
				$scope.invalid = false
			, (error) ->
				message.warningAfter $scope.local.no_connection
		else if $scope.partnerForm
			message.warningAfter $scope.local.quest_error
		else
			message.warningAfter $scope.local.fill_input
			$scope.invalid = true
]

atea.controller 'PartnersController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', '$http', '$filter', 'getDataTest', 'connection', 'connectionTest',
($scope, $location, baseURL, $routeParams, $rootScope, $http, $filter, getDataTest, connection, connectionTest) ->
	$location.prevLocation = '/' + $routeParams.feedId

	getPartners = (data) ->
		$scope.partners = [ ]
		angular.forEach data, (partner) ->
			$scope.partners.push partner

	connectionTest.makeLoad
		params:
			resource: 'partnerCompany'
			data: "{'event_id': #{$routeParams.feedId}}"
		handler: getPartners
		scope: $scope
		type: "noCache"
]

atea.controller 'GuestController', [ '$scope', '$window', '$location', 'baseURL', '$routeParams', '$rootScope', 'client', 'connection', 'getDataTest', 'connectionTest', 'message',
($scope, $window, $location, baseURL, $routeParams, $rootScope, client, connection, getDataTest, connectionTest, message) ->
	$location.prevLocation = baseURL.FEEDS

	$scope.scanActivator = ->
		cordova.plugins.barcodeScanner.scan (result) ->
			connectionTest.makeLoad
				params:
					resource: 'member'
					data: "{ 'extraParam': { 'barcode': '#{result.text}' }}"
				handler: (data) ->
					if data.success
						message.warning "No user"
					else
						$rootScope.member = data
						$location.path "/" + $routeParams.feedId + baseURL.COMMENTWPAGEHREF
						$scope.$apply()
				scope: $scope
				type: "noCache"
		, (error) ->
			message.warning $scope.local.error_scaning
]

atea.controller 'EventsController', [ '$scope', '$filter', 'baseURL', '$location', '$rootScope', '$routeParams', 'connectionTest', 'client',
($scope, $filter, baseURL, $location, $rootScope, $routeParams, connectionTest, client) ->

	$rootScope.event = null

	$rootScope.updateEvents()
]

atea.controller 'ProfileController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', 'connectionTest',
($scope, $location, baseURL, $routeParams, $rootScope, connectionTest) ->
	$location.prevLocation = baseURL.FEEDS

]

atea.controller 'MainController', [ '$scope', '$location', 'baseURL', '$rootScope', '$routeParams', '$timeout', 'message', '$window', 'client', '$route', '$filter', 'getDataTest', 'connectionTest', 'loto', 'COMPANY_ID', 'local',
($scope, $location, baseURL, $rootScope, $routeParams, $timeout, message, $window, client, $route, $filter, getDataTest, connectionTest, loto, COMPANY_ID, local) ->

	$scope.local = { }

	local.then (data) ->
		$scope.local = data.local
		$scope.dyna = data.dyna
		$scope.polyglot = data.polyglot
		# message.wait $scope.local.first_login
		# loto.run 456, ->
		# 	message.warningAfter ($scope.polyglot.t "tokens_add", ~~456)

	$scope.noConnectionMessage = $scope.local.page_nointernet

	$rootScope.updateEvents = ->
		$scope.futureEvents = []
		$scope.pastEvents = []
		getEvents = (data) ->
			$rootScope.events = data
			now = (new Date()).getTime()/1000
			angular.forEach $rootScope.events, (event) ->
				if event.end_date > now
					$scope.futureEvents.push event
				else
					$scope.pastEvents.push event
			$scope.pastEvents = $filter('orderBy')($scope.pastEvents, '+start_date')
			$scope.futureEvents = $filter('orderBy')($scope.futureEvents, '+start_date')

		connectionTest.makeLoad
			params:
				resource: 'event'
				data: account_id: COMPANY_ID
			handler: getEvents
			scope: $scope
			type: "noCache"

	$scope.$on '$routeChangeSuccess', ->
		path = $location.$$path
		if $rootScope.event and path is baseURL.FEEDS
			$rootScope.event = null
			$scope.participient = null
		if not $rootScope.event and path isnt baseURL.FEEDS and path isnt baseURL.LOGIN
			$rootScope.backButton = on
			connectionTest.makeLoad
				params:
					resource: 'event'
					id: $routeParams.feedId
				handler: (data) ->
					$rootScope.event = data
					if $rootScope.user
						getDataTest.noCache
							resource: 'participant'
							data: event_id: $rootScope.event.id,
						, (result) ->
							data = result.data
							angular.forEach data, (participant) ->
								if participant.event_id is $rootScope.event.id
									$scope.participient = participant
									$scope.dyna.tokens_val = $scope.polyglot.t "tokens_val", ~~participant.tokens
				scope: $scope
				type: "noCache"
		if path is baseURL.LOGIN
			$rootScope.backButton = on
			$rootScope.forgot = on
		else
			$rootScope.forgot = off
		if path is baseURL.FEEDS
			$rootScope.backButton = off

	$scope.pastEventsCollapseder = ->
		if $scope.pastEventsCollapsed
			$scope.pastEventsCollapsed = false
			$scope.futureEventsCollapsed = true
		else	
			$scope.pastEventsCollapsed = true
			$scope.futureEventsCollapsed = true
	$scope.futureEventsCollapseder = ->
		if !$scope.futureEventsCollapsed
			$scope.pastEventsCollapsed = false
			$scope.futureEventsCollapsed = true
		else
			$scope.pastEventsCollapsed = false
			$scope.futureEventsCollapsed = false

	$scope.leftMenuBlur = ($event) ->
		$event.stopPropagation()
		$scope.leftMenuActive = false
	$scope.leftMenuActivator = ($event) ->
		if $event.stopPropagation then $event.stopPropagation()
		else if $location.$$path isnt baseURL.FEEDS then $location.path $event
		$scope.leftMenuActive = !$scope.leftMenuActive
	$scope.leftMenuHide = ->
		if $scope.leftMenuActive
			$scope.leftMenuActive = false

	$scope.logoMainAnimateClass = { }
	$scope.logoMainAnimateClass[client.animationClass.logo] = $scope.logoSize

	$scope.$watch 'event', (data) ->
		$scope.logoMainAnimateClass[client.animationClass.logo] = data

	$scope.animationContentLeft = client.animationClass.content.left
	$scope.animationContentRight = client.animationClass.content.right

	$scope.leftMenuAnimationType = client.animationClass.leftMenu

	# $scope.backLocation = (path) ->
	# 	if $scope.contentAnimate isnt $scope.animationContentRight
	# 		$scope.contentAnimate = $scope.animationContentRight
	# 	if $location.prevLocation is '/feed'
	# 		$scope.logoSize = off
	# 	if path
	# 		$timeout ->
	# 			$location.path path
	# 		, 100
	# 	else
	# 		$timeout ->
	# 			$location.path $location.prevLocation
	# 		, 100

	$scope.nextLocation = (path) ->
		if $scope.contentAnimate isnt $scope.animationContentLeft
			$scope.contentAnimate = $scope.animationContentLeft
		$scope.logoSize = on
		$timeout ->
			$location.path path
		, 100

	$scope.changeEvent = (path, event) ->
		$rootScope.event = event
		if $rootScope.user
			getDataTest.noCache
				resource: 'participant'
				data: event_id: $rootScope.event.id,
			, (result) ->
				data = result.data
				angular.forEach data, (participant) ->
					if participant.event_id is $rootScope.event.id
						$scope.participient = participant
						if $scope.event.tokensActive and $scope.participient.is_first_visit is "1"	
							message.wait $scope.local.first_login
							getDataTest.put { resource: 'participant' }, data: id: $scope.participient.id, extraParam: addTokens: 'firstLogin', (result) ->
								data = result.data
								tokens = data.message.receivedTokens
								loto.run tokens, ->
									message.warningAfter ($scope.polyglot.t "tokens_add", ~~tokens)
							# , (error) ->
								# message.warningAfter "Error"
		$scope.nextLocation(path)

	$scope.logOut = ->
		client.user.logOut()
		$rootScope.user = null
		$rootScope.participient = null
		if $location.$$path isnt baseURL.FEEDS
			connectionTest.makeLoad
				params:
					resource: 'event'
					id: $rootScope.event.id
				handler: (data) ->
					if $rootScope.user and $rootScope.event
						connectionTest.makeLoad
							params:
								resource: 'participant'
								data: data: event_id: $rootScope.event.id
							handler: (data) ->
								angular.forEach data, (participant) ->
									$rootScope.participient = participant
							scope: $scope
							type: "noCache"
					$rootScope.event = data
				scope: $scope
				type: "noCache"
		$rootScope.updateEvents()
		$location.path baseURL.FEEDS

	$scope.toDifferentUrl = (url) ->
		$window.open url, '_system'

	$scope.shareT = ->
		# window.plugins.socialsharing.canShareVia 'com.apple.social.facebook', 'msg', null, null, null, (e) ->
		# 	alert(e)
		# , (e) ->
		# 	alert(e)
		# message = text: "This is a test message"

		# $window.socialmessage.send message
		# $window.plugins.socialsharing.share 'Message only'

	# try
	# 	document.addEventListener 'deviceready', ->
	# 		alert "device ready"
	document.addEventListener 'backbutton', ->
		if $location.$$path isnt baseURL.FEEDS
			if $scope.contentAnimate isnt $scope.animationContentRight
				$scope.contentAnimate = $scope.animationContentRight
			$timeout ->
				history.back()
			, 100
		else
			navigator.app.exitApp()
	# catch error
	# 	alert error

	$rootScope.user = client.user.detail

	$scope.backHistory = ->
		if $scope.contentAnimate isnt $scope.animationContentRight
			$scope.contentAnimate = $scope.animationContentRight
		$timeout ->
			history.back()
		, 100

	$scope.openShare = ->
		$window.plugins.socialsharing.share 'http://www.atea.no/hovedmeny/atea-community-2014/'
]

atea.controller 'LoginController', [ '$scope', '$http', '$rootScope', '$location', 'baseURL', '$routeParams', '$timeout', 'message', 'client', 'connectionTest',
($scope, $http, $rootScope, $location, baseURL, $routeParams, $timeout, message, client, connectionTest) ->
	$location.prevLocation = baseURL.FEEDS

	$scope.go_submit = ->
		if $scope.auth.$dirty and $scope.auth.$valid
			message.wait $scope.local.log_in
			client.user.login $scope.auth.username, $scope.auth.password
			.then (data) ->
				$rootScope.user = data
				message.success ($scope.polyglot.t "login_message", name: data.first_name), ->
				if $rootScope.event
					connectionTest.makeLoad
						params:
							resource: 'event'
							id: $rootScope.event.id
						handler: (data) ->
							$rootScope.event = data
							connectionTest.makeLoad
								params:
									resource: 'participant'
									data: data: event_id: $rootScope.event.id
								handler: (data) ->
									angular.forEach data, (participant) ->
										$rootScope.participient = participant
								scope: $scope
								type: "noCache"
						scope: $scope
						type: "noCache"
				if $scope.contentAnimate isnt $scope.animationContentRight
					$scope.contentAnimate = $scope.animationContentRight
				history.back()
			, (error) ->
				if error.status is 401
					message.warningAfter $scope.local.user_exist
					$rootScope.user = null
				else
					message.warning $scope.local.no_connection
		else
			message.warning $scope.local.incorrect_credentials

	$scope.pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
]