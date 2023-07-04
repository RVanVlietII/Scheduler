

$(function () {

  var today = dayjs();
  $('#currentDay').text(today.format('MMM D, YYYY'));

  let currentHour = dayjs().hour();
  $('#currentHour').text(currentHour).hide();

  $('.saveBtn').on('click', function(event) {
    event.preventDefault();
    let timeBlock = $(this).closest('.time-block').attr('id');
    let userInput = $(this).closest('.time-block').find('.description').val();
    let hour = timeBlock.split("-")[1];
    localStorage.setItem("hour-" + hour, JSON.stringify(userInput));
  });

  $('.time-block').each(function() {

  let blockHour = parseInt($(this).attr("id").split("-")[1]);
  let descriptionEl = $(this).find('.description');

  if (blockHour < currentHour) {
    $(descriptionEl).removeClass('present future').addClass('past');
  } else if (blockHour == currentHour) {
    $(descriptionEl).removeClass('past future').addClass('present');
  } else if (blockHour > currentHour) {
    $(descriptionEl).removeClass('past present').addClass('future');
  }

  let savedInput = localStorage.getItem("hour-" + blockHour);
  let savedInputEl = JSON.parse(savedInput);
  $(this).find('.description').val(savedInputEl || "");

});

});