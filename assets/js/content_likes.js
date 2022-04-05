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

    toggleLike();
}
