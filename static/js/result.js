'use strict';
fetch('/parse')
.then(response => response.json())
.then(data => sort(data));
let sort = (data) => {
    add2Table(data);
};

let add2Table = (data) =>{
  // /console.log(data);
  let table = document.querySelector('table');
  let tBody = document.createElement('tbody');

  for(let list = 0; list < data.length; list++){
    for(let i = 0; i < data[list].length; i++){
      let arr = data[list][i];

      for(let j = 0; j < arr.length; j++){
        let tr = document.createElement('tr');
        let obj = arr[j];
        let regXp = /semester/;

        for(let key in obj){
          let td = document.createElement('td');
          if(regXp.test(key)){
            td.innerHTML = findSemesters(obj);
            tr.append(td);
            break;
          } else{
            td.innerHTML = obj[key];
            tr.append(td);
          }
          tBody.append(tr);
        }
      }
    }
  }
  table.append(tBody);

};

let findSemesters = (obj) =>{
  let str = '';
  let regXp = /semester/;
  let num = /\d/;

  for(let key in obj){
    if(!regXp.test(key)) continue;
    str += `${key.match(num)} `;
  }
  return str;
}
























document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );

        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };

    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

});
