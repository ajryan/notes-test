module Notes {
    export interface IndexScope extends ng.IScope {
        welcomeMessage: string;
        alertMessage: string;
        notes: any;
        newTitle: string;
        newText: string;
        submitNew();
        refreshNotes();
    }
    export class IndexCtrl {
        constructor(private $scope: IndexScope, private $http: ng.IHttpService) {
            $scope.welcomeMessage = "Notes!";

            // subscribe to SignalR
            var connection = $.hubConnection();
            var proxy = connection.createHubProxy('notesHub');
            connection.start();
            proxy.on('noteAdded', (...msg) => {
                $scope.$apply(() => {
                    $scope.alertMessage = 'New note: ' + msg[0];
                    $scope.refreshNotes();
                });
            });

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
                this.$http.post('/api/Notes', newNote).then(_ => {
                    $scope.refreshNotes();
                    proxy.invoke('addNote', newNote.Title);
                    (<any> window).appInsights.logEvent('note added');
                });
            };

            $scope.refreshNotes();
        }
    }
} 