((app) => {
    app.component('company', {
        templateUrl: 'js/components/company/company.html',
        controller: function($stateParams, usersService, companiesService, $state, $scope, $mdToast, $mdDialog, $timeout) {
            let copie = {};

            angular.extend(this, {
                $onInit() {

                    this.editMode = false;
                    this.infos = {}

                    usersService.getCurrent().then((user) => {
                        this.user = user
                    })

                    companiesService.getById($stateParams.id).then((response) => {
                        this.company = response.data
                        this.tags = this.company.tags.join(',')
                        this.social = this.company.social[0]
                        this.fondateur = this.company.fondateur[0]
                        this.cofond = this.company.cofond[0]
                        this.cofondbis = this.company.cofond[1]

                    });


                },
                edit(company, social, tag, image) {
                    if (this.editMode) {
                        if (this.image) {
                            companiesService.upload(this.image)
                            this.infos.image = `img/${this.image.name}`
                        }
                        this.infos = company
                        this.infos.social = social
                        this.infos.tags.push(tag)
                        companiesService.edit(this.infos).then((res) => {
                            this.newCompany = res.config.data
                            console.log(this.newCompany);
                        }).catch(() => {

                        });

                        this.editMode = false
                    } else {
                        copie[company._id] = angular.copy(this.company)
                        this.editMode = true
                    }

                },

                cancel(company) {
                    this.company = copie[company._id]
                    this.editMode = false
                },

                printDiv(printableArea) {
                    var printContents = document.getElementById(printableArea).innerHTML;
                    var popupWin = window.open('', '_blank', 'width=600,height=600');
                    popupWin.document.open();
                    popupWin.document.write('<html><head><link rel="stylesheet" href="css/printablearea.css" media="print"/></head><body onload="window.print()">' + printContents + '</body></html>');
                    popupWin.document.close();
                }
            })
        }
    }); //dont delete
})(angular.module('app.company'))
