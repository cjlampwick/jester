function handleHeaderAction(obj, modal) {
    $.get('/' + obj + '/getModal',{ modal }, function (g) {
        $('#modal-form').html(g);
        $('#modal-form').modal({
            fadeDuration: 100
        });
    });
}