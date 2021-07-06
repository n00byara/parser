const XLSX = require('xlsx');

module.exports = class ListDataParse {
  constructor(lists) {
    this.sheetAll = lists;
    this.sheetCells = Object.keys(this.parse());
    this.sheetValues = Object.values(this.parse());
    this.semestersCells = this.findCellSemester();
    this.disciplinesCode = Object.values(this.findDisciplines(0))[0];
    this.listDisciplinesCells = Object.values(this.disDataFunc())[0];
    this.listDisciplinesCellsLength = this.listDisciplinesCells.length;
    this.listDisciplinesValues = Object.values(this.disDataFunc())[1];
    this.disMap = this.add2Map();
    this.groupsName = this.findGroupsName();
    this.allHours;
    this.labs = this.findLabs();
    this.independentWork = this.findIndependentWork();
    this.lectures = this.findLectures();
  }


  parse(){  //ищу столбцы
    let list = {};
    for(let key in this.sheetAll){
      if(key == '!rows' || key == '!merges' || key == '!ref' || key == '!margins') continue;
      list[key] = this.sheetAll[key];
    }
    return list;
  }

  findLabs(){
    let arr = [];
    let regXp = /лабо/i;
    for(let i = 0; i < this.sheetValues.length; i++){
      if(!regXp.test(this.sheetValues[i].v)) continue;
      arr.push(this.sheetCells[i]);
      if(arr.length == 2) break;
    }
    return arr;
  }

  findIndependentWork(){
    let regXp = /прак/i;
    let arr = [];
    for(let i = 0; i < this.sheetValues.length; i++){
      if(!regXp.test(this.sheetValues[i].v)) continue;
      arr.push(this.sheetCells[i]);
      if(arr.length == 2) break;
    }
    return arr;
  }

  findLectures(){
    let regXp = /лек/i;
    let arr = [];
    for(let i = 0; i < this.sheetValues.length; i++){
      if(!regXp.test(this.sheetValues[i].v)) continue;
      arr.push(this.sheetCells[i]);

      if(i == 100) break;
    }

    arr[1] = arr[2];
    arr.pop();
    arr.pop();
    return arr;
  }

  findCellSemester(){  //ищу ячейки с семестрами
    let strRegXp = /семестр/i;
    let cellArr = [],
      valuesArr = [];
    for(let i = 0; i < this.sheetValues.length; i++){
      if(!strRegXp.test(this.sheetValues[i].w)) continue;
      cellArr.push(this.sheetCells[i]);
      valuesArr.push(this.sheetValues[i].v);
    }

    return {cellArr, valuesArr};
  }

  add2Map(){ //добавляю дисиплины в коллекцию тут есть ошибка, последний элемент не добавляется

    let set = new Map();
    let regXp = /[а-я]\d\.[а-я]/i;
    let counter = 1;
    for(let i = 0; i < this.listDisciplinesCellsLength; i++){
      let toObject = [];
      if(!regXp.test(this.listDisciplinesValues[i].v)) continue;
      for(let j = i; j < this.listDisciplinesCells.length; j++){
        if(XLSX.utils.decode_cell(this.listDisciplinesCells[j]).r != XLSX.utils.decode_cell(this.listDisciplinesCells[j + 1]).r) break;
        let arr = [this.listDisciplinesCells[j], this.listDisciplinesValues[j].w];
        toObject.push(arr);
      }

     set.set(counter, Object.fromEntries(toObject));
     counter++;
    }
    return set;
  }

  findGroupsName(){
    let regXp = /[г][р][у][п][п]+/i;
    let group;
    for(let key in this.sheetValues){
      if(!regXp.test(this.sheetValues[key].v)) continue;
      group = this.sheetValues[key].v;
      break;
    }
    return group;
  }

  findDisciplines(counter){  //ищу код дисциплины
    this.counter = counter;
    let regXp = /[а-я]\d\.[а-я]/i;
    let arr = [],
      arr2 = [];
    for(let i = 0; i < this.sheetValues.length; i++){
      if(!regXp.test(this.sheetValues[i].v)) continue;
        arr.push(this.sheetCells[i + counter]);
        arr2.push(this.sheetValues[i + counter]);
    }
    return {arr, arr2};
  }

  disDataFunc(){  //ищу все данные о дисциплинах
    let arrCells = [],
      arrValues = [];
    for(let i = this.sheetCells.length - 1; i > 0; i--){
      arrCells.unshift(this.sheetCells[i]);
      arrValues.unshift(this.sheetValues[i]);
      if(this.sheetCells[i] == this.disciplinesCode[0]){
        break;
      }
    }

    return {arrCells, arrValues};
  }
}
