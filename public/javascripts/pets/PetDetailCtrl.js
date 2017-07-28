angular.module('Pets')
.controller('PetDetailCtrl', ['$scope', '$http', '$routeParams', '$location', 'MessageService',
  function($scope, $http, $routeParams, $location, MessageService) {
    $scope.pet = {};

    // Social stuffs @TODO: Make a directive
    $scope.tweetDetails = {
      url: $location.absUrl(),
      text: 'Check out this amazing event on Kibbl: ',
    };
    $scope.twitterUrl = 'https://twitter.com/intent/tweet?' + $.param($scope.tweetDetails)

    $scope.faceBookDetails = {
      api_key: 1773720656197985,
      href: $location.absUrl(),
    };
    $scope.facebookUrl = 'https://www.facebook.com/login.php?' + $.param($scope.faceBookDetails);
    $scope.url = $location.absUrl();

    $scope.decodeHTMLEntities = function (text) {
      if (!text) return '';

      var entities = [
          ['amp', '&'],
          ['apos', '\''],
          ['#x27', '\''],
          ['#x2F', '/'],
          ['#39', '\''],
          ['#47', '/'],
          ['lt', '<'],
          ['gt', '>'],
          ['nbsp', ' '],
          ['quot', '"'],
          ['ldquo', '"'],
          ['rsquo', '"'],
          ['#039', '\''],
      ];

      for (var i = 0, max = entities.length; i < max; ++i)
          text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);


      var tweetShit = "Tweet!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='//platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','twitter-wjs');  (function() {var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;po.src = 'https://apis.google.com/js/plusone.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s); })();";
      var tweetShitIndex = text.indexOf(tweetShit);
      if (tweetShitIndex !== -1) {
        text = text.replace(tweetShit, '');
      }

      return text;
    }

    sendRequest();
    function sendRequest() {
      var url = '/api/v1/pets/' + $routeParams.petId;

      $http({
        method: 'GET',
        url: url,
      })
      .then(function (response) {
        $scope.pet = response.data.data;
        $scope.pet.breeds = _.unique($scope.pet.breeds);

        if (!$scope.pet.media || $scope.pet.media.length === 0) $scope.$parent.pageImg = 'https://kibbl.io/images/kibbl-logo-dog.png'
        $scope.$parent.pageImg = $scope.pet.media[0].urlSecureFullsize || 'https://kibbl.io/images/kibbl-logo-dog.png';
        $scope.$parent.pageTitle = $scope.pet.name;
        $scope.$parent.pageDesc = $scope.pet.description;
      });
    }

    $scope.favorite = function () {
      $scope.pet.favorited = !$scope.pet.favorited;

      var url = '/api/v1/pets/' + $routeParams.petId + '/favorite';
      $http({
        method: 'POST',
        url: url,
      })
      .then(function (response) {
        // $scope.pet = response.data.data;
      });
    };

    $scope.sendContact = function () {
      let data = angular.copy($scope.contactDetails);
      data.to = 'keithrholliday@gmail.com';
      data.type = 'pet';
      data.itemId = $scope.pet._id;

      MessageService.sendMessage(data);
    };
  }]);
