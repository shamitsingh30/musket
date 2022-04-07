{

    //method to post the form data using ajax

    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    new ToggleLike($(' .toggle-like-button', newPost));
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    };

    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>     
                
            <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id }">X</a>
            </small>
                
            ${ post.content }<br>

            <div class="like-button">
                    
                <a class="toggle-like-button" href="/likes/toggle/?id=${post._id}&type=Post">0 Like</a>
                    
            </div>

            <small>
                ${ post.user.name }
            </small>
        </p>
        
        <div class="post-comments">
                
            <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="Comment here..." required>
                    <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="Add comment">
            </form>
            

            <div class="post-comments-list">
                <ul id="post-comments-${ post._id }">
                    
                </ul>
            </div>
        </div>
</li>`)
    }


    //method to delete the post from DOM
    let deletePost = function(deleteLink){
        console.log($(deleteLink));
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    // $(`#like-button-${data.data.post_id}`);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    };

    createPost();
}