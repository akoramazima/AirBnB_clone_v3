$('document').ready(function () {
  let amens = {};
  $('.amenities input[type=checkbox]').change(function () {
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

  let states = {};
  let cities = {};
  $('.locations input[type=checkbox]').change(function () {
    let name = $(this).attr('data-name');
    let id = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      if ($(this).attr('data-class') === "State") {
        states[id] = name;
      } else if ($(this).attr('data-class') === "City") {
        cities[id] = name;
      }
    } else if (!$(this).is(':checked')) {
      if ($(this).attr('data-class') === "State") {
        delete states[id];
      } else if ($(this).attr('data-class') === "City") {
        delete cities[id];
      }
    }
    let locats = Object.assign({}, states, cities)
    if (Object.values(locats).length === 0) {
      $('.locations h4').html("&nbsp;")
    } else {
      $('.locations h4').text(Object.values(locats).join(', '));
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  function postAmens (amenities) {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify(amenities),
      success: function (data) {
        data.sort(function (a, b) {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        $('section.places').empty();
        $.each(data, function (i, place) {
          $('section.places').append('<article>' +
          ('<div class="title">') +
          ('<h2>' + place.name + '</h2>') +
          ('<div class="price_by_night">') +
          ('$' + place.price_by_night) +
          ('</div>') +
          ('</div>') +
          ('<div class="information">') +
          ('<div class="max_guest">') +
          ('<i class="fa fa-users fa-3x" aria-hidden="true"></i>') +
          ('<br />') +
          (place.max_guest + ' Guests') +
          ('</div>') +
          ('<div class="number_rooms">') +
          ('<i class="fa fa-bed fa-3x" aria-hidden="true"></i>') +
          ('<br />') +
          (place.number_rooms + ' Bedrooms') +
          ('</div>') +
          ('<div class="number_bathrooms">') +
          ('<i class="fa fa-bath fa-3x" aria-hidden="true"></i>') +
          ('<br />') +
          (place.number_bathrooms + ' Bathroom') +
          ('</div>') +
          ('</div>') +
          ('<div class="description">') +
          (place.description) +
          ('</div>') +
          ('</article>'));
        });
      }
    });
  }

  postAmens({});

  $('button').click(function () {
    let payload = {};
    payload['amenities'] = Object.keys(amens);
    payload['states'] = Object.keys(states);
    payload['cities'] = Object.keys(cities);
    postAmens(payload);
    console.log('Clicked');
  });
});
