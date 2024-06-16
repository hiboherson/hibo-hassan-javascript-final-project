document.addEventListener('DOMContentLoaded', function() {
  const reportButton = document.getElementById('reportButton');
  const reportModal = document.getElementById('reportModal');
  const closeButton = document.querySelector('.close');
  const reportForm = document.getElementById('reportForm');
  const resourcesList = document.getElementById('resourcesList');
  const awarenessList = document.getElementById('awarenessList');
  const aboutList = document.getElementById('aboutList');
  const why = document.getElementById('why');
  const awareness = document.getElementById('awareness');
  const contactList = document.getElementById('contactList');
  const images = document.getElementById('images');


  // Display support resources from JSON data

  fetch('index.json')
    .then(response => response.json())
    .then(data => {
      data.abouts.forEach(about => {
        const aboutItem = document.createElement('div');
        aboutItem.innerHTML = `<div class="row gy-4">
          <div class="col-lg-7" data-aos="fade-up" data-aos-delay="100">
            <img src="assets/img/${about.image}" class="img-fluid mb-4" alt="">
            <div class="book-a-table">
              <h3>Call us on</h3>
              <p>${about.number}</p>
            </div>
          </div>
          <div class="col-lg-5" data-aos="fade-up" data-aos-delay="250">
            <div class="content ps-0 ps-lg-5">
              <p class="fst-italic">
               ${about.content}
              </p>
              <ul>
                <li><i class="bi bi-check-circle-fill"></i> <span>${about.causes[0]}.</span></li>
                <li><i class="bi bi-check-circle-fill"></i> <span>${about.causes[1]}</span></li>
                <li><i class="bi bi-check-circle-fill"></i> <span>${about.causes[2]}</span></li>
                <li><i class="bi bi-check-circle-fill"></i> <span>${about.causes[3]}</span></li>
              </ul>
            </div>
          </div>
        </div>`;
        aboutList.appendChild(aboutItem);
      });

      data.banners.forEach(banner => {
        const listItem = document.createElement('div');
        listItem.classList.add('d-md-flex')
        listItem.innerHTML = `<div class="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h3 id data-aos="fade-up">${banner.title}</h3 id>
            <p data-aos="fade-up" data-aos-delay="100">${banner.content}</p>
            <div class="d-flex" data-aos="fade-up" data-aos-delay="200">
              <a href="index.html#contact" class="btn-get-started">Report an incident</a>
              <a href="${banner.url}" class="glightbox btn-watch-video d-flex align-items-center"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>
            </div>
          </div>
          <div class="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out">
            <img src="assets/img/${banner.image}" class="img-fluid animated" width='100%' alt="${banner.title}">
          </div>`;
        awarenessList.appendChild(listItem);
      });

      data.precautions.forEach(precaution => {
        const precautionItem = document.createElement('div');
        precautionItem.classList.add('why-box');
        precautionItem.innerHTML = `
              <h3>${precaution.title}</h3>
              <p>${precaution.content} </p>
              <div class="text-center">
                <a href="index.html#contact" class="more-btn"><span>Report Incident</span> <i class="bi bi-chevron-right"></i></a>
              </div>`;
        why.appendChild(precautionItem);
      });

// learning time
       data.learning.forEach(learn => {
        const learnItem = document.createElement('div');
        learnItem.classList.add('col-xl-4');
        learnItem.innerHTML = `<div class="icon-box d-flex flex-column justify-content-center align-items-center">
                  <h4>${learn.title}</h4>
                  <p>${learn.content}</p>
               </div>`;
        awareness.appendChild(learnItem);
      });
// contact js
        data.contacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.classList.add('col-md-6');
        contactItem.innerHTML = `<div class="info-item d-flex align-items-center" data-aos="fade-up" data-aos-delay="200">
              <i class="icon bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>${contact.title}</h3>
                <p>${contact.content}</p>
              </div>
          </div>`;
        contactList.appendChild(contactItem);
      });

      data.supportResources.forEach(resource => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${resource.name}</strong>: Phone - ${resource.phone}, Website - <a href="${resource.website}" target="_blank">${resource.website}</a>`;
        resourcesList.appendChild(listItem);
      });

  
  // images section
        data.images.forEach(image => {
        const imageItem = document.createElement('div');
        imageItem.classList.add('swiper-slide');
        imageItem.innerHTML = `<a class="glightbox" data-gallery="images-gallery" href="assets/img/gallery/${image.name}">
        <img src="assets/img/gallery/${image.name}" class="img-fluid" alt="">
        </a>`;
        images.appendChild(imageItem);
      });


    });

  // Show report incident modal
 document.getElementById("reportF").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var message = document.getElementById("message").value;
alert(message);
    // Create message object
    var report = {
        "message": message
    };

    // Read existing reports from JSON file (if any)
    fetch('reports.json')
    .then(response => response.json())
    .then(data => {
        // Add new user to existing data
        data.reports.push(report);
        
        // Write updated data back to JSON file
        return fetch('reports.json', {
            method: 'PUT', // Use PUT method to overwrite the file
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    })
    .then(() => {
        alert('Incident reported successfully!');
        // Optionally, you can redirect the user to another page or clear the form here
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Incident reported successfully.');
    });
});

});
