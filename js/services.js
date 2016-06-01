var dhisroot = window.location.href.split('/api/')[0]
var dhisUrl = dhisroot + '/api/';

//http://localhost:8989/dhis/api/system/info   , contextPath

var qryPing = dhisUrl + 'system/ping';

//Health Service tab
var qryServices = dhisUrl +  'dataElements.json?fields=id,displayDescription,code&paging=false&filter=name\\:like\\:ZZD';
var qryDossier  = dhisUrl + 'sqlViews/ehqwjoIcBmn/data.json?var=languageCode::languageCode&var=serviceCode::serviceCode';
//only id because section Displynames are not transleted in these datasets(childeren aren't translated) (otherwise could have done all in one call :/ )
var qryServiceDataSets = dhisUrl + 'dataSets.json?fields=id,displayName,sections[id]&paging=false&filter=attributeValues.value\\:eq\\::serviceCode';
var qryServiceIndicatorGrps= dhisUrl + 'indicatorGroups.json?fields=id,displayName&paging=false&filter=attributeValues.value\\:eq\\::serviceCode';

var qryIndicatorGrps= dhisUrl + 'indicatorGroups.json?fields=id,displayName&paging=false&translate=true';
var qryDataSets = dhisUrl + 'dataSets.json?fields=id,displayName,sections[id]&paging=false&translate=true';

var DossierEditServices = angular.module('DossierEditServices', ['ngResource']);

DossierEditServices.factory('Ping', ['$resource',
function($resource){
  return $resource(qryPing, {}, {
      query: {method:'GET', transformResponse: function (data, headers) {
                //if no data return so no warnings
                if (data == ''){
                    return;
                }

                return {data: $.extend({}, eval("{" + data + '}'))};
            }} 
    });
}]);

DossierEditServices.factory('Dossier', ['$resource',
function($resource){
  return $resource(qryDossier, {languageCode:'@languageCode',serviceCode:'@serviceCode'}, {
      query: {method:'GET',  isArray:true}
    });
}]);


DossierEditServices.factory('ServiceDataSets', ['$resource',
function($resource){
  return $resource(qryServiceDataSets, {serviceCode:'@serviceCode'}, {
      query: {method:'GET',  isArray:false}
    });
}]);

DossierEditServices.factory('IndicatorGroups', ['$resource',
function($resource){
  return $resource(qryIndicatorGrps, {}, {
      query: {method:'GET',  isArray:false}
    });
}]);

DossierEditServices.factory('ServiceIndicatorGrps', ['$resource',
function($resource){
  return $resource(qryServiceIndicatorGrps, {serviceCode:'@serviceCode'}, {
      query: {method:'GET',  isArray:false}
    });
}]);
//qryIndicatorGrps

DossierEditServices.factory('Services', ['$resource',
function($resource){
  return $resource(qryServices, {}, {
      query: {method:'GET',  isArray:false}
    });
}]);

/* DATA SET */

DossierEditServices.factory('DataSets', ['$resource',
function($resource){
  return $resource(qryDataSets, {}, {
      query: {method:'GET',  isArray:true}
    });
}]);
