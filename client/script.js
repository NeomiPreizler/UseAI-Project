let degel = 0
let res = []

function updateAdditionalQuestion() {
  const eventSelect = document.getElementById('event');
  const ageInputDiv = document.getElementById('ageInput');
  const ageInput = document.getElementById('age');

  if (eventSelect.value ==='birthday') {
    ageInputDiv.style.display = 'block';
  } else {
    ageInputDiv.style.display = 'none';
    ageInput.value = '';
  }
}

function rel() {
  location.reload();
  degel = 0
  res = []
}

function generateGreeting() {
  const responseContainer = document.getElementById('generatedGreeting')
  const category = document.getElementById('type').value;
  const event = document.getElementById('event').value;
  const age = document.getElementById('age').value;
  const atmosphere = document.getElementById('atmosphere').value
  const obj = {
    category: category,
    atmosphere: atmosphere,
    event: event,
    age: age
  }

  responseContainer.style.display = 'block';
  responseContainer.innerHTML = `<p>please wait</p>`;
  const ageInput = document.getElementById('age');
  const categorySelect = document.getElementById('type');
  const eventSelect = document.getElementById('event');
  const atmosphereSelect = document.getElementById('atmosphere');
  const reButton = document.getElementById("rel")

  categorySelect.style.display = 'none'
  eventSelect.style.display = 'none'
  atmosphereSelect.style.display = 'none'
  ageInput.style.display = 'none';
  document.querySelector('label[for="type"]').style.display = 'none';
  document.querySelector('label[for="event"]').style.display = 'none';
  document.querySelector('label[for="age"]').style.display = 'none';
  document.querySelector('label[for="atmosphere"]').style.display = 'none';

  reButton.style.display = 'block'
  reButton.textContent = ' Event: ' + event +" Atmosphere: " + atmosphere + " Type:" + category ;
  if (age != '')
    reButton.textContent += ' Age: ' + age;

  document.getElementById("submitButton").innerText = "I want something different";

  // Send a request to the server with the choices
  if (!degel) {
    const queryString = Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
    const finalUrl = `/get` + '?' + queryString;
    fetch(finalUrl)
      .then(response => response.text()
      )
      .then(data => {
        degel = 3
        res[0] = data
        res = res[0].split(degel + ".")
        const responseContainer = document.getElementById('generatedGreeting');
        responseContainer.innerHTML = `<p>${res[1]}</p>`;
        degel -= 1
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }
  else {
    res = res[0].split(degel + ".")
    responseContainer.innerHTML = `<p>${res[1]}</p>`;
    degel -= 1;
  }
}

