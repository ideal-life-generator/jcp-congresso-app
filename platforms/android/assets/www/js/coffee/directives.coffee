atea = angular.module 'atea'

atea.directive 'message', [ 'message', (message) ->
	restrict: 'E'
	template: '<div>\
        			<div>\
            		<p>~ message.message ~</p>\
        			</div>\
    				</div>'
	scope: true
	controller: [ '$scope', '$element', ($scope, $element) ->
		$scope.message = message
		$scope.closeMessage = message.close
	]
]

atea.directive 'connection', [ 'connection', '$window', (connection, $window) ->
	restrict: 'E'
	scope: true
	controller: [ '$scope', ($scope) ->
		$scope.connection = connection
		$scope.$watch 'connection', ->
			$scope.status = connection.status
		, true
		$scope.refresh = ->
			if not connection.loading
				$scope.connection.handler()
		$window.ononline = ->
			if connection.handler
				$scope.refresh()
	]
]

atea.directive 'loader' , [ ->
	restrict: 'E'
	template: '<div ng-show="loader"
									class="loader">
							<div ng-show="loading"
									 class="loading">
							</div>
							<div ng-click="updater()"
								 	 ng-show="warning"
									 class="warning">
								<p>~ noConnectionMessage ~</p>
							</div>
						</div>'
	replace: true
	controller: [ '$scope', ($scope) ->

	]
]

atea.directive 'warning', [ 'connectionTest', '$window', (connectionTest, $window) ->
	restrict: 'C'
	controller: [ '$scope', ($scope) ->
		$scope.message = connectionTest.message
		$scope.updater = ->
			if not $scope.update
				$scope.loading = on
				$scope.warning = off
				$scope.f()

		$window.ononline = ->
			if $scope.f
				$scope.updater()
	]
]

atea.directive 'cSwiperight', [ '$timeout', ($timeout) ->
	restrict: 'A'
	scope: true
	controller: [ '$scope', '$element', '$attrs', ($scope, $element, $attrs) ->
		x = xS = 0
		timeout = null
		mousemove = (event) ->
			event.stopPropagation()
			x = event.clientX - xS
		element = angular.element $element
		.on "mousedown", (event) ->
			event.stopPropagation()
			xS = event.clientX
			$timeout ->
				if window.innerWidth / 5 < x
					$scope[$attrs.cSwiperight]()
			, 150
			angular.element this, event
			.on "mousemove", mousemove
		.on "mouseup", (event) ->
			event.stopPropagation()
			x = Xs = 0
			angular.element this, event
			.off "mousemove"
	]
]

atea.directive 'surveyText', [ () ->
	restrict: 'E'
	replace: true
	scope:
		setting: '='
	template: '<li>
							 <h3>~setting.subject~</h3>
							 <input type="text"
											class="form-control"
											name="~setting.name~"
											ng-model="setting.value"
											ng-minlength="~setting.min_length~"
											ng-maxlength="~setting.max_length~"
											ng-required="~setting.is_required~"
											placeholder="~setting.placeholder~">
							 <h4>~setting.intro~</h4>
						</li>'
	controller: [ '$scope', ($scope) ->
	]
]

atea.directive 'surveyTextarea', [ () ->
	restrict: 'E'
	replace: true
	scope:
		setting: '='
	template: '<li>
							 <h3>~setting.subject~</h3>
							 <textarea type="text"
												 class="form-control"
												 name="~setting.name~"
												 ng-model="setting.value"
												 ng-minlength="~setting.min_length~"
												 ng-maxlength="~setting.max_length~"
												 ng-required="~setting.is_required~"
												 placeholder="~setting.placeholder~">
							 </textarea>
							 <h4>~setting.intro~</h4>
						</li>'
	controller: [ '$scope', ($scope) ->

	]
]

atea.directive 'surveyCheckboxlist', [ () ->
	restrict: 'E'
	replace: true
	scope:
		setting: '='
	template: '<li>
							 <h3>~setting.subject~</h3>
								 <div	ng-repeat="checkbox in setting.options">
								 	 <label>
										 <input type="checkbox"
														name="~setting.name~"
														value="~checkbox.answer_value~"
														ng-model="checkbox.value"
														ng-required="~setting.is_required~"
														placeholder="~setting.placeholder~">
										 ~ checkbox.subject ~
									 </label>
								 </div>
							 <h4>~setting.intro~</h4>
						</li>'
	controller: [ '$scope', ($scope) ->

	]
]

atea.directive 'surveyRadiolist', [ () ->
	restrict: 'E'
	replace: true
	scope:
		setting: '='
	template: '<li>
							 <h3>~setting.subject~</h3>
								 <div	ng-repeat="radio in setting.options">
								 	 <label>
										 <input type="radio"
														name="~setting.name~"
														value="~radio.answer_value~"
														ng-model="setting.value"
														ng-required="~setting.is_required~"
														placeholder="~setting.placeholder~">
										 ~ radio.subject ~
									 </label>
								 </div>
							 <h4>~setting.intro~</h4>
						</li>'
	controller: [ '$scope', ($scope) ->

	]
]

atea.directive 'surveyDropdownlist', [ () ->
	restrict: 'E'
	replace: true
	scope:
		setting: '='
	template: '<li>
							 <h3>~setting.subject~</h3>
								 <div>
								 	 <select class="form-control"
													 name="~setting.name~"
													 ng-model="setting.value"
													 ng-required="~setting.is_required~"
													 placeholder="~setting.placeholder~"
													 ng-required="~setting.is_required~">
										 <option value=""
										 				 disabled="~setting.is_required~">-- Select value --</option>
										 <option ng-repeat="option in setting.options"
										 				 type="radio"
														 value="~option.answer_value~">
												~ option.subject ~
										 </option>
									 </select>
								 </div>
							 <h4>~setting.intro~</h4>
						</li>'
	controller: [ '$scope', ($scope) ->

	]
]

atea.directive 'surveyEmail', [ () ->
	restrict: 'E'
	replace: true
	scope:
		setting: '='
	template: '<li>
							 <h3>~setting.subject~</h3>
							 <input type="email"
											class="form-control"
											name="~setting.name~"
											ng-model="setting.value"
											ng-minlength="0"
											ng-maxlength="250"
											ng-required="~setting.is_required~"
               				ng-pattern="setting.pattern"
											placeholder="~setting.placeholder~">
							 <h4>~setting.intro~</h4>
						</li>'
	controller: [ '$scope', ($scope) ->
		$scope.setting.pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
	]
]

atea.directive 'surveyNumber', [ () ->
	restrict: 'E'
	replace: true
	scope:
		setting: '='
	template: '<li>
							 <h3>~setting.subject~</h3>
							 <input type="number"
											class="form-control"
											name="~setting.name~"
											ng-model="setting.value"
											ng-minlength="~setting.min_length~"
											ng-maxlength="~setting.max_length~"
											ng-required="~setting.is_required~"
											placeholder="~setting.placeholder~">
							 <h4>~setting.intro~</h4>
						</li>'
	controller: [ '$scope', ($scope) ->

	]
]

atea.directive 'surveyMobile', [ () ->
	restrict: 'E'
	replace: true
	scope:
		setting: '='
	template: '<li>
							 <h3>~setting.subject~</h3>
							 <input type="text"
											class="form-control"
											name="~setting.name~"
											ng-model="setting.value"
											ng-minlength="~setting.min_length~"
											ng-maxlength="~setting.max_length~"
											ng-required="~setting.is_required~"
											placeholder="~setting.placeholder~">
							 <h4>~setting.intro~</h4>
						</li>'
	controller: [ '$scope', ($scope) ->
		# $scope.pattern = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
	]
]

atea.directive 'surveySmiles', [ () ->
	restrict: 'E'
	replace: true
	scope:
		setting: '='
	template: '<li>
							 <h3>~setting.subject~</h3>
								 <div	ng-repeat="smile in setting.options">
								 	 <label style="cursor: pointer; height: 2.3em;">
										 <input type="radio"
										 				style="margin-top: 0.3em;"
														name="~setting.name~"
														value="~smile.answer_value~"
														ng-model="setting.value"
														ng-required="~setting.is_required~"
														placeholder="~setting.placeholder~">
										<img ng-src="img/~smile.subject~.png"/>
										<span>~smile.subject~</span>
									 </label>
								 </div>
							 <h4>~setting.intro~</h4>
						</li>'
	controller: [ '$scope', ($scope) ->

	]
]

atea.factory "loto", ->
	loto =
		run: (number, fn) ->
			loto.number = number
			loto.afterFn = fn
		krugi: 1
		speed: 1600
		frames: 16
		_count: 0

atea.directive "loto", (loto) ->
	restrict: "C"
	controller: ($scope, $element) ->
		$scope.length = [ 0, 1, 2 ]
		$scope.loto = loto
		$scope.$watch "loto._count", (data) ->
			if data is 3
				loto.afterFn()
				loto.afterFn = null

atea.directive "items", ($timeout, loto) ->
	restrict: "C"
	controller: ($scope) ->
		$scope.$watch "loto.number", (data) ->
			if data
				$scope.length = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
				$scope.stylesheet = top: null

				start = 0
				step = ->
					now = new Date().getTime()
					equal = (now - start) / loto.speed
					if 1242 * equal > step._count * 1242 / 9
						step._count++
					if equal < 1 and loto.number[$scope.$index] > step._count - 1
						$scope.stylesheet.top = 1242 * equal + "px"
						$timeout step, loto.frames
					else
						loto._count++
						$scope.stylesheet.top = (step._count - 1) * 1242 / 9 + "px"
					# if equal < 1 and step._krugi < loto.krugi or (loto.number[$scope.$index] > step._count-1)
					# 	$scope.stylesheet.top = 1242 * equal + "px"
					# 	$timeout step, loto.frames
					# else
					# 	if step._krugi <= loto.krugi
					# 		start = new Date().getTime()
					# 		$timeout step, loto.frames
					# 		step._count = 0
					# 		step._krugi++
					# 	else if step._krugi > loto.krugi
					# 		$scope.stylesheet.top = (step._count - 1) * 1242 / 9 + "px"



				step._count = 0
				step._krugi = 0
				$timeout ->
					start = new Date().getTime()
					step()
				, ($scope.$index + 1) * loto.speed / 9




atea.directive "item", ->
	restrict: "C"
	controller: ($scope) ->
		$scope.stylesheet = top: null
		$scope.stylesheet.top = $scope.$index * -138 + "px"