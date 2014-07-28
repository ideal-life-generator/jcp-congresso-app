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
		type: "get"

	$scope.submitSurveyQuestions = ->
		if $scope.surveyForm.$valid
			message.wait "Please wait, processing data."
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

			if result.length
				getDataTest.save { resource: 'surveyAnswer' }, { data: records: result }, (result) ->
					message.success "Your form has been saved. И вы получаете: Thanks.", ->
						getDataTest.put { resource: 'participant' }, { data: id: $scope.participient.id, extraParam: addTokens: 'passageSurvey', survey_id: $routeParams.rateseId }, (result) ->
							data = result.data
							tokens = data.message.receivedTokens.toString()
							if tokens.length is 2
								string = "0" + tokens
							loto.run string, ->
								$timeout ->
									loto.number = null
									message.success "You have received #{tokens} tokens!", ->
										if $scope.contentAnimate isnt $scope.animationContentRight
											$scope.contentAnimate = $scope.animationContentRight
										history.back()
								, 1000
				, (error) ->
					message.warningAfter "No Internet connection."
			else
				message.warningAfter "Form contains errors. Please fix them."
		else
			message.warningAfter "Please fill in all the required fields in the form."
]

atea.controller 'RatesController', [ '$scope', '$location', 'baseURL', '$routeParams', 'connectionTest', 'message', '$rootScope',
($scope, $location, baseURL, $routeParams, connectionTest, message, $rootScope) ->
	$location.prevLocation = baseURL.FEEDS + '/' + $routeParams.feedId

	connectionTest.makeLoad
		params:
			resource: 'survey'
			id: $routeParams.rateseId
		handler: (data) ->
			if not data.success
				$scope.surveys = [ ]
				angular.forEach data, (survey) ->
					if survey.event_id is $rootScope.event.id
						$scope.surveys.push survey
			else
				message.warningAfter "No content."
		scope: $scope
		type: "get"
]

atea.controller 'ProfileController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', 'connectionTest',
($scope, $location, baseURL, $routeParams, $rootScope, connectionTest) ->
	$location.prevLocation = baseURL.FEEDS
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
		scope: $scope
		type: "get"
]

atea.controller 'SchedulesController', [ '$scope', '$location', '$routeParams', 'getDataTest', '$filter', '$http', 'connection', '$rootScope', 'connectionTest',
($scope, $location, $routeParams, getDataTest, $filter, $http, connection, $rootScope, connectionTest) ->
	$location.prevLocation = 'feed/' + $routeParams.feedId

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

			if ths.start_time is data[i+n].start_time
				timeee.push ths
			else
				timeee.push ths
				dayyy.push timeee
				timeee = [ ]
			if !(day is dayNext and month is monthNext)
				ressuulltt.push dayyy
				dayyy = [ ]

		$scope.schedules = ressuulltt

	connectionTest.makeLoad
		params:
			resource: "activity"
			data: "{'event_id': #{$routeParams.feedId}}"
		handler: getSchedules
		scope: $scope
		type: "get"
]

atea.controller 'CommentController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', '$http', '$timeout', 'message', 'connectionTest',
($scope, $location, baseURL, $routeParams, $rootScope, $http, $timeout, message, connectionTest) ->
	$location.prevLocation = baseURL.FEEDS + "/" + $routeParams.feedId
	$scope.categories = [ id: null, name: "Select a category" ]

	connectionTest.makeLoad
		params:
			resource: 'leadType'
		handler: (data) ->
			angular.forEach data, (ths) ->
				$scope.categories.push ths
		scope: $scope
		type: "get"

	$scope.categorieActive = "Select a category"
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
			message.wait = "Sending data."
			getData.submitRecord data
			.$promise.then ->
				message.success "Your message has been posted.", ->
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
		type: "get"

	$scope.submitQuestion = ->
		if $scope.questionToPartner
			message.wait "Please wait, processing data."
			getDataTest.save { resource: 'partnerMessage' }, { data: { event_id: $routeParams.feedId, message: $scope.questionToPartner } }, (result) ->
				message.success "Your question has been sent."
				$scope.invalid = false
			, (error) ->
				message.warningAfter "No Internet connection."
		else if $scope.form.$dirty
			message.warningAfter "Question should be at least 16 characters long."
		else
			message.warningAfter "Please fill in the input."
			$scope.invalid = true


			# connectionTest.makeLoad
			# 	params:
			# 		resource: 'partnerMessage'
			# 	data: { data: { event_id: $routeParams.feedId, message: $scope.questionToPartner } }
			# 	handler: (data) ->
			# 		message.success "Your question has been sent."
			# 	scope: $scope
			# 	type: "save"


		# if $scope.questionToPartner
		# 	message.wait "Please wait, processing data."
		# 	getDataTest.post resource: 'partnerMessage', $scope.questionToPartner, ->
		# 		message.success "Your question has been sent.", ->
		# 			$location.path $location.prevLocation
		# 			$scope.invalid = false
		# 	, -> message.warningAfter "No Internet connection."
		# else if $scope.form.$dirty
		# 	message.warningAfter "Question should be at least 16 characters long."
		# else
		# 	message.warningAfter "Please fill in the input."
		# 	$scope.invalid = true
]

atea.controller 'PartnersController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', '$http', '$filter', 'getDataTest', 'connection', 'connectionTest',
($scope, $location, baseURL, $routeParams, $rootScope, $http, $filter, getDataTest, connection, connectionTest) ->
	$location.prevLocation = 'feed/' + $routeParams.feedId

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
		type: "get"
]

atea.controller 'GuestController', [ '$scope', '$window', '$location', 'baseURL', '$routeParams', '$rootScope', 'client', 'connection', 'getDataTest', 'connectionTest', 'message',
($scope, $window, $location, baseURL, $routeParams, $rootScope, client, connection, getDataTest, connectionTest, message) ->
	$location.prevLocation = baseURL.FEEDS

	if client.navigator is "Windows Phone"
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
							$location.path "/" + $routeParams.feedId + '/scan/comment'
							$scope.$apply()
					scope: $scope
					type: "noCache"
			, (error) ->
				message.warning "Error scaning"
]

atea.controller 'EventsController', [ '$scope', '$filter', 'baseURL', '$location', '$rootScope', '$routeParams', 'connectionTest', 'client',
($scope, $filter, baseURL, $location, $rootScope, $routeParams, connectionTest, client) ->

	$rootScope.event = null

	$rootScope.updateEvents()
]

atea.controller 'MainController', [ '$scope', '$location', 'baseURL', '$rootScope', '$routeParams', '$timeout', 'message', '$window', 'client', '$route', '$filter', 'getDataTest', 'connectionTest',
($scope, $location, baseURL, $rootScope, $routeParams, $timeout, message, $window, client, $route, $filter, getDataTest, connectionTest) ->

	$scope.noConnectionMessage = "No internet connection is available at the moment. Please, click this message to try to connect again."

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
						connectionTest.makeLoad
							params:
								resource: 'participant'
								data: event_id: $rootScope.event.id
							handler: (data) ->
								angular.forEach data, (participant) ->
									if participant.event_id is $rootScope.event.id
										$scope.participient = participant
							scope: $scope
							type: "noCache"
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

	$scope.backLocation = (path) ->
		if $scope.contentAnimate isnt $scope.animationContentRight
			$scope.contentAnimate = $scope.animationContentRight
		if $location.prevLocation is '/feed'
			$scope.logoSize = off
		if path
			$timeout ->
				$location.path path
			, 100
		else
			$timeout ->
				$location.path $location.prevLocation
			, 100
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
			connectionTest.makeLoad
				params:
					resource: 'participant'
					data: event_id: $rootScope.event.id
				handler: (data) ->
					angular.forEach data, (participant) ->
						if participant.event_id is $rootScope.event.id
							$scope.participient = participant
							if $scope.participient.is_first_visit is "1"
								message.success "This is the first time you've logged in to this event. You are about to receive tokens!", ->
									getDataTest.put { resource: 'participant' }, data: id: $scope.participient.id, extraParam: addTokens: 'firstLogin', (result) ->
										data = result.data
										tokens = data.message.receivedTokens.toString()
										if tokens.length is 2
											string = "0" + tokens
										loto.run string, ->
											$timeout ->
												loto.number = null
												message.success "You have received #{tokens} tokens!", ->
													if $scope.contentAnimate isnt $scope.animationContentRight
														$scope.contentAnimate = $scope.animationContentRight
													history.back()
											, 1000
									, (error) ->
										message.warningAfter "Error"
				scope: $scope
				type: "noCache"
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

	$scope.toDifferentUrl = (url) ->
		$window.open url, '_system'

	document.addEventListener 'deviceready', ->
		document.addEventListener 'backbutton', ->
			if $location.$$path isnt '/feed'
				if $scope.contentAnimate isnt $scope.animationContentRight
					$scope.contentAnimate = $scope.animationContentRight
				$timeout ->
					$location.path $location.prevLocation
				, 100
			else
				navigator.app.exitApp()

	$rootScope.user = client.user.detail

	$scope.backHistory = ->
		if $scope.contentAnimate isnt $scope.animationContentRight
			$scope.contentAnimate = $scope.animationContentRight
		history.back()
]

atea.controller 'LoginController', [ '$scope', '$http', '$rootScope', '$location', 'baseURL', '$routeParams', '$timeout', 'message', 'client', 'connectionTest',
($scope, $http, $rootScope, $location, baseURL, $routeParams, $timeout, message, client, connectionTest) ->
	$location.prevLocation = baseURL.FEEDS
	$scope.login = { }
	$scope.login.submit = ->
		if $scope.authorization.$dirty and $scope.authorization.$valid
			message.wait "Please wait, logging in."
			client.user.login $scope.login.username, $scope.login.password
			.then (data) ->
				$rootScope.user = data
				message.success "Welcome #{data.first_name}!", ->
					# client.userIn = true
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
					message.warningAfter "User doesn't exist."
					$rootScope.user = null
				else
					message.warning "No internet connection."
					# $scope.refreshButton = on
		else
			message.warning "Incorrect credentials."

	$scope.pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
]