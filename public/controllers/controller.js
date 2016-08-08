var myApp = angular.module('myApp',[]);

myApp.controller('appCtrl',['$scope','$http',function($scope,$http){
    console.log('hello from AppCtrl controller');
    
    var refresh=function(){
    $http.get('/contactlist').success(function(response){
       
        console.log('got the response from get request');
        $scope.contactlist = response;
        $scope.contact="";
    });
    };
    
    refresh();
    
    $scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactlist',$scope.contact).success(function(response){
            console.log(response);
            refresh();
        });
    };
    
    $scope.remove = function(id){
        console.log(id);
        $http.delete('/contactlist/'+id).success(function(response){
            refresh();
        });
    };
    
    $scope.edit=function(id){
        document.getElementById("add").disabled = true;
        console.log(id);
        $http.get('/contactlist/'+id).success(function(response){
            $scope.contact=response;
        });
    };
    
    $scope.update = function(){
        console.log($scope.contact._id);
        $http.put('/contactlist/'+$scope.contact._id, $scope.contact)
            .success(function(response){
            document.getElementById("add").disabled = false;
            refresh();
        });
    };
    
    $scope.deselect = function(){
        $scope.contact="";
        
    };
    
    $scope.getData= function(){
        console.log('inside getData method');
        $http.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b730c2fdc6e019515c0dd012744b7d85').success(function(response){
            $scope.data = response;
        })
    }
    
    //$scope.contactlist = contactlist;
}]);