function handleHeaderAction(obj, modal) {
    $.get('/' + obj + '/getModal',{ modal }, function (g) {
        $('#modal-form').html(g);
        $('#modal-form').modal({
            fadeDuration: 100
        });
    });
};

$(document).ready(function(){
    $('.card-item').mouseover(function(e){
        $(this).children(".card-body-actions").children(".card-body-action").show();
    });

    $('.card-item').mouseout (function(e){
        $(this).children(".card-body-actions").children(".card-body-action").hide();
    });

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