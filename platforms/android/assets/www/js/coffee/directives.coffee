atea = angular.module 'atea'

atea.directive 'message', [ 'message', (message) ->
	restrict: 'E'
	template: '<div>\
        			<div>\
            		<p>~ message.message ~</p>\
								    <div class="loto" ng-show="loto.number">
								      <div class="wrap">
								        <div class="items" ng-repeat="items in length" ng-style="stylesheet">
								          <div class="item" ng-repeat="item in length" ng-style="stylesheet">
								            ~ $last ? "0" : item ~
								          </div>
								        </div>
								      </div>
								</div>
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
							 <div class="clear"></div>
							 <h3>~setting.subject~</h3>
								 <div	ng-repeat="checkbox in setting.options" style="float: left; margin-right: 3em;">
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
							 <div class="clear"></div>
							 <h3>~setting.subject~</h3>
								 <div	ng-repeat="radio in setting.options" style="float: left; margin-right: 3em;">
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
		# $scope.setting.pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
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
							<div class="clear"></div>
							 <h3>~setting.subject~</h3>
								 <div	ng-repeat="smile in setting.options" style="float: left; margin-right: 1.6em;">
								 	 <label style="cursor: pointer;">
										 <input type="radio"
										 				style="margin-top: 0.3em; display: none;"
														name="~setting.name~"
														value="~smile.answer_value~"
														ng-model="setting.value"
														ng-required="~setting.is_required~"
														placeholder="~setting.placeholder~">
										<img ng-src="img/~smile.subject~.png"/>
									 </label>
								 </div><div class="clear"></div>
							 <h4>~setting.intro~</h4>
						</li>'
	controller: [ '$scope', ($scope) ->

	]
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

atea.directive "loto", (loto, $timeout) ->
	restrict: "C"
	controller: ($scope, $element) ->
		$scope.$watch "loto.length", (data) ->
			$scope.length = loto.length

		$scope.loto = loto
		$scope.$watch "loto._count", (data) ->
			if data is 3
				$timeout ->
					loto.afterFn()
					loto.afterFn = null
					loto.number = null
				, 1000

atea.directive "items", ($timeout, loto) ->
	restrict: "C"
	controller: ($scope, $element) ->
		$scope.length = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
		$scope.$watch "loto.number", (data) ->
			if data
				loto.height = $element[0].clientHeight
				$scope.stylesheet = top: null

				start = 0
				step = ->
					now = new Date().getTime()
					equal = (now - start) / loto.speed

					if step._krugi+1 is loto.krugi
						if loto.height * 10 * equal > step._count * loto.height
							step._count++

					if equal < 1 and (step._krugi < loto.krugi-1 or step._count-1 < loto.number[$scope.$index])
						$scope.stylesheet.top = loto.height * 10 * equal + "px"
						$timeout step, loto.frames
					else
						if step._krugi < loto.krugi
							step._krugi++
							start = new Date().getTime()
							$timeout step, loto.frames
						else
							$scope.stylesheet.top = loto.number[$scope.$index] * loto.height + "px"
							loto._count++

				step._count = 0
				step._krugi = 0
				$timeout ->
					start = new Date().getTime()
					step()
				, ($scope.$index + 1) * loto.speed / 10




atea.directive "item", (loto) ->
	restrict: "C"
	controller: ($scope) ->
		$scope.stylesheet = top: null
		$scope.stylesheet.top = $scope.$index * -loto.height + "px"