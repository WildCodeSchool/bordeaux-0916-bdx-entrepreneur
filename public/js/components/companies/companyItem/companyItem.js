((app) => {
    app.component('companyItem', {
        bindings: {
            user: "<",
            editMode: "=",
            onEdit: "&",
            onDelete: "&",
            onSave: "&"
        },
        templateUrl: 'js/components/companies/companyItem/companyItem.html',
        controller: function($stateParams, usersService, companiesService, $state, $scope, $mdToast, $mdDialog, $timeout) {
            let initialPost;
            angular.extend(this, {
                $onInit() {

                    companiesService.get().then((response) => {
                        this.companies = response.data
                    });

                    companiesService.getById($stateParams.id).then((response) => {
                        this.company = response.data
                        this.company.users.forEach((creator) => {
                            if (creator === this.user._id)
                                this.editable = true
                        })

                    });


                    usersService.getCurrent().then((user) => {
                        this.user = user
                    })


                    // Test if $stateParams.id exists (ex: stateParams.id is 1234567 form this url http://domain.ext/1234567)
                    if ($stateParams.id) {
                        // If $stateParams.id is _new (when you click on add on blogListMenu button see blogListMenu.html)
                        if ($stateParams.id === '_new') {
                            // Affect post variable with empty object
                            this.company = {}
                            this.company.isNew = true;
                            // Affect editMode property to true
                            this.editMode = true
                        } else {
                            // If $stateParams.id is an id we make HTTP request with this id to get data
                            companiesService.getById($stateParams.id).then((res) => {
                                // when this request receives response we affect response data to this controller variable post
                                this.company = res.data;
                                // save into initialPost a copy of this post (used for undo)
                                initialCompany = angular.copy(this.company)
                            })
                        }
                    } else {
                        //If $stateParams.id doesn't exist we change state to app.blog.list (redirection to list)
                        $state.go('company.list')
                    }

                    this.next = () => {
                        // find current company index in companies
                        // with this index ++
                        // with this new index re-affect this.company with this.companies[newINdex]
                        let index = this.companies.findIndex((company) => company._id === this.company._id)
                        index++
                        let next_company = this.companies[index]
                        $state.go('company.item', {
                            id: next_company._id
                        })
                    }


                    this.prev = () => {
                        let index = this.companies.findIndex((company) => company._id === this.company._id)
                        index--
                        let next_company = this.companies[index]
                        $state.go('company.item', {
                            id: next_company._id
                        })
                    }


                    this.delete = (company) => {
                        companiesService.delete(company).then((response) => {
                            console.log('company deleted');
                            $state.go('company.list')
                        })
                    };

                    this.saveCompanies = (company) => {
                        companiesService.save(company).then((res) => {
                            //Si c'est new company alors $state.go item + id du nouveau
                            $mdToast.show(
                                $mdToast.simple()
                                .textContent('Simple Toast!')
                                .position("bottom right")
                                .hideDelay(3000)
                            );
                            if ($stateParams.id === '_new') {
                                $state.go('company.item', {
                                    id: res.data._id
                                });
                            }
                        }).catch(function() {

                        });
                    };
                    this.createCompanies = (company) => {
                        companiesService.save(company).then((res) => {
                            console.log("Your Contact Has Been Saved and Updated")
                        });
                    }

                    this.resetTodoState = () => {
                        this.companies.forEach(function(company) {

                        })
                    };

                    this.printDiv = (printableArea) => {
                        var printContents = document.getElementById(printableArea).innerHTML;
                        var popupWin = window.open('', '_blank', 'width=600,height=600');
                        popupWin.document.open();
                        popupWin.document.write('<html><head><link rel="stylesheet" href="css/printablearea.css" media="print"/></head><body onload="window.print()">' + printContents + '</body></html>');
                        popupWin.document.close();
                    }


                    this.editMode = (company, index) => {
                        this.company.editMode = true;
                        this.company.editMode.onblur = this.saveCompanies;
                    };

                    let date = new Date();
                    this.hhmm = (new Date(), 'hh:mm');

                    this.tags = [];


                    /* ---------------------------
                      Code For Speed Dial
                    -----------------------------*/

                    self.hidden = false;
                    this.isOpen = false;
                    this.hover = false;

                    // On opening, add a delayed property which shows tooltips after the speed dial has opened
                    // so that they have the proper position; if closing, immediately hide the tooltips
                    $scope.$watch('demo.isOpen', function(isOpen) {
                        if (isOpen) {
                            $timeout(function() {
                                $scope.tooltipVisible = self.isOpen;
                            }, 600);
                        } else {
                            $scope.tooltipVisible = self.isOpen;
                        }
                    });

                    this.openDialog = function($event, item) {
                        // Show the dialog
                        $mdDialog.show({
                            clickOutsideToClose: true,
                            controller: function($mdDialog) {
                                // Save the clicked item
                                this.item = item;

                                // Setup some handlers
                                this.close = function() {
                                    $mdDialog.cancel();
                                };
                                this.submit = function() {
                                    $mdDialog.hide();
                                };
                            },
                            targetEvent: $event
                        });
                    }
                }
            })
        }
    }); //dont delete
})(require('angular').module('app.company'))
