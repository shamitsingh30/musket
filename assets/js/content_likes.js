class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
        
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
                success: function(data){
                    let deleted = data.data.deleted;
                    console.log(deleted);
                    let likesCount = parseInt(self.text.split(" ")[0]);
                    if(deleted){
                        likesCount--;
                    }else{
                        likesCount++;
                    }
                    console.log(likesCount);
                    // console.log(self.text);
                    self.text = `${likesCount} Likes`;
                },
                error: function(error){
                    console.log(error.responseText);
                } 
            })           

        });
    }
}
