((app) => {
    app.component('footer', {
        templateUrl: 'js/components/home/footer/footer.html',
        controller: function(companiesService) {
             companiesService.get().then((response) =>{
                this.companies = response.data
            })
        }
    });
})(angular.module('app.footer'))
