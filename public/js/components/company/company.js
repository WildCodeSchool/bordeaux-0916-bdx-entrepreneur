((app) => {
    app.component('company', {
        templateUrl: 'js/components/company/company.html',
        controller: function($stateParams, usersService, companiesService, $state) {
            let copie = {};
            angular.extend(this, {
                $onInit() {

                    this.editMode = true;
                    this.infos = {}

                    usersService.getCurrent().then((user) => {
                        this.user = user
                    })

                    companiesService.getById($stateParams.id).then((response) => {
                        this.company = response.data
                        if (this.company.tags && this.company.tags.length > 0)
                            this.tags = this.company.tags.join(',')
                        this.social = this.company.social

                    });


                },
                edit(company, social, tag, image) {
                    if (this.editMode) {
                      this.infos = company
                        if (this.image) {
                            companiesService.upload(this.image)
                            this.infos.image = `img/${this.image.name}`
                        }
                        this.infos.social = social
                        this.infos.tags = []
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

                printDiv() {
                    let printContents = document.getElementById('bigcard').innerHTML;
                    let popupWin = window.open('', '_blank', 'width=600,height=600');
                    popupWin.document.open();
                    popupWin.document.write('<html><head><link rel="stylesheet" href="css/printablearea.css" media="print"/></head><body onload="window.print()">' + printContents + '</body></html>');
                    popupWin.document.close();
                },
                addUser() {
                    this.company.contacts.push({})
                },
                deleteUser(idx) {
                    this.company.contacts.splice(idx, 1)
                }
            })
        }
    }); //dont delete
})(angular.module('app.company'))
