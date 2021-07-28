const parse = require('./parse');

let getGroups = (fileName) => {
    let dis = parse.getDisciplines(fileName).dis;
    delete require.cache[require.resolve('./parse.js')];
    return findGroups(dis);
};


let findGroups = (dis) =>{
    let length = dis.length - 1;
    let name = dis[length].group;
    let arr = [],
        disciplines = [];
    while(dis.length + 1){
        if(name == dis[length].group){
            arr.unshift(dis.pop());
            length = dis.length - 1;
        }
        else{
            disciplines.unshift(arr);
            name = dis[dis.length - 1].group;
            arr = [];
        }
        if(dis.length == 0){
            disciplines.unshift(arr);
            break;
        }
    }
    return disciplines;

};


exports.getGroups = getGroups;
