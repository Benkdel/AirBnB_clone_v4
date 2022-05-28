#!/usr/bin/node

$(document).ready(() => {
  // callback function for search place
  function serveHTML (place) {
    let guests = 'Guest';
    let rooms = 'Room';
    let baths = 'Bathroom';
    if (place.max_guest > 1) {
      guests = 'Guests';
    }
    if (place.number_rooms > 1) {
      rooms = 'Rooms';
    }
    if (place.number_bathrooms > 1) {
      baths = 'Bathrooms';
    }
    const html = `
                <article>
                    <div class="title_box">
                        <h2> ${place.name} </h2>
                        <div class="price_by_night">$ ${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest"> ${place.max_guest} ${guests}</div>
                        <div class="number_rooms">${place.number_rooms} ${rooms}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} ${baths}</div>
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>
                </article>
                `;
    return html;
  }

  // const states = {};
  // const cities = {};
  const amenities = {};
  let jsonPostData = '{}';
  $("input[type='checkbox']").change(function () {
    $('.places article').remove();
    if (this.checked) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    const list = Object.values(amenities);
    if (list.length > 0) {
      $('DIV.amenities h4').text(Object.values(amenities).join(', '));
      jsonPostData = JSON.stringify({ amenities: Object.keys(amenities) });
    } else {
      $('DIV.amenities h4').html('&nbsp;');
      jsonPostData = '{}';
    }

    // filter
    const url2 = 'http://127.0.0.1:5001/api/v1/places_search/';
    $.ajax({
      type: 'post',
      url: url2,
      data: jsonPostData,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        const $places = $('.places');
        for (let i = 0; i < data.length; i++) {
          $places.append(serveHTML(data[i]));
        }
      }
    });
  });

  // without filter
  const url2 = 'http://127.0.0.1:5001/api/v1/places_search/';
  $.ajax({
    type: 'post',
    url: url2,
    data: '{}',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
      const $places = $('.places');
      for (let i = 0; i < data.length; i++) {
        $places.append(serveHTML(data[i]));
      }
    }
  });

  const url = 'http://127.0.0.1:5001/api/v1/status/';
  $.get(url, function (data, status) {
    if (status === 'success') {
      if (data.status === 'OK') {
        $('#api_status_icon').addClass('available');
      } else {
        $('#api_status_icon').removeClass('available');
      }
    }
  });
});
