((app) => {
    app.component('blogList', {
            templateUrl: 'js/components/blog/blogList/blogList.html',
            controller: function(postsService) {

                    postsService.get().then((response) => {
                        this.posts = response.data
                    });

                    this.add = (post) => {
                        this.posts.push(this.posts),
                            console.log('this has been added');
                    };

                    this.carouselstate = 0
                    this.next = () => {
                        this.carouselstate ==
                            this.posts.length - 1 ?
                            this.carouselstate = 0 :
                            this.carouselstate++
                            console.log('search next blog');
                    }

                    this.prev = () => {
                        this.carouselstate < 1 ?
                            this.carouselstate =
                            this.posts.length - 1 :
                            this.carouselstate--;
                        console.log('search prev blog');
                    }





                } //dont delete
        }) //dont delete
})(angular.module('app.blog'))
