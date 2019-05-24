var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbwIV-ZO2l9uzi_tXb0pEQwKbPjJ3EMt3Sn6tCekcWf-PDptlBs/exec'

$('#submit-form').on('click', function(e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  }).success(
    // do something
  );
})