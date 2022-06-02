const myForm = document.getElementById("myForm");
const songForm = document.getElementById("songForm");
const csvFile = document.getElementById("csvFile");
const table = document.getElementById("results");
const tableHead = document.getElementById("headings");
const sel1 = document.getElementById("Name1");
const kInput = document.getElementById("KNN");
const compareBtn = document.getElementById("compare");
const resultTxt = document.getElementById("knnResult");
const confirmation = document.getElementById("confirm");
const recommendBtn = document.getElementById("recommend");
let isAsc = false;
let datos;
let datos2;
let currName;
let divided = [
  "Nombre",
  "Rock",
  "Urbano",
  "Latino",
  "R&B",
  "Pop",
  "Instrumental",
  "Electrónica",
  "Duración",
  "Animadas",
  "Alegres",
  "Letra",
  "Conocidas"
];
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
          let text = "";
          let cell = row.insertCell();
          if(e[k].length<=2){
            let num = (e[k]/*/6)*/);
            text = document.createTextNode(num/*.toFixed(2)*/);
          }else{
            text = document.createTextNode(e[k]);
          }
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
let k = kInput.value;
let Obj1 =[];
for(var i = 0; i < datos.length; i++) {
  if(name1===datos[i].Nombres){
    Obj1 = datos[i];
  }
}
let Arr1 = Object.values(Obj1);
let Arr1s = Arr1.splice(1);
currName=0;
let cosineArr =[];
while(currName<datos.length){
  let Obj2 = [];
  
  for(var i = 0; i < datos.length; i++) {
    if(i===currName){
      Obj2 = datos[i];
    }
  }
  
  let Arr2 = Object.values(Obj2);
  let Arr2s = Arr2.splice(1);
  let result = [Arr2[0],cosineSimil(Arr1s,Arr2s)];
  cosineArr.push(result);
  currName++;
}
console.log(cosineArr);
//QUITARLE LA SIMILITUD COSENO PROPIA
for (let i = 0; i < cosineArr.length; i++) {
  if(cosineArr[i][1]>=0.99){
    cosineArr.splice(i,1);
  }
  
}
let orderedCosineArr = cosineArr.sort((a,b)=> b[1]-a[1])
let KNNArr = orderedCosineArr.splice(0,k);
let names="";
index = 1;
KNNArr.forEach(element => {
  let name = `<br>${index}.${element[0]}, con una distancia de ${1-element[1]}`;
  index++;
  names+=name;
});
resultTxt.innerHTML=`Los ${k} vecinos más cercanos de ${name1}, por orden de cercanía, son:${names}`
console.log(KNNArr);
});

recommendBtn.addEventListener("click", function (f) {
 //🤡🤡🤡
 //🤡🤡🤡
 //🤡🤡🤡
    var audio = document.getElementById("audio");
    audio.play();
  //🤡🤡🤡
  //🤡🤡🤡
  //🤡🤡🤡
  //ESTO SIRVE PARA QUE LAS COLUMNAS SE VUELVAN STRINGS
  for (let index = 0; index < datos.length; index++) {
    divided.forEach((category,ind) => {
      for (const item of Object.entries(datos[index])) {
        if(category.includes(item[0])){
          divided[ind]=category+","+item[1];
        }
      }
      
    
    }

      );
    
     // console.log(divided);  
  }
  //ESTO SIRVE PARA QUE LOS STRINGS DE LAS COLUMNAS SE VUELVAN ARRAYS
  let arraysArray = [];
  let indexesArray =[];
  for (let index = 1; index < divided.length; index++) {
    let splitDiv = divided[index].split(",");
    let spliceDiv = splitDiv.splice(1);
      arraysArray.push(spliceDiv);
   
  }
  for (let index = 0; index < arraysArray.length; index++) {
   // SE CALCULA LA DESVIACION ESTANDAR Y SE SACAN LOS QUE TIENEN UNA MAYOR  1.5
   if(getStandardDeviation(arraysArray[index])<=1.5){
    indexesArray.push(index);
   for (let j = 0; j < arraysArray[index].length; j++) {
     //SE USA MINIMA MISERIA PARA SACAR LOS MENORES A 3 (2 Y 1)
     var myIndex = arraysArray[index].indexOf("2");
     var myothrIndex = arraysArray[index].indexOf("1");
     console.log(myIndex);
if (myIndex !== -1 || myothrIndex!== -1) {
    indexesArray.splice(myIndex, 1);
}
      
    
     
   }
   

   
    }
   
  }
  console.log(indexesArray);
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
function getStandardDeviation (array) {
  let i,j,total = 0, mean = 0, diffSqredArr = [];
  for(i=0;i<array.length;i+=1){
      total+=parseFloat(array[i]);
  }
  mean = total/array.length;
  for(j=0;j<array.length;j+=1){
      diffSqredArr.push(Math.pow((array[j]-mean),2));
  }
  return (Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl){
           return firstEl + nextEl;
         })/array.length));
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
  opt.innerHTML = datos[i].Nombre;
  opt.value  = datos[i].Nombre;
  sel1.appendChild(opt);
}
  }

  reader.readAsText(input);
  
});
songForm.addEventListener("submit", function (e) {
  e.preventDefault();
  confirmation.style.display ="block";
  const input = songFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToArray(text);
    datos2 = data;
    console.log(datos2);

  };
  reader.readAsText(input);
});