#!/usr/bin/node

$(document).ready(() => {
  const amenities = {};
  $("input[type='checkbox']").change(function () {
    if (this.checked) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    const list = Object.values(amenities);
    if (list.length > 0) {
      $('DIV.amenities h4').text(Object.values(amenities).join(', '));
    } else {
      $('DIV.amenities h4').html('&nbsp;');
    }
  });
});
