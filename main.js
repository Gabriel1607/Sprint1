const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
const table = document.getElementById("results");
const tableHead = document.getElementById("headings");
const sel1 = document.getElementById("Name1");
const sel2 = document.getElementById("Name2");
const compareBtn = document.getElementById("compare");
const resultTxt = document.getElementById("result");
let isAsc = false;
let datos;

function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\r\n")).split(delimiter);
  
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\r\n");

    // Map the rows
      // split values from each row into an array
      // use headers.reduce to create an object
      // object properties derived from headers:values
      // the object passed as an element of the array
      const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
          object[header] = values[index];
          return object;
        }, {});
        return el;
      });
       // return the array
       return arr;
  }

  function generateTable(table, data) {
    for (let e of data) {
      let row = table.insertRow();
      for (k in e) {
        let cell = row.insertCell();
        let text = document.createTextNode(e[k]);
        cell.appendChild(text);
      }
    }
  }

  function generateTableConsoleLog() {
    for (let e of data) {
      let row = table.insertRow();
      for (k in e) {
        let cell = row.insertCell();
        let text = document.createTextNode(e[k]);
        cell.appendChild(text);
      }
    }
  }

  function sortResults(attr){
    if(isAsc){
      datos.sort(function(a, b){
        return a[attr] - b[attr];
      });
      table.innerHTML="";
      generateTable(table,datos);
     }else if(!isAsc){
      datos.sort(function(a, b){
          return b[attr] - a[attr];
      });
      table.innerHTML="";
      generateTable(table,datos);
      
     }
     console.log(datos);
  }

tableHead.addEventListener("click", function (f) {
let attr = f.target.id;
console.log(attr);
isAsc = !isAsc;
sortResults(attr);
});

compareBtn.addEventListener("click", function(){
let name1 = sel1.options[sel1.selectedIndex].text;
let name2 = sel2.options[sel2.selectedIndex].text;
let Obj1 =[];
let Obj2 = [];
for(var i = 0; i < datos.length; i++) {
  if(name1===datos[i].Nombres){
  Obj1 = datos[i];
  }
}
for(var i = 0; i < datos.length; i++) {
  if(name2===datos[i].Nombres){
   Obj2 = datos[i];
  }
}
let Arr1 = Object.values(Obj1);
let Arr2 = Object.values(Obj2);
let Arr1s = Arr1.splice(1);
let Arr2s = Arr2.splice(1);
let result = cosineSimil(Arr1s,Arr2s);
if(result>=0.99){
resultTxt.innerHTML = "La similitud coseno es: 1<br>¡Increíble, estas dos personas son como almas gemelas!";
}else{
  resultTxt.innerHTML = `La similitud coseno es: ${result}`;
};
});
function cosineSimil(Arr1,Arr2){
  let d = dotProduct(Arr1,Arr2);
  let m1 = magnitude(Arr1);
  let m2 = magnitude(Arr2);
  let result = d/(m1*m2);
  return result;
   
}
function dotProduct(a,b){
  var sum = 0;
for(var i=0; i< a.length; i++) {
    sum += a[i]*b[i];
}
return sum;
}
function magnitude(a){
var sum = 0;
for(var i=0; i< a.length; i++) {
  sum += Math.pow(a[i],2);
}
let result = Math.sqrt(sum);
return result;
}
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToArray(text);
    datos = data;
    generateTable(table,data);
    fillSelects(data);

  };
 function fillSelects(datos){
for(var i = 0; i < datos.length; i++) {
  var opt = document.createElement('option');
  opt.innerHTML = datos[i].Nombres;
  opt.value  = datos[i].Nombres;
  sel1.appendChild(opt);
}
for(var i = 0; i < datos.length; i++) {
  var opt = document.createElement('option');
  opt.innerHTML = datos[i].Nombres;
  opt.value  = datos[i].Nombres;
  sel2.appendChild(opt);
}
  }

  reader.readAsText(input);
  
});
