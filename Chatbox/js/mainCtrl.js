angular.module('chatroom').controller('mainCtrl', function($scope, parseService) {
  $scope.currentRoomId = null;

  // Function to get data from the Parse backend
  $scope.getParseData = function() {
    if ($scope.currentRoomId) {
      parseService.getData($scope.currentRoomId).then(function(response) {
        $scope.messages = response.results.map(message => {
          message.createdAtFormatted = new Date(message.createdAt).toLocaleString();
          return message;
        });
      }).catch(function(error) {
        console.error('Error getting data:', error);
      });
    }
  };

  // Function to post data to the Parse backend
  $scope.postData = function() {
    if ($scope.newMessage && $scope.currentRoomId) {
      parseService.postData($scope.newMessage, $scope.currentRoomId).then(function() {
        $scope.newMessage = ''; // Clear the input field
        $scope.getParseData(); // Refresh messages
      }).catch(function(error) {
        console.error('Error posting data:', error);
      });
    }
  };

  // Function to create a new room
  $scope.createRoom = function() {
    if ($scope.newRoomName) {
      parseService.createRoom($scope.newRoomName).then(function() {
        $scope.newRoomName = ''; // Clear the input field
        $scope.loadRooms(); // Refresh room list
      }).catch(function(error) {
        console.error('Error creating room:', error);
      });
    }
  };

  // Function to load all rooms
  $scope.loadRooms = function() {
    parseService.getRooms().then(function(response) {
      $scope.rooms = response.results;
    }).catch(function(error) {
      console.error('Error getting rooms:', error);
    });
  };

  // Function to switch rooms
  $scope.switchRoom = function(roomId) {
    $scope.currentRoomId = roomId;
    $scope.getParseData();
  };

  // Initial load of rooms
  $scope.loadRooms();

  // Fetch data initially
  $scope.getParseData();

  // Uncomment this code to get new data every 1.5 seconds, mimicking a chat room experience
  setInterval(function() {
    $scope.getParseData();
  }, 1500);
});
