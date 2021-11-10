var formElems;

function handleFormAction(e) {
  e.preventDefault();
  var formElem = e.srcElement;
  var data = new FormData(formElem);
  console.log("fetcham");
  
  fetch("http://family-yacht.pl//form-handler.php", {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: structureData(data)
  })
  .then(function(response){return response.json()})
  .then(function(msg){
    var poruka, klasa;
    var elem = formElem.querySelector(".message");
    if(msg.success && !msg.error){
      poruka = "Thank you for contacting us!";
      klasa = "uspjeh";
    }else{
      poruka = "Something went wrong. Please try again.";
      klasa = "neuspjeh";
    }
    elem.innerHTML = poruka;
    elem.classList.add(klasa);
  });
}

function structureData(formData) {
  var data = {};
  formData.forEach(function(value, key) {
    data[key] = value;
  });
  return JSON.stringify(data);
}

function pronadiForme() {
  formElems = document.querySelectorAll("form");
  if(formElems.length) {
    formElems.forEach(function(form){
      form.onsubmit = handleFormAction;
    });
  }
}

window.onload = pronadiForme;
