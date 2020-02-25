document.addEventListener('DOMContentLoaded', function() {
  const sectionList = [
    'select',
    'arts',
    'automobiles',
    'books',
    'business',
    'fashion',
    'food',
    'health',
    'home',
    'insider',
    'magazine',
    'movies',
    'nyregion',
    'obituaries',
    'opinion',
    'politics',
    'realestate',
    'science',
    'sports',
    'sundayreview',
    'technology',
    'theater',
    't - magazine',
    'travel',
    'upshot',
    'us',
    'world'
  ];

  // const ajaxBtn = document.getElementById('ajax-btn');
  const section = document.querySelector('.sections');
  const articles = document.querySelector('.article-section');

  sectionList.forEach(e => {
    const option = document.createElement('option');
    option.setAttribute('value', e);
    option.innerText = e;
    section.appendChild(option);
  });

  section.addEventListener('change', function(event) {
    $.ajax({
      method: 'GET',
      url: `https://api.nytimes.com/svc/topstories/v2/${event.target.value}.json?api-key=0WtPpO9YKHjXtavXMIdn6B6UxXo1bEde`
    }).done(function(data) {
      data.results.forEach(e => {
        const li = document.createElement('li');
        li.classList.add('card');
        li.style.backgroundImage = `url(${e.multimedia[0].url})`;

        const p = document.createElement('p');
        p.innerText = e.abstract;
        li.appendChild(p);

        articles.appendChild(li);
      });

      console.log(data.results);
    });
  });
}); // doc load ends
