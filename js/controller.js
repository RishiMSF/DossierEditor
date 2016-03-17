var HmisReportcontrollers = angular.module('HmisReportcontrollers',['ngSanitize','pascalprecht.translate','ui.tinymce']);

// HmisReport.controller('HmisReportCtrl', ['$scope','Services', function($scope, Services){
// 	// master controler, does not do much but when multiple tabs  are enabled again then it will have a function
// }]);

HmisReportcontrollers.controller('ServiceController',['$scope','$translate','Services','ServiceDataSets','Dossier', 'IndicatorGroups', function($scope,$translate,Services,ServiceDataSets,Dossier,IndicatorGroups){
	$scope.services = Services.get();
	$scope.toc={
				 entries : []
	};
	
	$scope.getServiceData = function(){
		$scope.toc={entries:[]};
		$scope.indicatorGroups =  IndicatorGroups.get({serviceCode:$scope.selectedService.code});
		$scope.serviceDataSets = ServiceDataSets.get({serviceCode:$scope.selectedService.code}); 
		$scope.dossier = Dossier.get({languageCode:$translate.use(),serviceCode:$scope.selectedService.code});
	}

	// $scope.filterByDataSet = function(sc){
	// 	var inDataSet = false;
	// 	//console.log($scope.sections.length);	
	// 	angular.forEach($scope.dataset.sections, function(dsSection){
	// 		if (sc.id === dsSection.id) {
	// 			inDataSet = true;
	// 		}
	// 	});
	// 	return inDataSet;	
	// }

	addtoTOC = function(items,parent, type){
		var index = $scope.toc.entries.push({
			'parent':parent,
			 'children': items
		})
		// angular.forEach(items, function(item){
		// 	$scope.toc.parent.entries.push({
		// 		'entry':item
		// 	});

		// 	//$scope.tocEntries[item.id] = item.displayName;
		// 	//console.log("in addtoTOC " + item.displayName);
		// });
	};

}]);


HmisReportcontrollers.controller('SectionController', ['$scope','ServiceSections', function($scope, ServiceSections){
    $scope.getSections = function(dataset){
		$scope.sections = ServiceSections.get({datasetId:dataset.id},function(){
			addtoTOC($scope.sections.sections,dataset,"dataset");	
		});
	}
}]);


HmisReportcontrollers.controller('ElementsTableController',['$scope','Elements',function($scope,Elements){
	$scope.getElementsInSection = function(section){
		var elementIds;

		$scope.dataElements = {};

		angular.forEach(section.dataElements, function(element,key){
			if (key!=0){			
				elementIds += "," + element.id;
			}else{
				elementIds = element.id;
			}
		});

		$scope.dataElements = Elements.get({IdList:"[" + elementIds + "]"});	
	}
}])

HmisReportcontrollers.controller('ElementsTableController',['$scope','Elements',function($scope,Elements){
	$scope.getElementsInSection = function(section){
		var elementIds;

		$scope.dataElements = {};

		angular.forEach(section.dataElements, function(element,key){
			if (key!=0){			
				elementIds += "," + element.id;
			}else{
				elementIds = element.id;
			}
		});

		$scope.dataElements = Elements.get({IdList:"[" + elementIds + "]"});	
	}
}])

HmisReportcontrollers.controller('IndicatorController',['$scope','IndicatorGroup',function($scope,IndicatorGroup){
	$scope.getIndicators = function(id){
		$scope.indicatorGroup = IndicatorGroup.get({indicatorGrpId:id}, function(){
			addtoTOC($scope.sections.sections,dataset,"indicatorGroup");
		}); 
	};

	// numinator and denominator description is in indicator description
	//(translatation doesn't work for denom and num columns) so have be extracted
	$scope.getNuminator = function(indicator){
		var re = /(NUM:)(.*)(DENOM:)/;
		var result = re.exec(indicator.displayDescription);
		if (result!== null){
			return result.length > 1 ? result[2] : "x";
		}
	}

	$scope.getDenominator = function(indicator){
		var re = /(DENOM:)(.*)/;
		var result = re.exec(indicator.displayDescription);
		if (result!== null){
			return result.length > 1 ? result[2] : "x";
		}
	}

	$scope.getDescription = function(indicator){
		var re = /(.*)(NUM:)/;
		var result = re.exec(indicator.displayDescription);
		if (result!== null){
			return result[1];
		}
		else{
			return indicator.displayDescription;
		}
	}
}])

HmisReportcontrollers.config(function ($translateProvider) {
	  
	  $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
    });
	  
	  $translateProvider.registerAvailableLanguageKeys(
			    ['es', 'fr', 'en', 'pt'],
			    {
			        'en*': 'en',
			        'es*': 'es',
					'fr*': 'fr',
					'pt*': 'pt',
			        '*': 'en' // must be last!
			    }
			);
	  
	  $translateProvider.fallbackLanguage(['en']);

	  jQuery.ajax({ url: dhisUrl + 'userSettings/keyUiLocale/', contentType: 'text/plain', method: 'GET', dataType: 'text', async: false}).success(function (uiLocale) {
		  if (uiLocale == ''){
			 $translateProvider.determinePreferredLanguage();
		  }
		  else{
			 $translateProvider.use(uiLocale);
		  }
    }).fail(function () {
  	  $translateProvider.determinePreferredLanguage();
	  });
	  
});


//TO DO:
// 
//Dossier Elements will contain service  code, the dataset with the most amount of elements will have this service code as well 
// if service code refers to more than one dataset all these datasets elements will have to be added to the dossier
// indicatorgroup will have service code as well, if the same service code belongs to more than one indicatorgroup then these indicagtor groups have to be added to the dossier.
//dropdown will show form name  of dossier data elements as service
//for title in service tab the description will be used.