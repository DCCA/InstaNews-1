document.addEventListener('DOMContentLoaded', function() {
  const ajaxBtn = document.getElementById('ajax-btn');

  ajaxBtn.addEventListener('click', function() {
    $.ajax({
      method: 'GET',
      url:
        'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=0WtPpO9YKHjXtavXMIdn6B6UxXo1bEde'
    }).done(function(data) {
      console.log(data);
    });
  });
}); // doc load ends
