$(document).ready(function(){
    $('#usrIcon').click(function(e){
        $('.header-dropdown').show();
        e.stopPropagation();
    });
    
    $('.header-dropdown').click(function(e){
        e.stopPropagation();
    });


    $(document).click(function(){
        $('.header-dropdown').hide();
    });
});