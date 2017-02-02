((app) => {
    app.component('company', {
        templateUrl: 'js/components/company/company.html',
        controller: ['$stateParams', 'usersService', 'companiesService', '$state', 'toastr', function($stateParams, usersService, companiesService, $state, toastr) {
            let copie = {}
            angular.extend(this, {
                $onInit() {

                    this.editMode = false;
                    this.infos = {}
                    this.contacts = []
                    this.hasAccess = false
                    this.isAdmin = false
                    this.showModal = false


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
                        this.tags = this.company.tags.join('').split(',')

                        usersService.get().then((allusers) => {
                            this.allusers = allusers.data.filter((user) => {
                                return !(this.company.contacts.find(e => e._id === user._id))
                            })
                        })

                    });

                },
                edit(company, tag, image, selectedUser) {
                    if (this.editMode) {
                        this.infos = company
                        if (this.image) {
                            companiesService.upload(this.image)
                            this.infos.image = `img/${this.image.name}`
                        }
                        this.infos.tags = []
                        this.infos.tags.push(tag)

                        if (this.contacts.length > 0)
                            this.infos.newContacts = this.contacts.filter(value => Object.keys(value).length !== 0)
                        if (selectedUser && this.infos.newContacts) {
                            selectedUser.forEach((el) => {
                                this.infos.newContacts.push(JSON.parse(el))
                            })
                        } else if (selectedUser && !this.infos.newContacts) {
                            this.infos.newContacts = []
                            selectedUser.forEach((el) => {
                                this.infos.newContacts.push(JSON.parse(el))
                            })
                        }

                        companiesService.edit(this.infos).then((res) => {
                            this.newCompany = res.config.data
                            $state.reload()
                            toastr.success('Société modifiée')
                        }).catch((err) => {
                            toastr.error(`${err.data} !`)
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
                archive(company) {
                    company.active = false
                    companiesService.edit(company).then(() => {
                        $state.go('app.home')
                    })
                }
            })
        }]
    })
})(angular.module('app.company'))
