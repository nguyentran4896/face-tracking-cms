firebaseConfig = {
  'apiKey': 'AIzaSyD6lWoChm-wwDRv109AhTCg7wl9nk0kgpM',
  'authDomain': 'tss-2272016.firebaseapp.com',
  'databaseURL': 'https://tss-2272016.firebaseio.com',
  'projectId': 'tss-2272016',
  'storageBucket': 'tss-2272016.appspot.com',
  'messagingSenderId': '606469748657'
}


angular
  .module('FaceTracking', ['firebase'])
  .controller('shareController', ['$scope', '$window', '$firebaseObject', '$firebaseArray', '$http', shareController]);

function shareController($scope, $window, $firebaseObject, $firebaseArray, $http) {
  firebase.initializeApp(firebaseConfig);

  $scope.series = [];

  $scope.array = $firebaseArray(firebase.database().ref().child('/Apitiny/liveChatWeb/' + '-L3E-TcOncBtOYOSfCFS' + '/chats'));

  $scope.array.$loaded().then(function(){
    for(let i = 0; i < $scope.array.length; i++) {
      $scope.series.push($scope.array[i]);
    }
  })

  $scope.array.$watch(function(event) {
    $scope.series.push($scope.array[$scope.array.length - 1]);
  });
  

  Highcharts.setOptions({ global: { useUTC: false }});

  // Create the chart
  Highcharts.stockChart('chart', {
    chart: {
      events: {
        load: function () {
          // set up the updating of the chart each second
          var series = this.series[0];
          setInterval(function () {
            var x = (new Date()).getTime(), // current time
              y = Math.round(Math.random() * 100);
            series.addPoint([x, y], true, true);
          }, 1000);
        }
      }
    },

    rangeSelector: {
      buttons: [{
        count: 1,
        type: 'minute',
        text: '1M'
      }, {
        count: 5,
        type: 'minute',
        text: '5M'
      }, {
        type: 'all',
        text: 'All'
      }],
      inputEnabled: false,
      selected: 0
    },

    title: {
      text: 'Live random data'
    },

    exporting: {
      enabled: false
    },

    series: [{
      name: 'Random data',
      data: (function () {
        // generate an array of random data
        var data = [],
          time = (new Date()).getTime(),
          i;

        for (i = -99; i <= 0; i += 1) {
          data.push([
            time + i * 1000,
            Math.round(Math.random() * 100)
          ]);
        }
        return data;
      }())
    },
    {
      name: 'Random data',
      data: (function () {
        // generate an array of random data
        var data = [],
          time = (new Date()).getTime(),
          i;

        for (i = -99; i <= 0; i += 1) {
          data.push([
            time + i * 1000,
            Math.round(Math.random() * 100)
          ]);
        }
        return data;
      }())
    }]
  });
}