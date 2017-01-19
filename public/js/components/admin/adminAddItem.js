((app) => {
    app.component('adminAddItem', {
        templateUrl: 'js/components/admin/adminAddItem.html',
        controller: ['$stateParams', 'companiesService', '$state', '$mdToast', '$mdDialog', function($stateParams, companiesService, $state, $mdToast, $mdDialog) {
                angular.extend(this, {
                    $onInit() {

                        this.infos = {}

                        // this.editMode = (company, index) => {
                        //     this.company.editMode = true;
                        //     this.company.editMode.onblur = this.saveCompanies;
                        // };
                        //
                        // this.tags = [];
                        //
                        // this.showPrompt = function(ev) {
                        //     // Appending dialog to document.body to cover sidenav in docs app
                        //     var confirm = $mdDialog.prompt()
                        //         .title('Enter the associated social link')
                        //         .textContent('Facebook, Linkedin, Twitter, etc.')
                        //         .placeholder('Social Link')
                        //         .ariaLabel('Social Link')
                        //         .initialValue('')
                        //         .targetEvent(ev)
                        //         .ok('Okay!');
                        //
                        //     $mdDialog.show(confirm).then(function(result) {
                        //         this.status = 'Your social link ' + result + 'is registerd' + '.';
                        //     }, function() {
                        //         this.status = 'You didn\'t name your dog.';
                        //     });
                        // };
                        //
                        this.toolbar = {
                            isOpen: false,
                            count: 0,
                            selectedDirection: 'right'
                        };


                    },
                    saveCompanies(company, fondateur, cofond, cofondbis, image) {
                      companiesService.upload(this.image)
                        this.infos.company = company
                        this.infos.company.image = `img/${this.image.name}`
                        this.infos.fondateur = fondateur
                        this.infos.cofond = cofond
                        this.infos.cofondbis = cofondbis
                        companiesService.add(this.infos).then((res) => {
                            this.newCompany = res.data
                            console.log(this.newCompany);
                        }).catch(() => {

                        });
                    },
                    createCompanies(company) {
                        companiesService.save(company).then((res) => {
                            console.log("Your Contact Has Been Saved and Updated");
                        });
                    }

                })
            }] //dont delete
    }); //dont delete
})(require('angular').module('app.admin'))
