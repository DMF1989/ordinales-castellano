window.addEventListener('load', function(){
/*   changeFormatDate(); */
  changelanguaje();
  this.sessionStorage.clear()
});

var lingua = document.getElementById("lang");
lingua.addEventListener("change", changelanguaje);
lingua.addEventListener("change", TypeOne);
var empty;
var response;
var invalid;
var invAns;
var index;

function changelanguaje() {
  var linguaEsp = document.querySelector("span > p:first-child");
  var linguaEng = document.querySelector("span > p:last-child");
  if (lingua.checked) {
    let decEng = 'Decimal number';
    let romEng = 'Roman number';
    linguaEsp.style.visibility = "hidden";
    linguaEng.style.visibility = "initial";
    invalid = 'Invalid number: ';
    invAns = ['More than three repetitions of type one','Type five letter repeated','Type five letter substracting','Type five letter repetition','Type one font repetition','Letter type one subtracted and repeated to the left of it','Letter type one to the left of two higher value letters'];
    empty = 'Insert a roman or arabic decimal number';
    if (regexDecimal.test(romanField.value.replaceAll(' ',''))) {nume.innerText = decEng; boter.innerText = 'Convert to roman number'; response = 'The roman corresponding number is: '} else if (regexRoman.test(romanField.value)) {nume.innerText = romEng; boter.innerText = 'Convert to decimal number'; response = 'The decimal arabic corresponding number is: '};
    if (romanField.value == '') {nume.innerText = romEng; boter.innerText = 'Convert to decimal number'};
    datum = 'Current date'; changeFormatDate();
    hourTime.title = 'Double-click to toggle between 24-hour and 12-hour format';
    dateHTML.title = 'Click to toggle in roman numeral or arabic decimal format';
    base.title = 'Base multiplier of roman numerals per thousand';
  } else {
    let decEsp = 'Número decimal';
    let romEsp = 'Número romano';
    linguaEng.style.visibility = "hidden";
    linguaEsp.style.visibility = "initial";
    invalid = 'Número invalido: ';
    invAns = ['Más de tres repeticiones de letra tipo uno','Letra de tipo cinco repetida','Letra de tipo cinco restando','Repetición de letra de tipo cinco','Repetición de letra de tipo uno','Letra tipo uno restando y repetida a su izquierda','Letra tipo uno a la izquierda de dos de mayor valor'];
    empty = 'Inserte un número romano o arábigo decimal';
    if (regexDecimal.test(romanField.value.replaceAll(' ',''))) {nume.innerText = decEsp; boter.innerText = 'Convertir a número romano'; response = 'El número romano correspondiente es: '} else if (regexRoman.test(romanField.value)) {nume.innerText = romEsp; boter.innerText = 'Convertir a número decimal'; response = 'El número arábigo decimal correspondiente es: '};
    if (romanField.value == '') {nume.innerText = romEsp; boter.innerText = 'Convertir a número decimal'};
    datum = 'Fecha actual'; changeFormatDate();
    hourTime.title = 'Haga doble click para alternar entre formato de 24 y 12 horas';
    dateHTML.title = 'Haga click para alternar entre formato de números romanos o arábigos decimales';
    base.title = 'Base multiplicador de números romanos por mil'
  };
}

let lastTypeI;
let lastTypeIPlus;
let oneError;

function TypeOne(typeI, typeIPlus) {
  if (typeI == '[object Event]') {
    typeI = lastTypeI;
  }
  if (typeIPlus == undefined) {
    typeIPlus = lastTypeIPlus;
  }

  lastTypeI = typeI;
  lastTypeIPlus = typeIPlus;

  if (lingua.checked) {
  oneError = `Letter "${typeI}" subtracted from "${typeIPlus}"`
} else {
  oneError = `Letra "${typeI}" restando a "${typeIPlus}"`
}
};

function getLastArgs() {
  return {lastTypeI, lastTypeIPlus};
};

lingua.addEventListener("change", function(){
if (text.innerText.includes('Insert')) {text.innerText = empty};
if (!(index == undefined)) if(typeof index == "number") {text.innerText = invalid; answer.innerText = invAns[index]} 
if (typeof index == "string" && !(index == '')) {text.innerText = invalid; answer.innerText = oneError};
if (!text.innerText.includes('Insert') && !text.innerText.includes('nvalid') && !answer.innerText == '') {text.innerText = response;}
});

var decimalDateFormat = false

function decimalDateToggle() {
  decimalDateFormat = !decimalDateFormat
  changeFormatDate()
};

var fechaActual = new Date();
var dia = String(fechaActual.getDate()).padStart(1, '0');
var mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
var año = fechaActual.getFullYear();

var datum = '';
function changeFormatDate() {
  if (decimalDateFormat == false) {date = `${datum}: ${decimalDateToRoman(dia)}-${decimalDateToRoman(mes)}-${decimalDateToRoman(año)}`}
  else {date = `${datum}: ${dia}-${mes}-${año}`};
  dateHTML.innerText = date;
  dateHTML.style.cursor = 'pointer'
}

var decimalHourFormat = false

function decimalHourToggle() {
  decimalHourFormat = !decimalHourFormat;
}

var formato24Horas = false

function hourformat() {
  formato24Horas = !formato24Horas;
}

setInterval(function() {

  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var session = "AM";
  
  if(formato24Horas == false){
    if(h == 0){
        h = 12;
    }
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
  } else {
    session = "";
  };
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  if (decimalHourFormat == false) {var time = decimalDateToRoman(h) + ":" + decimalDateToRoman(m) + ":" + decimalDateToRoman(s) + " " + session}
  else {time = h + ':' + m + ':' + s + ' ' + session};
  hourTime.innerText = time;
  hourTime.style.cursor = 'pointer';
},1000)

function decimalDateToRoman(decimal) {
  var roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  var ans = '';

  var convert = function(value) {
    var result = '';
    for (var a in roman) {
      while (value >= roman[a]) {
        result += a;
        value -= roman[a];
      }
    }
    return result;
  };
  ans += convert(decimal);
  return ans;
}