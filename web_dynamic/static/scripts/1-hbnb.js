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
    console.log(amens);
    if (Object.values(amens).length === 0) {
      $('.amenities h4').html("&nbsp;")
    } else {
      $('.amenities h4').text(Object.values(amens).join(', '));
    }
  });
});
