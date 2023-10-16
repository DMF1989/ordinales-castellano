let label = document.querySelector('label');
let answer = document.getElementById("result");
let text = document.getElementById("thousandsText");
let base = document.getElementById("base");
let romanField = document.getElementById("romanNumber");
var nume = document.querySelector("form > span");
var boter = document.querySelector("button");
const container = document.getElementById('only');
var hourTime = document.querySelector("span:first-of-type");
var dateHTML = document.getElementById('date');
var nuevoElemento;
var overline;
var doubleline;

let romanNumerals = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

let regexDecimal = /^[0-9]*$/i;
let regexRoman = /^[IVXLCDM]*$/i;

base.onkeydown = function(e) {
  const validKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
  if (!regexRoman.test(e.key) && !validKeys.includes(e.key)) {e.preventDefault()}
}
var id;
base.onkeyup = function(e) {
  id = '';
  romanToDecimal(e.target.innerText);
  del()
}

var romanNumeral;
// Uso de la función
romanField.addEventListener('input', function(e) {
  id = 'a'
  const valor = e.target.value;
    // Eliminar cualquier carácter no numérico y no romano
    var num = e.target.value.replace(/[^0-9.ivxlcdm]/g, "");
    // Si es un número decimal, formatearlo
    if (/^[0-9.]+$/.test(num)) {
        e.target.value = formatNumber(num);
        romanNumeral = decimalToRoman((valor).replaceAll(' ',''));
        base.innerText = '';
    }
    // Si es un número romano, dejarlo como está
    else if (/^[ivxlcdm]+$/.test(num)) {
        e.target.value = num;
        romanToDecimal(valor);
        doubleline = '';
        overline = ''
    }
    // Si es una mezcla de números romanos y decimales, borrar la entrada
    else if (!(regexRoman.test(valor) || regexDecimal.test(valor))) {
        e.target.value = '';
    };
    if (regexDecimal.test(valor)) {base.style.display = 'none'; changelanguaje()} else if (regexRoman.test(valor)) {base.style.display = 'flex'; changelanguaje()};
    if (!romanField.value) {base.style.display = 'flex'; changelanguaje()};
    del()
})

function formatNumber(n) {
  // Convertir el número a una cadena y dividir la parte entera de los decimales
  var parts = n.toString().split(" ");
  // Reemplazar los números con una coma cada tres dígitos en la parte entera
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  // Unir la parte entera y decimal de nuevo
  return parts;
}

function del(){
  if(!base.innerText && !romanField.value) {text.innerHTML = ''; answer.innerHTML = ''; overline = ''; pseudoElement(); 
  removeElement()} 
};

var correctorCalled;
var romanToDecimal = function (e){

        var arabicNumber = 0;
        let romanNumber = e.toUpperCase();

        if ((/IIII|XXXX|CCCC|MMMM/).test(romanNumber)) {corrector(0)};

        if ((/VV|LL|DD/).test(romanNumber)) {corrector(1)};
        
        for (let i = 0; i < romanNumber.length; i++) {
          const currentValue = Number(romanNumerals[romanNumber[i]]);
          const nextValue = Number(romanNumerals[romanNumber[i + 1]]);
          const secondNextValue = Number(romanNumerals[romanNumber[i + 2]]);
          if (nextValue && nextValue > currentValue) {
            arabicNumber -= currentValue;
            if([5, 50, 500].includes(currentValue)) {corrector(2)};

            for (let f = 0; f < 3; f++){
            if(currentValue == 1*10**f && ![5*10**f, 10*10**f].includes(nextValue)) {
              TypeOne(romanNumber[i], romanNumber[i + 1]);
              corrector(oneError);
              };
            };

            if (['V', 'L', 'D'].includes(romanNumber[i-1])) if(romanNumber[i-1] == romanNumber[i+1]) {corrector(3)};

            if (['I', 'X', 'C'].includes(romanNumber[i])) if(romanNumber[i] == romanNumber[i+2]) {corrector(4)} else if (romanNumber[i-1] == romanNumber[i]) {corrector(5)};

            if (currentValue < (nextValue, secondNextValue)) {corrector(6)}
          } else {
            arabicNumber += currentValue;
          }
        }
        return arabicNumber;
};

function decimalToRoman(decimal) {
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

  if (decimal > 3999999) {
    var millions = Math.floor(decimal / 1000000);
    decimal %= 1000000;
    doubleline = convert(millions);
  } else if (decimal < 4000000) {doubleline = ''}

  if (decimal > 3999) {
    var thousands = Math.floor(decimal / 1000);
    decimal %= 1000;
    overline = convert(thousands);
  } else if (decimal < 4000) {overline = ''}
  else {overline = ''}

  ans += convert(decimal);
  return ans;
};

function result(){
  pseudoElement();
  removeElement();

  nuevoElemento = document.createElement("span");
  nuevoElemento.innerHTML = doubleline;
  nuevoElemento.style.cssText = 'text-decoration: overline; border-top: 2px solid black; position: relative; padding-top: 4px; font-size: 20px';
'4000000'

        if (regexRoman.test(romanField.value) || base.innerText) {answer.innerHTML = (Number(romanToDecimal(base.innerText))*1000 + Number(romanToDecimal(romanField.value))).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + '.'; if (answer.classList.contains('margintext')) {answer.classList.remove('margintext')}} 
        else {answer.innerHTML = romanNumeral + '.'; answer.parentNode.insertBefore(nuevoElemento, answer); 
        answer.classList.add('margintext')};
        if (!romanField.value && !base.innerText) {text.innerText = empty; answer.innerHTML = ''; setTimeout(function() {
          text.innerText = '';
      }, 3000)} else {text.innerText = response};
};

function pseudoElement(){
  let stylesheet = document.styleSheets[0]; 
  let ruleText = `#result::before { content: '${overline}'; text-decoration: overline; font-size: 20px; margin-right: 3px}`;

function pseudoElementExists(selector, pseudoElement) {
    var sheets = document.styleSheets;
    var pseudoElementSelector = selector + pseudoElement;
      
          for (var i = 0; i < sheets.length; i++) {
              var rules = sheets[i].cssRules;
              for (var j = 0; j < rules.length; j++) {
                  if (rules[j].selectorText === pseudoElementSelector) {
                      return true;
                  }
              }
          }
          return false;
      };

      if (overline) if (!pseudoElementExists("#result", "::before")) {stylesheet.insertRule(ruleText, 0)} 
      else if (pseudoElementExists("#result", "::before")) {stylesheet.deleteRule(ruleText, 0), stylesheet.insertRule(ruleText, 0)};
      if (!overline && pseudoElementExists("#result", "::before")) {stylesheet.deleteRule(ruleText, 0);
    }
};

  const keys = Object.keys(romanNumerals);
  const values = Object.values(romanNumerals);
  for (let i = 0; i < 7; i++) {
  const h2 = document.createElement('h2');
  const color = i % 2 === 0 ? '#1E90FF' : '#00bcd4';
  h2.innerHTML = `<span style="color:#32CD32">${keys[i]}</span> = <span style="color:${color}">${values[i]}</span>`;
  var titleArray = ['ūnus','quinque','decem','quinquaginta','centum','Quingenti','Mille'];
  h2.title = `${titleArray[i]}`
  container.appendChild(h2);
};

corrector = (i) => {
  correctorCalled = true;
  pseudoElement();
  removeElement();
  index = i;
  if (id == 'a') {romanField.value = romanField.value.slice(0, -1)}
  else {cursor()};

  text.innerText = invalid;
  if (i == oneError) {answer.innerHTML = oneError} else {answer.innerHTML = invAns[i]};
  setTimeout(function() {index = ''; answer.innerHTML = '', text.innerText = ''; }, 3000);
};

function cursor() {
  var rango = window.getSelection().getRangeAt(0);
  var posicion = rango.startOffset;
  base.innerText = base.innerText.slice(0, -1)
  if (posicion > base.innerText.length) {
    posicion = base.innerText.length;
};
  rango.setStart(base.childNodes[0], posicion);
  rango.setEnd(base.childNodes[0], posicion);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(rango);
}

romanField.addEventListener('paste', paste);
base.addEventListener('paste', paste);

function paste(e) {
  // Cancela la operación de pegado original
  e.preventDefault();

  // Obtiene el texto del portapapeles
  var text = e.clipboardData.getData('text/plain').trim();

  // Inserta el texto sin formato en el elemento editable
  document.execCommand('insertText', false, text);
 if(regexRoman) {romanToDecimal(text)};
if (correctorCalled) if (id == 'a') {romanToDecimal(romanField.value)}
else {romanToDecimal(base.innerText)}
}

function removeElement() {
  if (answer.parentNode.contains(nuevoElemento)) {
    answer.parentNode.removeChild(nuevoElemento);
};
}
