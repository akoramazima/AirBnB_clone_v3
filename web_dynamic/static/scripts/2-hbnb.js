$('document').ready(function () {
  let amens = {};
  $('input[type=checkbox]').change(function () {
    let name = $(this).attr('data-name');
    let id = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      amens[id] = name;
    } else if (!$(this).is(':checked')) {
      delete amens[id];
    }
    if (Object.values(amens).length === 0) {
      $('.amenities h4').html("&nbsp;")
    } else {
      $('.amenities h4').text(Object.values(amens).join(', '));
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
