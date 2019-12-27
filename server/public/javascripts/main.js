function handleHeaderAction(obj, modal, id) {
    $.get('/' + obj + '/getModal', { modal, id }, function (g) {
        $('#modal-form').html(g);
        $('#modal-form').modal({
            fadeDuration: 100
        });
    });
};

function showActions(i) {
    $(".card-action-" + i).show();
}

function hideActions(i) {
    $(".card-action-" + i).hide();
}

$(document).ready(function () {


    $('#usrIcon').click(function (e) {
        $('.header-dropdown').show();
        e.stopPropagation();
    });

    $('.header-dropdown').click(function (e) {
        e.stopPropagation();
    });

    $(document).click(function () {
        $('.header-dropdown').hide();
    });
});