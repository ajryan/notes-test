var Notes;
(function (Notes) {
    var IndexCtrl = (function () {
        function IndexCtrl($scope, $http) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            $scope.welcomeMessage = "Notes!";

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
                    return $scope.refreshNotes();
                });
            };

            $scope.refreshNotes();
        }
        return IndexCtrl;
    })();
    Notes.IndexCtrl = IndexCtrl;
})(Notes || (Notes = {}));
//# sourceMappingURL=index-ctrl.js.map
