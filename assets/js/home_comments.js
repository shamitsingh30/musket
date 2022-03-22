{

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
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    };

    let newCommentDom = function(comment){
        return $(`<li>
        <p>
                
                <small>
                        <a href="/comments/destroy/${comment.id}">X</a>
                </small>
                
                ${ comment.content }
                <br>
                <small>
                        ${comment.user.name}
                </small>
        </p>
</li>`)
    }

    createComment();
}