angular.module('Chat.services', [])

.factory('Message', function($firebaseArray, CONFIG, md5, $q) {
  var selectedRoomId;
      var chatMessagesForRoom;
      var ref = new Firebase(CONFIG.FIREBASE_URL);

      return {
        get     : get,
        remove  : remove,
        send    : send
      }

      function get(roomId) {
        chatMessagesForRoom = $firebaseArray(ref.child('room-messages').child(roomId).orderByChild("createdAt"));
        return chatMessagesForRoom;
      }

      function remove(chat) {
        chatMessagesForRoom.$remove(chat).then(function (ref) {
          ref.key() === chat.$id; // true item has been removed
        });
      }

      function send(message, username) {
        var deferred = $q.defer();
        if (message) {
          var chatMessage = {
            sender_username: username.name,
            sender_email: username.email,
            sender_id: username.id,
            content: message,
            createdAt: Firebase.ServerValue.TIMESTAMP
          };
          chatMessagesForRoom.$add(chatMessage).then(function (data) {
            deferred.resolve();
          });
          return deferred.promise;
        }
      }
});