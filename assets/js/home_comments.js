{   

    let toggleLike = function(){
        let $toggleElement;

        $('.like-button').delegate('a', 'click', function(event){
            event.preventDefault();
            $toggleElement = $(this);

            $.ajax({
                type: 'post',
                url: $toggleElement.attr('href'),
                success: function(data){
                    let deleted = data.data.deleted;
                    console.log(deleted);
                    let likesCount = parseInt($toggleElement.text().split(" ")[0]);
                    console.log(likesCount);
                    if(deleted){
                        likesCount--;
                    }else{
                        likesCount++;
                    }
                    $toggleElement.html(`${likesCount} Likes`);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    let createComment = function(){

        let $form;
        
        $(document).delegate('form', 'submit', function(event) {
            event.preventDefault();
            $form = $(this);

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $form.serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));
                    toggleLike($(' .toggle-like-button'), newComment);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    };

    let newCommentDom = function(comment){
        return $(`<li id="comment-${comment._id}">
        <p>
                
                <small>
                        <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                </small>
                
                ${ comment.content }

                <div class="like-button">
                    
                    <a class="toggle-like-button" href="/likes/toggle/?id=${comment._id}&type=Comment">0 Like</a>
                    
                </div>
                <br>
                <small>
                        ${comment.user.name}
                </small>
        </p>
</li>`)
    }

    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log($(deleteLink).prop('href'));

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#comment-${data.data.comment_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createComment();
}