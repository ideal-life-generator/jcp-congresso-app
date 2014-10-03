atea = angular.module 'atea'

atea.controller 'RateController', [ '$scope', '$location', 'baseURL', '$routeParams', 'connection', '$filter', '$compile', 'getData', '$http', 'loto', '$timeout', 'message', '$rootScope', '$history',
($scope, $location, baseURL, $routeParams, connection, $filter, $compile, getData, $http, loto, $timeout, message, $rootScope, $history) ->

	title = ""

	try
		if $scope.event
			title += $scope.event.event_name
		if $rootScope.survey
			title += " / Survey / " + $rootScope.survey.name

	analytics.trackView title

	connection.makeLoad
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
			message.open $scope.local.processing_data
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
				getData.save { resource: 'surveyAnswer' }, { data: records: result }, (result) ->
					message.open $scope.local.form_saved, ->
						if $scope.event.tokensActive
							message.open $scope.local.form_token
							getData.put { resource: 'participant' }, { data: id: $scope.participient.id, extraParam: addTokens: 'passageSurvey', survey_id: $routeParams.rateseId }, (result) ->
								data = result.data
								if data.success
									tokens = data.message.receivedTokens
									$rootScope.updateTokens()
									loto.run tokens, ->
										message.noClose ($scope.polyglot.t "tokens_add", ~~tokens)
										, ->
											undefined
										, ->
											if $scope.contentAnimate isnt $scope.animationContentRight
												$scope.contentAnimate = $scope.animationContentRight
											$timeout ->
												$history.back()
											, 100
											loto.number = null
								else
									message.noClose $scope.local.error_server, ->
										if $scope.contentAnimate isnt $scope.animationContentRight
											$scope.contentAnimate = $scope.animationContentRight
										$timeout ->
											$history.back()
										, 100
										loto.number = null
						else
							message.authoClose $scope.local.form_saved
							, ->
								undefined
							, ->
								if $scope.contentAnimate isnt $scope.animationContentRight
									$scope.contentAnimate = $scope.animationContentRight
								$timeout ->
									$history.back()
								, 100
								loto.number = null
				, (error) ->
					message.noClose $scope.local.no_connection
			else
				message.noClose $scope.local.form_fill
		else
			message.odinAndClose $scope.local.form_error1
]

atea.controller 'RatesController', [ '$scope', '$location', 'baseURL', '$routeParams', 'connection', '$rootScope', '$timeout', 'message', '$history',
($scope, $location, baseURL, $routeParams, connection, $rootScope, $timeout, message, $history) ->

	connection.makeLoad
		params:
			resource: 'survey'
			data: event_id: $routeParams.feedId
		handler: (data) ->
			if not data.success
				$scope.surveys = [ ]
				title = ""
				try
					if $scope.event
						title += $scope.event.event_name
					analytics.trackView title + " / Surveys"
				angular.forEach data, (survey) ->
					$scope.surveys.push survey
				if not $scope.surveys.length
					message.authoClose $scope.local.no_surveys, ->
						$history.back()
			else
				message.authoClose $scope.local.no_surveys, ->
					$history.back()
		scope: $scope
		type: "noCache"
]

atea.controller 'ScheduleController', [ '$scope', '$location', 'baseURL', '$routeParams', 'getData', '$http', '$rootScope', 'connection',
($scope, $location, baseURL, $routeParams, getData, $http, $rootScope, connection) ->

	$rootScope.survey = null

	connection.makeLoad
		params:
			resource: 'activity'
			id: $routeParams.scheduleId
		handler: (data) ->
			title = ""
			try
				if $scope.event
					title += $scope.event.event_name
				if data
					title +=  " / Activity / " + data.name
				analytics.trackView title
			$scope.schedule = data
			if $scope.schedule.survey_id isnt "0"
				getData.noCache { resource: 'survey', id: $scope.schedule.survey_id }, (result) ->
					$rootScope.survey = result.data
		scope: $scope
		type: "noCache"
]

atea.controller 'SchedulesController', [ '$scope', '$location', '$routeParams', 'getData', '$filter', '$http', '$rootScope', 'connection', 'message',
($scope, $location, $routeParams, getData, $filter, $http, $rootScope, connection, message) ->

	title = ""
	try
		if $scope.event
			title += $scope.event.event_name
		analytics.trackView title + " / Schedules"

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

	connection.makeLoad
		params:
			resource: "activity"
			data: "{'event_id': #{$routeParams.feedId}}"
		handler: getSchedules
		scope: $scope
		type: "noCache"
]

atea.controller 'CommentController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', '$http', '$timeout', 'connection', 'message', 'getData', '$history',
($scope, $location, baseURL, $routeParams, $rootScope, $http, $timeout, connection, message, getData, $history) ->

	title = ""
	try
		if $scope.event
			title += $scope.event.event_name
		analytics.trackView title + " / Comment"

	connection.makeLoad
		params:
			resource: 'leadType'
		handler: (data) ->
			$scope.categories = [ ]
			angular.forEach data, (ths) ->
				$scope.categories.push ths
		scope: $scope
		type: "noCache"

	if not $scope.commentLead
		$scope.commentLead =
			lead_type_id: ""
			interest: "5"
			revenue: "5"
			method: "save"

	$scope.commentLead.categorieSingle = $scope.local.select_category

	$scope.submit = ->
		if $scope.commentLead.lead_type_id
			message.open $scope.local.data_sending
			if $scope.commentLead.method is "save"
				data =
					participant_id: $scope.participantScan.id
					event_id: $scope.event.id
					lead_type_id: $scope.commentLead.lead_type_id
					interest: $scope.commentLead.interest
					revenue: $scope.commentLead.revenue
					comment: $scope.commentLead.comment
				getData.save { resource: 'partnerLead' }, data: data, (result) ->
					data = result.data
					message.authoClose $scope.local.lead_sent
					if $scope.contentAnimate isnt $scope.animationContentRight
						$scope.contentAnimate = $scope.animationContentRight
					$timeout ->
						$location.path $history.back()
					, 100
				, ->
					message.noClose $scope.local.error_server
			else if $scope.commentLead.method is "put"
				data =
					id: $scope.commentLead.id
					lead_type_id: $scope.commentLead.lead_type_id
					interest: $scope.commentLead.interest
					revenue: $scope.commentLead.revenue
					comment: $scope.commentLead.comment
				getData.put { resource: 'partnerLead' }, data: data, (result) ->
					data = result.data
					message.authoClose $scope.local.lead_sent
					if $scope.contentAnimate isnt $scope.animationContentRight
						$scope.contentAnimate = $scope.animationContentRight
					$timeout ->
						$location.path $history.back()
					, 100
				, ->
					message.noClose $scope.local.error_server
		else
			message.odinAndClose $scope.local.select_category

]

atea.controller 'PartnerController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', 'connection', 'getData', '$http', 'message',
($scope, $location, baseURL, $routeParams, $rootScope, connection, getData, $http, message) ->

	connection.makeLoad
		params:
			resource: 'partnerCompany'
			id: $routeParams.partnerId
		handler: (data) ->
			$scope.partner = data
			ga "send", "pageview",
				page: $location.$$path
				title: "The partner page of event #{$rootScope.event.id}, partner name #{data.name} ID #{data.id}"
			title = ""
			try
				if $scope.event
					title += $scope.event.event_name
				if data
					title += " / Partner / " + data.name
				analytics.trackView title
		scope: $scope
		type: "get"

	$scope.submitQuestion = ->
		if $scope.questionToPartner
			message.open $scope.local.processing_data
			getData.save { resource: 'partnerMessage' }, { data: { event_id: $routeParams.feedId, message: $scope.questionToPartner, partner_company_id: $scope.partner.id } }, (result) ->
				message.authoClose $scope.local.quest_sent
				$scope.questionToPartner = ""
				$scope.invalid = false
			, (error) ->
				message.noClose $scope.local.no_connection
		else if $scope.partnerForm
			message.odinAndClose $scope.local.quest_error
		else
			message.odinAndClose $scope.local.fill_input
			$scope.invalid = true
]

atea.controller 'PartnersController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', '$http', '$filter', 'getData', 'connection',
($scope, $location, baseURL, $routeParams, $rootScope, $http, $filter, getData, connection) ->

	title = ""
	try
		if $scope.event
			title += $scope.event.event_name
		analytics.trackView title + " / Partners"

	getPartners = (data) ->
		partners = [ ]
		angular.forEach data, (partner) ->
			partner.rating = ~~partner.rating
			partners.push partner
		$scope.partners = $filter('orderBy')(partners, "+rating")


	connection.makeLoad
		params:
			resource: 'partnerCompany'
			data: "{extraParam: {'event_id': #{$routeParams.feedId}}}"
		handler: getPartners
		scope: $scope
		type: "get"
]

atea.controller 'GuestController', [ '$scope', '$window', '$location', 'baseURL', '$routeParams', '$rootScope', 'client', 'getData', 'connection', 'loto', 'message',
($scope, $window, $location, baseURL, $routeParams, $rootScope, client, getData, connection, loto, message) ->

	title = ""
	try
		if $scope.event
			title += $scope.event.event_name
			title += " / Homepage (" + $scope.event.eventRole.slice(0, 1).toUpperCase() + $scope.event.eventRole.slice(1)  + ")"
		analytics.trackView title

	$scope.scanActivator = ->
		cordova.plugins.barcodeScanner.scan (result) ->
			if result.cancelled isnt 1
			# if !result.cancelled
				message.open $scope.local.check_scan
			getData.noCache
				resource: 'member'
				data: extraParam: barcode: result.text
			, (result) ->
				data = result.data
				if data.success
					message.noClose $scope.local.error_scaning
				else
					getData.noCache
						resource: 'participant'
						data: event_id: $scope.event.id, member_id: data.id, extraParam: "globalSearch"
					, (result) ->
						data = result.data
						$rootScope.participantScan = null
						angular.forEach data, (part) ->
							$rootScope.participantScan = part
						if $rootScope.participantScan.id isnt $scope.participient.id
							if $rootScope.participantScan.event_id is $scope.event.id
								getData.noCache
									resource: 'partnerLead'
									data: event_id: $scope.event.id, participant_id: $rootScope.participantScan.id
								, (result) ->
									data = result.data
									$rootScope.commentLead = null
									if data.success is "false"
										message.close()
										$location.path $routeParams.feedId + baseURL.COMMENTPAGEHREF
										$scope.$apply()
									else
										angular.forEach data, (comment) ->
											$rootScope.commentLead = comment
										$rootScope.commentLead.method = "put"
										message.close()
										$location.path $routeParams.feedId + baseURL.COMMENTPAGEHREF
										$scope.$apply()
							else
								message.noClose $scope.local.scan_error2
						else
							message.noClose $scope.local.scan_warning1
	
]

atea.controller 'EventsController', [ '$scope', '$filter', 'baseURL', '$location', '$rootScope', '$routeParams', 'connection', 'client',
($scope, $filter, baseURL, $location, $rootScope, $routeParams, connection, client) ->

	$rootScope.event = null

	try
		analytics.trackView "Events"

	$rootScope.updateEvents()
]

atea.controller 'ProfileController', [ '$scope', '$location', 'baseURL', '$routeParams', '$rootScope', 'connection', 'getData',
($scope, $location, baseURL, $routeParams, $rootScope, connection, getData) ->

	try
		analytics.trackView "Profile"

	$scope.dyna.tokens_val = $scope.polyglot.t "tokens_val", ~~$scope.participient.tokens
]

atea.controller 'MainController', [ '$scope', '$location', 'baseURL', '$rootScope', '$routeParams', '$timeout', '$window', 'client', '$route', '$filter', 'getData', 'connection', 'loto', 'COMPANY_ID', 'local', 'message', '$sce', '$history',
($scope, $location, baseURL, $rootScope, $routeParams, $timeout, $window, client, $route, $filter, getData, connection, loto, COMPANY_ID, local, message, $sce, $history) ->

	$scope.local = local.static
	$scope.dyna = { }
	$scope.polyglot = local.dynamic

	$scope.noConnectionMessage = $scope.local.page_nointernet

	$rootScope.updateTokens = ->
		getData.noCache
			resource: 'participant'
			data: event_id: $rootScope.event.id,
		, (result) ->
			data = result.data
			angular.forEach data, (participant) ->
				if participant.event_id is $rootScope.event.id
					$scope.participient = participant
					$scope.dyna.tokens_val = $scope.polyglot.t "tokens_val", ~~participant.tokens

	$rootScope.updateEvents = ->
		$scope.futureEvents = []
		$scope.pastEvents = []
		getEvents = (data) ->
			$rootScope.events = data
			now = (new Date()).getTime()/1000
			angular.forEach $rootScope.events, (event) ->
				if event.ical_end > now
					$scope.futureEvents.push event
				else
					$scope.pastEvents.push event
			$scope.pastEvents = $filter('orderBy')($scope.pastEvents, '+ical_start')
			$scope.futureEvents = $filter('orderBy')($scope.futureEvents, '+ical_start')

		connection.makeLoad
			params:
				resource: 'event'
				data: account_id: COMPANY_ID
			handler: getEvents
			scope: $scope
			type: "noCache"

	$scope.$on '$locationChangeStart', ->
		$history.add $location.$$path

	$scope.$on '$routeChangeSuccess', (ev, ls) ->
		path = $location.$$path
		if $rootScope.event and path is baseURL.FEEDS
			$rootScope.event = null
			$scope.participient = null
		if not $rootScope.event and path isnt baseURL.FEEDS and path isnt baseURL.LOGIN
			$rootScope.backButton = on
			connection.makeLoad
				params:
					resource: 'event'
					id: $routeParams.feedId
				handler: (data) ->
					$rootScope.event = data
					if $rootScope.user
						getData.noCache
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
			$rootScope.forgot = on
		else
			$rootScope.forgot = off
		if path isnt baseURL.FEEDS
			$scope.backButton = on
		else if $scope.backButton
			$scope.backButton = off
		if path is baseURL.PROFILE
			$scope.edit = yes
		else if $scope.edit
			$scope.edit = no

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

	leftMenu = document.querySelector ".pushy-left"
	contentBlock = document.querySelector ".push-page"

	$scope.leftMenuBlur = ($event) ->
		if $event.stopPropagation then $event.stopPropagation()
		leftMenu.classList.remove "pushy-open"
		contentBlock.classList.remove "container-push"

	$scope.leftMenuActivator = ($event) ->
		if $event.stopPropagation then $event.stopPropagation()
		leftMenu.classList.add "pushy-open"
		contentBlock.classList.add "container-push"

	$scope.logoMainAnimateClass = { }
	$scope.logoMainAnimateClass[client.animationClass.logo] = $scope.logoSize

	$scope.$watch 'event', (data) ->
		$scope.logoMainAnimateClass[client.animationClass.logo] = data

	$scope.animationContentLeft = client.animationClass.content.left
	$scope.animationContentRight = client.animationClass.content.right

	$scope.leftMenuAnimationType = client.animationClass.leftMenu

	$scope.nextLocation = (path, desc, data) ->
		$rootScope[desc] = data
		if $scope.contentAnimate isnt $scope.animationContentLeft
			$scope.contentAnimate = $scope.animationContentLeft
		$timeout ->
			$location.path path
		, 100

	$scope.backLocation = (path) ->
		if $scope.contentAnimate isnt $scope.animationContentRight
			$scope.contentAnimate = $scope.animationContentRight
		$timeout ->
			$location.path path
		, 100

	$scope.backHistory = ->
		if $scope.contentAnimate isnt $scope.animationContentRight
			$scope.contentAnimate = $scope.animationContentRight
		$timeout ->
			$history.back()
		, 100

	$scope.changeEvent = (path, event) ->
		$rootScope.event = event
		if $rootScope.user
			getData.noCache
				resource: 'participant'
				data: event_id: $rootScope.event.id,
			, (result) ->
				data = result.data
				angular.forEach data, (participant) ->
					if participant.event_id is $rootScope.event.id
						$scope.participient = participant
						if $scope.event.tokensActive and $scope.participient.is_first_visit is "1"	
							message.open $scope.local.first_login
							getData.put { resource: 'participant' }, data: id: $scope.participient.id, extraParam: addTokens: 'firstLogin', (result) ->
								data = result.data
								tokens = data.message.receivedTokens
								$rootScope.updateTokens()
								loto.run tokens, ->
									message.noClose ($scope.polyglot.t "tokens_add", ~~tokens)
		$scope.nextLocation path

	$scope.logOut = ->
		client.user.logOut()
		$rootScope.user = null
		$rootScope.participient = null
		if $location.$$path isnt baseURL.FEEDS
			connection.makeLoad
				params:
					resource: 'event'
					id: $rootScope.event.id
				handler: (data) ->
					if $rootScope.user and $rootScope.event
						connection.makeLoad
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
		$scope.pastEvents = $scope.futureEvents = null
		$rootScope.updateEvents()
		$location.path baseURL.FEEDS

	$scope.toDifferentUrl = (url) ->
		$window.open url, '_system'

	document.addEventListener "deviceready", ->
		try
			analytics.startTrackerWithId 'UA-53492925-1'
			if $rootScope.user
				analytics.setUserId $rootScope.user.id
		document.addEventListener 'backbutton', ->
			if $location.$$path isnt baseURL.FEEDS
				if $scope.contentAnimate isnt $scope.animationContentRight
					$scope.contentAnimate = $scope.animationContentRight
				$timeout ->
					$history.back()
				, 100
			else
				navigator.app.exitApp()
		, true
	
	$rootScope.user = client.user.detail

	if $rootScope.user
		try
			if $rootScope.user
				analytics.setUserId $rootScope.user.id

	$scope.share = "http%3A%2F%2Fwww%2Eatea%2Eno%2Fhovedmeny%2Fatea-community-2014%2F"

	$scope.toComment = ->
  	$location.path $routeParams.feedId + baseURL.COMMENTPAGEHREF

  $scope.renderHtml = (html) ->
  	$sce.trustAsHtml html
]

atea.controller 'LoginController', [ '$scope', '$http', '$rootScope', '$location', 'baseURL', '$routeParams', '$timeout', 'client', 'connection', 'message', '$history', 'Auth',
($scope, $http, $rootScope, $location, baseURL, $routeParams, $timeout, client, connection, message, $history, Auth) ->

	$scope.go_submit = ->
		if $scope.auth.$dirty and $scope.auth.$valid
			message.open $scope.local.log_in
			client.user.login $scope.auth.username, $scope.auth.password
			.then (data) ->
				$rootScope.user = data
				try
					if $rootScope.user
						analytics.setUserId $rootScope.user.id
				message.authoClose ($scope.polyglot.t "login_message", name: data.first_name), ->
					if $rootScope.event
						connection.makeLoad
							params:
								resource: 'event'
								id: $rootScope.event.id
							handler: (data) ->
								$rootScope.event = data
								connection.makeLoad
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
					$history.back()
			, (error) ->
				if error.status is 401
					message.odinAndClose $scope.local.user_exist
					$rootScope.user = null
				else
					message.odinAndClose $scope.local.no_connection
				Auth.clearCredentials()
		else
			message.odinAndClose $scope.local.incorrect_credentials

	$scope.pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
]