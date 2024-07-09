$(document).ready(function() {
    function getData(callback){
        $ajax({
            type: 'GET',
            url: '../json/serviceMenu.json',
            contentType: 'aplication/json',
            dataType: 'json',
            success: function(data){
                callback(data)
            },
            error: function(status, errorThrown){
                console.log(status, errorThrown);
            }
        }); 
    }  
    
    
});