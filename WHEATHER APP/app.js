var mainApp = angular.module("mainApp", []);

mainApp.value("defaultInput");

mainApp.service('GeolocationService', function($http){
    this.getLocation = function(){
        return $http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAmMibvNvCNa8fNeyG1_iGmwolgRSTnyKg ');
    }
});

mainApp.factory('WeatherApiService', function($http) {
    var factory = {};

    factory.requestWeatherByCity = function(town){
        var URL = 'http://api.openweathermap.org/data/2.5/weather?';
  
        var request = {
            method: 'GET',
            url: URL,
            params: {
                q: town,
                mode: 'json',
                units: 'metric',
                cnt: '7',
                appid: '69279444320403e83591dac64cdf5746'
            }
        };
        return $http(request);
    }

    return factory;
});

mainApp.service('WeatherService', function(WeatherApiService){
    this.getWeatherByCity = function(town){
        return WeatherApiService.requestWeatherByCity(town);
    }
});

mainApp.controller('WeatherController', function($scope, WeatherService, GeolocationService, defaultInput) {
  $scope.number = defaultInput;
    GeolocationService.getLocation()
    .success(function(data){
        WeatherService.getWeather(data.location.lat, data.location.lng).then(function(response) {
            //console.log(response.data);// has more fields!!!
            
            $scope.city = response.data.name;
            $scope.temp = response.data.main.temp;
            $scope.wind = response.data.wind.speed;          
            $scope.myVar = "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png";   
          $scope.code = response.data.weather[0].description;
          $scope.hum = response.data.main.humidity;
          
            //to do: later add more fields to weather widget!!!           
        });
    })
    .error(function(err){
      console.log(err);
    }); // todo: later move this to factory
    
    $scope.square = function() {
        WeatherService.getWeatherByCity($scope.number).then(function(response) {
            //console.log(response.data);// has more fields!!!
            
            $scope.city = response.data.name;
            $scope.temp = response.data.main.temp;
            $scope.wind = response.data.wind.speed;
            $scope.myVar = "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png";   
          $scope.code = response.data.weather[0].description;
          $scope.hum = response.data.main.humidity;
          
            //to do: later add more fields to weather widget!!!           
        });
    }
});