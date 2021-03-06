﻿var Notes;
(function (Notes) {
    var IndexCtrl = (function () {
        function IndexCtrl($scope, $http) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            $scope.welcomeMessage = "Notes!";
            $scope.alertMessage = "Loading...";

            // subscribe to SignalR
            var connection = $.hubConnection();
            var proxy = connection.createHubProxy('notesHub');
            connection.start();
            proxy.on('noteAdded', function () {
                var msg = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    msg[_i] = arguments[_i + 0];
                }
                $scope.$apply(function () {
                    $scope.alertMessage = 'New note: ' + msg[0] + '. Loading...';
                    $scope.refreshNotes();
                });
            });

            $scope.refreshNotes = function () {
                _this.$http.get('/api/Notes').then(function (result) {
                    $scope.notes = result.data;
                    $scope.alertMessage = "Refreshed.";
                });
            };

            $scope.submitNew = function () {
                var newNote = {
                    Title: _this.$scope.newTitle,
                    Text: _this.$scope.newText
                };
                _this.$http.post('/api/Notes', newNote).then(function (_) {
                    $scope.refreshNotes();
                    proxy.invoke('addNote', newNote.Title);
                    window.appInsights.logEvent('note added');
                });
            };

            $scope.deleteNote = function (noteId) {
                $scope.alertMessage = "Deleting node Id " + noteId + "...";
                _this.$http.delete('/api/Notes/' + noteId).then(function (_) {
                    $scope.alertMessage = "Note deleted. Refreshing...";
                    $scope.refreshNotes();
                });
            };

            $scope.refreshNotes();
        }
        return IndexCtrl;
    })();
    Notes.IndexCtrl = IndexCtrl;
})(Notes || (Notes = {}));
//# sourceMappingURL=index-ctrl.js.map
