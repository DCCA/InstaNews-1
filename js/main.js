document.addEventListener('DOMContentLoaded', function() {
  const ajaxBtn = document.getElementById('ajax-btn');

  ajaxBtn.addEventListener('click', function() {
    $.ajax({
      method: 'GET',
      url:
        'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=0WtPpO9YKHjXtavXMIdn6B6UxXo1bEde'
    })
    .done(function(data) {
      data.results.forEach(element => {
        // Filter multimedia
        const withmultimedia = data.results.filter({
          // return data.results.multimedia[0] !== null;
        });
        console.log(withmultimedia);
        // Slice
        // Gets title

        // const test = data.results.filter(function (dataset) {
        //     return dataset.multimedia[0] !== undefined;
        // });

        // Displays 12
        // const testSlice = test.slice(0, 12);
        // console.log(testSlice)

        const items = element.abstract;
        const itemsurl = element.multimedia[0].url;
        //console.log(data)
        //console.log(items);
        //console.log(itemsurl);

        const li = document.createElement('li');
        // const url = document.createElement('img');
        // li.innerHTML = items;
        li.style.backgroundImage = `url(${itemsurl})`;

        const p = document.createElement('p');
        p.innerText = items;
        // li.classList.add('article')
        // url.innerHTML = itemsurl;
        li.append(p);
        $('ul').append(li);

        // console.log(element.multimedia);

        // const li = document.createElement('li');
        // li.innerHTML = `$items`;

        // element.append(li);

        // Gets standard thumbnail image for mobile
        // console.log(element.multimedia[1]);
        // // Gets thumbLarge image for tablet
        // console.log(element.multimedia[2].url);
        // // Gets superJumbo image for Desktop
        // console.log(element.multimedia[0]);
      });
    });
  });
}); // doc load ends
