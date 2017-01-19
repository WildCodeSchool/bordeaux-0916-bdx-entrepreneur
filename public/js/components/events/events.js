((app) => {
    app.component('events', {
        templateUrl: 'js/components/events/events.html',
        controller: ['contactsService', function(contactsService) {
                angular.extend(this, {
                    $onInit() {

                        contactsService.get().then((response) => {
                            this.contacts = response.data
                        });


                        let date = new Date();
                        this.hhmm = (new Date(), 'hh:mm');
                        this.carouselstate = 3

                    },

                    add(contact) {
                        this.contacts.push(this.contacts),
                            console.log('this has been added');
                    },

                    loadMore() {
                        this.carouselstate += 3
                    }

                })
            }]
    });
})(angular.module('app.event'))
