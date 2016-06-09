var DossierEditcontrollers = angular.module('DossierEditcontrollers',['ngSanitize']); 


DossierEditcontrollers.controller('TinyMceController',['$scope', function($scope) {
  

}]);

DossierEditcontrollers.controller('DossierEditCtrl', ['$scope','$route', '$location', '$anchorScroll', '$routeParams', '$http',  function($scope, $route, $location, $anchorScroll, $routeParams, $http){
	this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
   
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
		startLoadingState();
	}

	endLoadingState = function(){
		// to make sure all emelemnts and indicators are loaded before printing
		$(".loading").hide();
	}

	startLoadingState = function(){ 
			$(".loading").show();
	}

}]);

DossierEditcontrollers.controller('EditDossierCtrl',['$scope','Services','Dossier', function($scope,Services,Dossier){
	startLoadingState();

	$scope.tinymceModel = '-';

  $scope.getContent = function() {
    console.log('Editor content:', $scope.tinymceModel);
  };

  $scope.setContent = function() {
    $scope.tinymceModel = 'Time: ' + (new Date());
  };

  $scope.disableTinyEditor = function(){
  	$scope.tinymceOptions = {
	    plugins: 'link image code',
	    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
	    readonly : 1
	};

  }

  $scope.enableTinyEditor = function(){
  	tinymce.activeEditor.setMode('design');
  }

  $scope.disableTinyEditor();


	$scope.languages = { "languages": [{
            			"language": "english",
            			"code": "en"
        			},{
            			"language": "french",
            			"code": "fr"
        			}]
   				 };

	$scope.services = Services.get(function(){
		endLoadingState();
	});

	$scope.$watchGroup(['selectedService','selectedLanguage'],function(newValues, oldValues){	 	
		ping();

      	if (!angular.isUndefined($scope.selectedLanguage) && !angular.isUndefined($scope.selectedService)){
      		startLoadingState();
      		 console.log("Hola edit ctrl");
	
			$scope.dossier = Dossier.get({languageCode:$scope.selectedLanguage.code,serviceCode:$scope.selectedService.code},function(data){
				$scope.enableTinyEditor();
				console.log(data);
				$scope.tinymceModel = data.rows[0][0];
				endLoadingState();
			});
			
		}
	});
}]);


DossierEditcontrollers.controller('EditServiceCtrl', ['$scope', '$translate', function($scope, $translate){

}]);

DossierEditcontrollers.controller('CreateServiceCtrl', ['$scope', '$translate', function($scope, $translate){
	
}]);



