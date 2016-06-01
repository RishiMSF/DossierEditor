var DossierEditcontrollers = angular.module('DossierEditcontrollers',['ngSanitize']); 
/*'ui.tinymce' has to be added to angular.module for editor functionality*/

DossierEditcontrollers.controller('DossierEditCtrl', ['$scope','$route', '$location', '$anchorScroll', '$routeParams', '$http',  function($scope, $route, $location, $anchorScroll, $routeParams, $http){
	this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    console.log("Hola main ctrl");
	
	//checking if session is not expired, if expired response is login-page(so then reload)
	ping = function(){	    
	    $.ajax({
		  url: qryPing,
		  dataType:"html",
		  cache: false
		})
		.done(function( data ) {
		    if (data!=="pong"){
             	document.location;
             	document.location.reload(true);
            }
		});
	}

	tabSwitch =function(){
		ping();
		startLoadingState(true);
	}

	endLoadingState = function(){
		// to make sure all emelemnts and indicators are loaded before printing
		$(".loading").hide();
	}

	startLoadingState = function(onlyprint){ 
			$(".loading").show();
	}

}]);

DossierEditcontrollers.controller('EditDossierCtrl',['$scope','Services','ServiceDataSets','Dossier', 'ServiceIndicatorGrps', function($scope,Services,ServiceDataSets,Dossier,ServiceIndicatorGrps){
	console.log("Hola EditDossierCtrl");
	// 	$scope.services = Services.get();
	// 	$scope.serviceDataSets = {};

	// $scope.$watch('selectedService',function(){	 	
	// 	ping();

 //      	if ($scope.selectedService){
 //      		startLoadingState(false);
	// 		$scope.indicatorGroups =  ServiceIndicatorGrps.get({serviceCode:$scope.selectedService.code});
	// 		$scope.serviceDataSets = ServiceDataSets.get({serviceCode:$scope.selectedService.code}); 
	// 		$scope.dossier = Dossier.get({languageCode:$translate.use(),serviceCode:$scope.selectedService.code});
	// 	}
	// });
}]);


DossierEditcontrollers.controller('EditServiceCtrl', ['$scope', '$translate', function($scope, $translate){

}]);

DossierEditcontrollers.controller('CreateServiceCtrl', ['$scope', '$translate', function($scope, $translate){
	
}]);



