const XLSX = require('xlsx');
let path = require('path');
path = path.resolve('parse.js');


let dataMap = new Map();


function years(sheet_name_list){
  let regXp = /курс/i,
    numRegXp = /\d/;
    lists = new Map(),
    keys = [];

  for(let key in sheet_name_list){
    if(regXp.test(key)){
      lists.set(+key.match(numRegXp), sheet_name_list[key]);
      keys.push(+key.match(numRegXp));
    }
  }
  return {lists, keys};
}


function add2Class(listsMap){  //добавляю каждый лист в карту
  const Discpline = require('./parserClasses/discipline');
  this.lists = listsMap;
  for(let i = 1; i <= this.lists.size; i++){
    let list = new Discpline(this.lists.get(i));
    dataMap.set(i, list);
  }
}



let getDisciplines = (fileName) =>{
  let workbook = XLSX.readFile(path.slice(0, path.length - 16) + `\\parser\\uploads\\` + fileName),
  sheet_name_list = workbook.Sheets,
  listsMap = years(sheet_name_list).lists; //коллекция листов по годам
  add2Class(listsMap);

  let dis = []; //массив дисциплин с их данными
  let lists = [];
  dataMap.forEach((value, key, map)=>{
  dataMap.get(key).disMap.forEach((value1, key1, map1)=>{
      dis.push(dataMap.get(key).sortBySemester(key1));
   });
  });
  listsMap.forEach((value, key, map) =>{
    lists.push(key);
  });
  return {dis, lists};
}

exports.getDisciplines = getDisciplines;
