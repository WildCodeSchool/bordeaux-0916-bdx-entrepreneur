((app) => {
    app.component('company', {
        templateUrl: 'js/components/company/company.html',
        controller: function($stateParams, usersService, companiesService, $state, $scope, $mdToast, $mdDialog, $timeout) {
            let initialPost;
            angular.extend(this, {
                $onInit() {

                    this.editMode = false;

                    usersService.getCurrent().then((user) => {
                        this.user = user
                    })

                    companiesService.getById($stateParams.id).then((response) => {
                        this.company = response.data
                        this.social = this.company.social[0]
                        this.fondateur = this.company.fondateur[0]
                        this.cofond = this.company.cofond[0]
                        this.cofondbis = this.company.cofond[1]

                    });

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
                            $state.go('app.home')
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
                },
                edit() {
                    if (!this.editMode) {

                        this.editMode = true
                    } else {

                        this.editMode = false
                    }

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
