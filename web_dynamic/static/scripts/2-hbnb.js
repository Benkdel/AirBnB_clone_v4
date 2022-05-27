#!/usr/bin/node

$(document).ready(() => {
    let amenities = {};
    $("input[type='checkbox']").change(function () {
        if (this.checked) {
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenities[$(this).data('id')];
        }
        let list = Object.values(amenities);
        if (list.length > 0) {
            $('DIV.amenities h4').text(Object.values(amenities).join(', '));
        } else {
            $('DIV.amenities h4').html('&nbsp;');
        }
    });

    var url = 'http://127.0.0.1:5001/api/v1/status/'
    $.get(url, function (data, status) {
        if (status === 'success') {
            if (data.status = 'OK') {
                $('#api_status_icon').addClass('available');
            } else {
                $('#api_status_icon').removeClass('available');
            }
        }
    });
});
