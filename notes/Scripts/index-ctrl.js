var Notes;
(function (Notes) {
    var IndexCtrl = (function () {
        function IndexCtrl($scope, $http) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            $scope.welcomeMessage = "Notes!";

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
                    $scope.alertMessage = 'New note: ' + msg[0];
                    $scope.refreshNotes();
                });
            });

            $scope.refreshNotes = function () {
                _this.$http.get('/api/Notes').then(function (result) {
                    _this.$scope.notes = result.data;
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
                });
            };

            $scope.refreshNotes();
        }
        return IndexCtrl;
    })();
    Notes.IndexCtrl = IndexCtrl;
})(Notes || (Notes = {}));
//# sourceMappingURL=index-ctrl.js.map
