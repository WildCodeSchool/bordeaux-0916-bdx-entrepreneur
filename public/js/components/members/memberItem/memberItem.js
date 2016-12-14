((app) => {
    app.component('memberItem', {
        templateUrl: 'js/components/members/memberItem/memberItem.html',
        controller: function($stateParams, contactsService, $state, $scope) {

            contactsService.getById($stateParams.id).then((response) => {
                this.member = response.data;
            });

            contactsService.get().then((response) => {
                this.members = response.data;
                /*console.log(this.members);*/
            });

            this.next = () => {
                // find current member index in members
                // with this index ++
                // with this new index re-affect this.member with this.members[newINdex]
                let index = this.members.findIndex((member) => member._id === this.member._id)
                index++
                let next_member = this.members[index]
                $state.go('member.item', {
                    id: next_member._id
                })
            }


            this.prev = () => {
                let index = this.members.findIndex((member) => member._id === this.member._id)
                index--
                let next_member = this.members[index]
                $state.go('member.item', {
                    id: next_member._id
                })
            }



            this.delete = (member) => {
                contactsService.delete(member).then((response) => {
                    console.log('member deleted');
                    $state.go('member.list')
                })
            };

            this.saveMembers = (member) => {
                contactsService.save(member).then((res) => {
                    console.log("Your Contact Has Been Saved")
                });
            }
            this.createMembers = (member) => {
                contactsService.save(member).then((res) => {
                    console.log("Your Contact Has Been Saved and Updated")
                });
            }

            this.resetTodoState = () => {
                this.members.forEach(function(member) {

                })
            }

            this.editMode = (member, index) => {
                this.member.editMode = true;
            };

            let date = new Date();
            this.hhmm = (new Date(), 'hh:mm');


            $scope.isOpen = false;

            $scope.demo = {
                isOpen: false,
                count: 0,
                selectedDirection: 'right'
            };








        }
    }); //dont delete
})(require('angular').module('app.member'))



/*this.carouselstate = 0

  this.next = () => {
      this.carouselstate ==
          this.member.length - 1 ?
          this.carouselstate = 0 :
          this.carouselstate++
          console.log('search next member');
  }

  this.prev = () => {
      this.carouselstate < 1 ?
          this.carouselstate =
          this.member.length - 1 :
          this.carouselstate--;
      console.log('search prev member');
  }*/
