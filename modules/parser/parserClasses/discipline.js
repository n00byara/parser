const ListDataParse = require('./lists');
const XLSX = require('xlsx');

module.exports = class Discpline extends ListDataParse {

  sortBySemester(key){ //сортурую по семестрам

    let discipline = {};

    let obj = this.disMap.get(key);

    let cells = Object.keys(obj);
    let values = Object.values(obj);
    discipline.name = values[1];

    let semesterCells = Object.values(this.semestersCells)[0],
      semesterValues = Object.values(this.semestersCells)[1];
    let counter = 0;
    for(let i = 0; i < cells.length; i++){
      let x = XLSX.utils.decode_cell(semesterCells[0]).c;
      if(XLSX.utils.decode_cell(cells[i]).c < x){
        cells.shift();
        values.shift();
      }
      else{
        cells.shift();
        break;
      }
    }


    discipline.department = values.shift(); //кафедра
    discipline.group = this.groupsName; // группы

    let regXp = /\d/;
    let name = 'semester',
      path2 = XLSX.utils.decode_cell(semesterCells[1]).c;
    let arrValues = [],
      arrCells = [];
    for(let i = 0; i < values.length; i++){
      if(XLSX.utils.decode_cell(cells[0]).c < path2){
        arrValues[i] = values.shift();

        arrCells[i] = cells.shift();
      }
      else{
        continue;
      }

    }

    discipline[name + semesterValues[0].match(regXp)[0]] = {};
    discipline[name + semesterValues[1].match(regXp)[0]] = {};

    for(let i = 0; i < arrValues.length; i++){
      switch(XLSX.utils.decode_cell(arrCells[i]).c){
        case XLSX.utils.decode_cell(this.labs[0]).c:
          discipline[name + semesterValues[0].match(regXp)[0]].labs = arrValues[i];
          break;
        case XLSX.utils.decode_cell(this.independentWork[0]).c:
          discipline[name + semesterValues[0].match(regXp)[0]].independentWork = arrValues[i];
          break;
        case XLSX.utils.decode_cell(this.lectures[0]).c:
          discipline[name + semesterValues[0].match(regXp)[0]].lectures = arrValues[i];
          break;
      }
    }

    for(let i = 0; i < values.length; i++){
      switch(XLSX.utils.decode_cell(cells[i]).c){
        case XLSX.utils.decode_cell(this.labs[1]).c:
          discipline[name + semesterValues[1].match(regXp)[0]].labs = arrValues[i];
          break;
        case XLSX.utils.decode_cell(this.independentWork[1]).c:
          discipline[name + semesterValues[1].match(regXp)[0]].independentWork = arrValues[i];
          break;
        case XLSX.utils.decode_cell(this.lectures[1]).c:
          discipline[name + semesterValues[1].match(regXp)[0]].lectures = arrValues[i];
          break;
      }
    }


    let regXp2 = /semester/;


    for(let key in discipline){  //удаляю пустые семетры
      if(!regXp2.test(key)) continue;

      let counter = 0;
      for(let j in discipline[key]){
        counter++;
      }
      if(counter == 0) delete discipline[key];
    }

    return discipline;
  }

  discipline(){
    return this.disMap
  }

}
