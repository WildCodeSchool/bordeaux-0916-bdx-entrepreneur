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



                    let date = new Date();
                    this.hhmm = (new Date(), 'hh:mm');


                    this.carouselstate = 3
                    this.loadMore = () => {
                        this.carouselstate += 3
                    };

                    /*this.carouselstate = 0

                      this.next = () => {
                          this.carouselstate ==
                              this.blog.length - 1 ?
                              this.carouselstate = 0 :
                              this.carouselstate++
                              console.log('search next blog');
                      }

                      this.prev = () => {
                          this.carouselstate < 1 ?
                              this.carouselstate =
                              this.blog.length - 1 :
                              this.carouselstate--;
                          console.log('search prev blog');
                      }*/


              } //dont delete
        }); //dont delete
})(require('angular').module('app.blog'))
