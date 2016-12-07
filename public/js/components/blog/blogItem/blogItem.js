((app) => {
    app.component('blogItem', {
        templateUrl: 'js/components/blog/blogItem/blogItem.html',
        controller: function($stateParams, postsService, $state) {

            postsService.getById($stateParams.id).then((response) => {
                this.blog = response.data;
            });

            postsService.get().then((response) => {
                this.blogs = response.data;
                /*console.log(this.blogs);*/
            });

            this.next = () => {
                // find current blog index in blogs
                // with this index ++
                // with this new index re-affect this.blog with this.blogs[newINdex]
                let index = this.blogs.findIndex((blog) => blog._id === this.blog._id)
                index++
                let next_blog = this.blogs[index]
                $state.go('blog.item', {id: next_blog._id})
            }


            this.prev = () => {
              let index = this.blogs.findIndex((blog) => blog._id === this.blog._id)
              index--
              let next_blog = this.blogs[index]
              $state.go('blog.item', {id: next_blog._id})
            }



            this.delete = (blog) => {
                postsService.delete(blog).then((response) => {
                    console.log('Blog deleted');
                    $state.go('blog.list')
                })
            };

            this.saveBlogs = (blog) => {
                postsService.save(blog).then((res) => {
                    console.log("SUCESS")
                });
            }

            this.resetTodoState = () => {
                this.blogs.forEach(function(blog) {

                })
            }

            this.editMode = (blog, index) => {
                this.blog.editMode = true;
            };

            let date = new Date();
            this.hhmm = (new Date(), 'hh:mm');




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


        }
    }); //dont delete
})(require('angular').module('app.blog'))
