'use strict';

fetch('/downloadFiles')
    .then(response => response.json())
    .then(data => load(data))

let load = (data) =>{

  const checkboxGroup = document.querySelector(".checkboxGroup");
  const ul = document.createElement('ul');

  data.forEach(element => {
    const li = document.createElement('li');
    li.classList.add('fileList');
    li.innerHTML = `<label ><input name='data' type='checkbox' class="file" value='${element}'>${element}</label>`;
    ul.append(li);
  });
  checkboxGroup.append(ul);
  log();
};

let send = () =>{
  let ev = new Event('submit');
  document.createEvent(ev);
};

let log = () =>{
  let li = document.querySelectorAll('li');
  li.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      let input = elem.querySelector('input');
      input.checked = !input.checked;
      if(input.checked) elem.style.backgroundColor = '#E1F5FE';
      else elem.style.backgroundColor = 'white';
    });
  });


};
























  /*  let ul = document.querySelector('ul');


    for(let i = 0; i < data.length; i++){
        let h3 = document.createElement('h3');

        let div = document.createElement('div');
        div.classList.add('file');
        div.innerHTML = data[i];

        let li = document.createElement('li');

        let checkBox = document.createElement('input');
        checkBox.classList.add('checkbox');
        checkBox.setAttribute('id', data[i]);
        checkBox.setAttribute('type', 'checkbox');

        div.append(checkBox);

        h3.append(div);

        li.append(h3);

        ul.append(li);
    }
    let div = document.querySelectorAll('.file');
    div.forEach((elem) => {
      let checkBox = {
        name: elem.querySelector('input').id,
        click: false
      };
      elem.addEventListener('click', () =>{
        setCheck(checkBox, elem);
      });
    });
    let button = document.querySelector('.button');
    button.addEventListener('click', selectedFiles);*/



/*let setCheck = (checkBox, elem) => {
  let fileName = elem.toElement;
  let input = elem.querySelector('input');
  switch (checkBox.click) {
    case false:
      elem.style.backgroundColor = 'red';
      checkBox.click = true;
      input.checked = checkBox.click;
      break;

    case true:
      elem.style.backgroundColor = 'white';
      checkBox.click = false;
      input.checked = checkBox.click;
      break;

  }
};
let selectedFiles = () =>{
  let files = [];
  let data = document.querySelectorAll('.file');
  for(let i = 0; i < data.length; i++){
    if(!data[i].querySelector('input').checked) continue;
    files.push(data[i].querySelector('input').id)
  }
  let
};*/
