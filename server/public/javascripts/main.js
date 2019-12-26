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
});