((app) => {
    app.component('blogItem', {
        templateUrl: 'js/components/blog/blogItem/blogItem.html',
        controller: function($stateParams, postsService, $state) {

            postsService.getById($stateParams.id).then((response) => {
                this.blog = response.data;
            });

            this.delete = (blog) => {
              postsService.delete(blog).then((response) => {
                console.log('Blog deleted');
                $state.go('blog.list')
              })
            };

            this.saveBlogs = (blog) => {
              debugger
              postsService.save(blog).then((res) =>{
                console.log("SUCESS")
              });
            }



            this.resetTodoState = () => {
                this.blogs.forEach(function(blog) {

                })
            }


            this.editMode = (blog, index) => {
                this.blog.editMode = true;

                let date = new Date();
                this.hhmm = (new Date(), 'hh:mm');

            };
        }
    }); //dont delete
})(angular.module('app.blog'))
