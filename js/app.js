var DossierEdit = angular.module('DossierEdit',['ngRoute','DossierEditcontrollers','DossierEditServices','d2Menu','ui.tinymce']);

DossierEdit.config(['$routeProvider','$locationProvider',
	function($routeProvider, $locationProvider){
		$routeProvider.
			when('/editDossier',{
				templateUrl: 'app/editDossierText.html',
        		controller: 'EditDossierCtrl'
			}).when('/createService',{
				templateUrl: 'app/createService.html',
        		controller: 'CreateServiceCtrl'
        	}).when('/editService',{
				templateUrl: 'app/editService.html',
        		controller: 'EditServiceCtrl'
			}).otherwise({
        		redirectTo: '/editDossier'
      		});

	//$locationProvider.html5Mode(true);		
}]);
