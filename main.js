const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
const table = document.getElementById("results");
const tableHead = document.getElementById("headings");
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

  function sortResults(attr,asc){
    
    switch (attr) {
      case "DMI":
       if(isAsc){
        datos.sort(function(a, b){
          return a.DMI - b.DMI;
        });
        table.innerHTML="";
        generateTable(table,datos);
       }else if(!isAsc){
        datos.sort(function(a, b){
          return b.DMI - a.DMI;
        });
        table.innerHTML="";
        generateTable(table,datos);
        
       }
       console.log(datos);
        break;
        case "Hamburguesa":
          if(isAsc){
           datos.sort(function(a, b){
             return a.Hamburguesa - b.Hamburguesa;
           });
           table.innerHTML="";
           generateTable(table,datos);
          }else if(!isAsc){
           datos.sort(function(a, b){
             return b.Hamburguesa - a.Hamburguesa;
           });
           table.innerHTML="";
           generateTable(table,datos);
          }
           break;
      default:
        break;
    }
  }

tableHead.addEventListener("click", function (f) {
let attr = f.target.id;
isAsc = !isAsc;
sortResults(attr,isAsc);
});

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const data = csvToArray(text);
    datos = data;
    generateTable(table,data);
    

   // document.write(JSON.stringify(data));
  };

  reader.readAsText(input);
});

//SORT
/*
data.sort(function(a, b){
  return a.DMI - b.DMI;
});
*/