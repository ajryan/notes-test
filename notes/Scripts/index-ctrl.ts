module Notes {
    export interface IndexScope extends ng.IScope {
        welcomeMessage: string;
        alertMessage: string;
        notes: any;
        newTitle: string;
        newText: string;
        submitNew();
        refreshNotes();
        deleteNote(noteId: number);
    }
    export class IndexCtrl {
        constructor(private $scope: IndexScope, private $http: ng.IHttpService) {
            $scope.welcomeMessage = "Notes!";
            $scope.alertMessage = "Loading...";

            // subscribe to SignalR
            var connection = $.hubConnection();
            var proxy = connection.createHubProxy('notesHub');
            connection.start();
            proxy.on('noteAdded', (...msg) => {
                $scope.$apply(() => {
                    $scope.alertMessage = 'New note: ' + msg[0] + '. Loading...';
                    $scope.refreshNotes();
                });
            });

            $scope.refreshNotes = () => {
                this.$http.get('/api/Notes').then(result => {
                    $scope.notes = result.data;
                    $scope.alertMessage = "Refreshed.";
                });
            }

            $scope.submitNew = () => {
                var newNote = {
                    Title: this.$scope.newTitle,
                    Text: this.$scope.newText
                };
                this.$http.post('/api/Notes', newNote).then(_ => {
                    $scope.refreshNotes();
                    proxy.invoke('addNote', newNote.Title);
                    (<any> window).appInsights.logEvent('note added');
                });
            };

            $scope.deleteNote = (noteId: number) => {
                $scope.alertMessage = "Deleting node Id " + noteId + "...";
                this.$http.delete('/api/Notes/' + noteId).then(_ => {
                    $scope.alertMessage = "Note deleted. Refreshing...";
                    $scope.refreshNotes();
                });
            };

            $scope.refreshNotes();
        }
    }
} 