((app) => {
    app.component('company', {
        templateUrl: 'js/components/company/company.html',
        controller: function($stateParams, usersService, companiesService, $state) {
            let copie = {};
            angular.extend(this, {
                $onInit() {

                    this.editMode = false;
                    this.infos = {}
                    this.contacts = []
                    this.hasAccess = false
                    this.isAdmin = false

                    usersService.getCurrent().then((user) => {
                        this.user = user
                        this.isAdmin = this.user.isAdmin
                        this.hasAccess = (this.user.company.find((el) => {
                            return $stateParams.id == el.company._id && el.role == 'Fondateur'
                        })) ||  this.user.isAdmin
                    })
                    companiesService.getById($stateParams.id).then((response) => {
                        this.company = response.data
                        if (this.company.tags && this.company.tags.length > 0) {
                            this.tags = this.company.tags.join(',')
                        }
                        // this.social = this.company.social
                    });

                },
                edit(company, tag, image) {
                    if (this.editMode) {
                        this.infos = company
                        if (this.image) {
                            companiesService.upload(this.image)
                            this.infos.image = `img/${this.image.name}`
                        }
                        // this.infos.social = social
                        this.infos.tags = []
                        this.infos.tags.push(tag)
                        if (this.contacts.length > 0)
                            this.infos.newContacts = this.contacts
                        companiesService.edit(this.infos).then((res) => {
                            this.newCompany = res.config.data
                        }).catch(() => {
                            console.log('error');
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
                    popupWin.document.write(`
                        <html>
                            <head>
                                <link rel="stylesheet" href="css/materialize.min.css" media="print" />
                                <link rel="stylesheet" href="css/app.min.css" media="print" />
                                <link rel="stylesheet" href="css/printablearea.css" media="print" />
                            </head>
                            <body onload="window.print()">
                                ${printContents}
                            </body>
                        </html>`);
                    popupWin.document.close();
                },
                addUser() {
                    this.contacts.push({})
                },
                deleteUser(idx) {
                    this.company.contacts.splice(idx, 1)
                },
                delete(company) {
                    companiesService.delete(company).then(() => {
                        return $state.go('app.home')
                    }).then(() => {
                        $state.reload()
                    })
                }
            })
        }
    }); //dont delete
})(angular.module('app.company'))
