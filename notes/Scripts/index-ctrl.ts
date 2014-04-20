module Notes {
    export interface IndexScope extends ng.IScope {
        welcomeMessage: string;
        notes: any;
        newTitle: string;
        newText: string;
        submitNew();
        refreshNotes();
    }
    export class IndexCtrl {
        constructor(private $scope: IndexScope, private $http: ng.IHttpService) {
            $scope.welcomeMessage = "Notes!";

            $scope.refreshNotes = () => {
                this.$http.get('/api/Notes').then(result => {
                    this.$scope.notes = result.data;
                });
            }

            $scope.submitNew = () => {
                var newNote = {
                    Title: this.$scope.newTitle,
                    Text: this.$scope.newText
                };
                this.$http.post('/api/Notes', newNote).then(
                    _ => $scope.refreshNotes());
            };

            $scope.refreshNotes();
        }
    }
} 