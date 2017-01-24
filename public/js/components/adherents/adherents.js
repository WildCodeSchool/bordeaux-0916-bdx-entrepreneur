((app) => {
    'use strict'
    app.component('adherents', {
        templateUrl: 'js/components/adherents/adherents.html',
        controller: ['usersService', '$state', function(usersService, ngJsonExportExcel, $state) {
            angular.extend(this, {
                $onInit() {

                  this.active = []
                  this.inactive = []
                  this.company;

                    let affect = (adherent) => {
                        if (adherent.active === true) {
                            this.company = adherent.company[0]
                            delete adherent.company
                            adherent.company = this.company
                            this.active.push(adherent)
                        } else
                            this.inactive.push(adherent)
                    }


                    usersService.get().then((res) => {
                        this.adherents = res.data
                        console.log(this.adherents);
                        this.adherents.forEach((adherent) => {
                            affect(adherent)
                        })
                    })

                },
                disable(index) {
                    this.selected = this.active[index]
                    this.active.splice(index, 1)
                    this.selected.active = false
                    this.inactive.push(this.selected)
                    usersService.edit(this.selected).then((res) => {
                        console.log(res);
                    })
                },
                activate(index) {
                    this.selected = this.inactive[index]
                    this.inactive.splice(index, 1)
                    this.selected.active = true
                    this.active.push(this.selected)
                    usersService.edit(this.selected).then((res) => {
                        console.log(res);
                    })
                }
            })
        }]
    });
})(angular.module('app.adherents'))
