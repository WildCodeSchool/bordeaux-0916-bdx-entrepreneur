((app) => {
    app.component('membersList', {
            templateUrl: 'js/components/members/membersList/membersList.html',
            controller: function(contactsService) {

                    contactsService.get().then((response) => {
                        this.contacts = response.data
                    });

                    this.add = (contact) => {
                        this.contacts.push(this.contacts),
                            console.log('this has been added');
                    };



                    let date = new Date();
                    this.hhmm = (new Date(), 'hh:mm');


                    this.carouselstate = 3
                    this.loadMore = () => {
                        this.carouselstate += 3
                    };

                    /*this.carouselstate = 0

                      this.next = () => {
                          this.carouselstate ==
                              this.members.length - 1 ?
                              this.carouselstate = 0 :
                              this.carouselstate++
                              console.log('search next members');
                      }

                      this.prev = () => {
                          this.carouselstate < 1 ?
                              this.carouselstate =
                              this.members.length - 1 :
                              this.carouselstate--;
<<<<<<< HEAD:public/js/components/members/membersList/membersList.js
                          console.log('search prev members');
=======
                          console.log('search prev member');
>>>>>>> fb39bff87dd26e6422dea99d2167ce7c310e6755:public/js/components/members/membersList/membersList.js
                      }*/


              } //dont delete
        }); //dont delete
})(require('angular').module('app.member'))
