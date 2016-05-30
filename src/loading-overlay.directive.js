(function() {
	'use strict';

	angular
	.module('caLoadingOverlay')
	.directive('caLoadingOverlay', CaLoadingOverlay);

	/** @ngInject */
	function CaLoadingOverlay() {
		var directive = {
			restrict: 'E',
			templateUrl: 'ca-loading-overlay/loading-overlay.html',
			scope: {},
			link: link,
			controller: CaLoadingOverlayController,
			controllerAs: 'vm',
			bindToController: true
		};
		return directive;

		function link(scope, element, attrs) {
			scope.showAnimation = false;
			scope.$on('$stateChangeStart', function () {
				scope.showAnimation = true;
			});
			scope.$on('$stateChangeSuccess', function () {
				scope.showAnimation = false;
			});
		}

		/** @ngInject */
		function CaLoadingOverlayController() {
			var vm = this;
		}
	}
})();
