angular.module('chatroom').service('parseService', function($http) {
  const baseUrl = 'https://api.parse.com/1/classes/';
  const chatUrl = baseUrl + 'chat';
  const roomUrl = baseUrl + 'rooms';

  // Function to retrieve chat messages
  this.getData = function(roomId) {
    return $http.get(chatUrl + '?where={"roomId":"' + roomId + '"}&order=-createdAt')
      .then(function(response) {
        return response.data;
      }).catch(function(error) {
        console.error('Error retrieving data:', error);
      });
  };

  // Function to post chat messages
  this.postData = function(message, roomId) {
    const data = { text: message, roomId: roomId };
    return $http.post(chatUrl, data)
      .then(function(response) {
        return response.data;
      }).catch(function(error) {
        console.error('Error posting data:', error);
      });
  };

  // Function to create a new room
  this.createRoom = function(roomName) {
    const data = { name: roomName };
    return $http.post(roomUrl, data)
      .then(function(response) {
        return response.data;
      }).catch(function(error) {
        console.error('Error creating room:', error);
      });
  };

  // Function to get all rooms
  this.getRooms = function() {
    return $http.get(roomUrl)
      .then(function(response) {
        return response.data;
      }).catch(function(error) {
        console.error('Error retrieving rooms:', error);
      });
  };
});
