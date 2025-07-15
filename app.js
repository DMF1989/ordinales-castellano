
    var sel;
    var interval;
    let decValue;
    let zero;
    let coma;
    let cero;
    var span = document.getElementsByTagName("span");
    var tit = document.querySelectorAll("h3");
    var div = document.querySelectorAll("div");
    var label = document.getElementsByTagName("label")
    var valorActual = '';
    var a = document.getElementById("a");
    var chk = document.getElementById("g");
    var skc = document.getElementById('com');
    var apocope = document.getElementById("apoc");

    a.addEventListener("click",() => { submit() } )
    
    chk.addEventListener("click", change);

    function selOpt() {
        var select = document.getElementById('mySelect').value;
        if(select == 'lowercase'){sel = 'l'; submit()};
        if(select == 'Title case'){sel = 'c'; submit()};
        if(select == 'Sentence case'){sel = 'se'; submit()};
        if(select == 'UPPERCASE'){sel = 'u'; submit()};
    };    
    
    function change(){if(chk.checked) {g = 'f'; apocope.checked=false; submit()} 
    else {g = 'm'; submit()}
    };

    apocope.addEventListener("click",() => {
        if (apocope.checked) {change()}
    });

    submit = () => {
      for (let h3 of tit) {
        if (enter.value != 0) {
          h3.style.display = "block";
        } else {
          h3.style.display = "none";
        }
      };
      if (apocope.checked == true) {
        chk.checked = false;
      };
      let value = enter.value.replace(/[^0-9,x,e,p,-.^×+*¹²³⁴⁵⁶⁷⁸⁹⁰⁻]/g, "");
      if (/x|×/.test(value)) {
        value = value.replace(/x|×/g, "*");
      };
      if (value.includes("^")) {
        value = value.replaceAll("^", "**");
      };
      if (/[\u00B9\u00B2\u00B3\u2070-\u207F]/.test(value)) {
        value = reemplazarSuperindices(value);
      };
      if (/\d+\-|\+$/g.test(value)) {
        value = value.replace((/(\-|\+)$/g), "");
      };
      if (/\d+\*\*\-$/g.test(value)) {
        value = value.replace((/\*\*\-$/g), "");
      };
      if (/\*[1][0](\-)?|(\*\*\d+)$/g.test(value)) {superindex.style.display = 'block'  
      } else {
        superindex.style.display = 'none'
      };
      if (/10\*\*/g.test(value)) {
        value = value.replace("*10**", "e")
      };
      if (/\.\d+\*\d+/g.test(value) && !/(\-|\+)\d+$/g.test(value)) {
        value = scientificToString(eval(value)).toString();
      };
      if (/\d+\.\d+(\-|\+)\d+(\.\d+)?/g.test(value)) {value = fixNumber(value)}
      if (/\e\d+(\-|\+)\d+/g.test(value)) {
        value = convertString(value);
      };
      if (/\d+(\+|\-|\*)\d+$/g.test(value) && !(/\.\d+(\*|\+)/g).test(value)) {
        value = evaluateBigIntExpression(value);
      };
      if (/^\d+(\.\d+)?e(\+)?\d+/g.test(value)) {
        value = Number(value).toString();
        if (/\e/g.test(value)) {value = scientificToString(Number(value))}
      };
      if (/^\d+(\.\d+)?e\-\d/g.test(value)) {
        value = zeroPoint(value)
      };
      if (/\.\d+$/g.test(value)) {
        decValue = value.match(/\d+$/g);
        for (let i = 3; i <= 4; i++) {div[i].style.display = "none"};
      if (/^[0]\.\d+/g.test(value)) {coma = 'cero coma '
      } else {
        coma = " coma "};
      if ((/^[0]/g).test(decValue)) {
        let zeroCounter = decValue[0].match(/^[0]+/g)[0].length;
        zero = ('cero ').repeat(zeroCounter)
      } else {zero = ''};
      } else {
      for (let i = 3; i <= 4; i++) {div[i].style.display = "block"};
        decValue = "";
        coma = "";
        zero = ''
      };
      if (/^\d+\./g.test(value)) {value = Number.parseInt(value).toString()};
      valorActual = value;
      span[0].innerHTML = changeCase(cardinales(value) + coma + zero + cardinales(decValue));
      span[1].innerHTML = toOrdinal(value, g, sel);
      span[2].innerHTML = polygons(scientificToString(Number(value)));

      if (cardinales(value) === undefined) {
        span[0].innerHTML = "";
      }
      if (toOrdinal(value, g, sel) === undefined) {
        span[1].innerHTML = "";
      }
    };

    function convertToBigIntExpression(expr) {
        // Dividir la expresión en números y operadores
        const tokens = expr.match(/\d+|\+|\-|\*|\/|\*\*|[()]/g);
    
        // Convertir cada número a BigInt y reformatear la expresión
        const bigIntExpr = tokens.map(token => {
            if (/^\d+$/.test(token)) {
                return `BigInt('${token}')`;
            }
            return token;
        }).join('');
    
        return bigIntExpr;
    };

    function evaluateBigIntExpression(expr) {
        const bigIntExpr = convertToBigIntExpression(expr);

        // Crear una función para evaluar la expresión convertida
        const func = new Function('BigInt', `return ${bigIntExpr}`);
    
        // Evaluar la expresión con BigInt
        return func(BigInt);
    };

    function convertString(string){
        let decimal = string.match(/(\-|\+)\d+$/g);
        let exponential = string.match(/^(\d+(\.\d+)?e(\+)?\d+)/g);
        return BigInt(scientificToString(Number(exponential))) + BigInt(Number(decimal));
    };
    
    function reemplazarSuperindices(cadena) {
        const superindices = {
            '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5',
            '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁰': '0',
            '⁻': '-'
        };
    
        return cadena.replace(/(\d+)([¹²³⁴⁵⁶⁷⁸⁹⁰⁻]+)/g, (match, p1, p2) => {
            let exponent = '';
            for (let char of p2) {
                exponent += superindices[char];
            }
            return `${p1}**${exponent}`;
        });
    }

    function changeCase(ordinal){
        if (sel == 'u') {return ordinal.toUpperCase()}
        else if (sel == 'c') {return titleCase(ordinal)}
        else if (sel == 'se') {return sentenceCase(ordinal)}
        if (sel == 'l') {return ordinal.toLowerCase()};
        return ordinal
    };

    function titleCase(str) {
        let words = str.split(' ');
        let result = [];
        for (let i = 0; i < words.length; i++) {
            if (words[i] !== 'y' && words[i] !== 'o' && words[i] !== 'u') {
                result.push(words[i].charAt(0).toUpperCase() + words[i].slice(1));
            } else {
                result.push(words[i]);
            }
        }
        return result.join(' ');
    };

    function sentenceCase(texto) {
        if (!texto) return texto; // Maneja el caso de cadena vacía o indefinida
        return texto[0].toUpperCase() + texto.slice(1).toLowerCase();
    };

    enter.addEventListener('keypress', function (evt) {
        var key = evt.key;
        var currentValue = enter.value;
        const input = evt.target;
        const cursorPos = input.selectionStart;
        // Obtener el texto a la izquierda del cursor
        const leftText = input.value.substring(0, cursorPos);
        // Comprobando si hay al menos un número en el campo
        var hasNumber = /\d/.test(currentValue);

        if ((key < '0' || key > '9') && key !== 'x' && key !== 'e' && key !== '-' && key !== '+' && key !== '.' && key !== '^' 
            && key !== '×' && key !== '*' && key !== '¹' && key !== '²' && key !== '³') {
            evt.preventDefault();
        };
        if ((/(\x|\*)/g).test(key)) {
            evt.preventDefault();
            // Insertar "×" en la posición del cursor
            var newValue = input.value.slice(0, cursorPos) + '×' + input.value.slice(cursorPos);
            input.value = newValue;
            // Mover el cursor a la posición correcta
            input.setSelectionRange(cursorPos + 1, cursorPos + 1);
        };
        if ((key === 'e' && currentValue.includes('e')) ||
            (key === 'x' && currentValue.includes('xx')) ||
            ((key === 'x' || key === 'e' || key === '.') && !hasNumber)) {
            evt.preventDefault();
        };
        if (/\+|\-/g.test(key) && (leftText.endsWith('-') || leftText.endsWith('+'))) {
            evt.preventDefault();
        };
    });

    enter.addEventListener('input', formatValue);
    function formatValue(e) {
        if (!(/(e|\.|\^|×|\+|\-)/g).test(enter.value)){e.target.value = formatNumber(e.target.value.replace(/[^0-9]/g, ''))};
    };

    var digitSpace;
    let backspace;
    let keyNumber
    enter.onkeydown = function(event) {
      digitSpace = (/^\d\s/).test(enter.value);
      if (event.key == "Backspace") {backspace = true} else {backspace = false}
      if (event.key == /^[0-9]*$/i) {keyNumber == true} else {keyNumber = false}
      if (event.key == 0) {quote = ''}
    };

function formatNumber(n) {
    // Eliminar todos los espacios previos para calcular correctamente
    let raw = n.toString().replace(/\s/g, "");

    // Capturar posición relativa al número sin espacios
    let digitsBeforeCursor = 0;
    for (let i = 0; i < enter.selectionStart; i++) {
        if (/\d/.test(enter.value[i])) digitsBeforeCursor++;
    }

    // Formatear número con espacios cada 3 cifras desde la derecha
    let formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    // Actualizar el campo
    enter.value = formatted;

    // Calcular la nueva posición del cursor según la cantidad de dígitos previos
    let i = 0, count = 0;
    while (count < digitsBeforeCursor && i < formatted.length) {
        if (/\d/.test(formatted[i])) count++;
        i++;
    }

    // Aplicar la nueva posición del cursor
    enter.setSelectionRange(i, i);

    return formatted;
}
    
    function changeValue(delta) {
        if (valorActual === 0 && delta < 0) {
            return;
        }
        var newValue = BigInt(valorActual) + BigInt(delta);
        if (newValue >= 0) {
            valorActual = newValue == 0 ? formatNumber('') : formatNumber(newValue);
            submit();
        }
    };

    function handleButton(buttonId, delta) {
    var button = document.getElementById(buttonId);
    button.addEventListener("mousedown", function(event) {
      if(event.button == 2) return; 
      changeValue(delta);
      interval = setInterval(changeValue, 100, delta);
    });
    button.addEventListener("mouseup", function() {
      clearInterval(interval);
        })
    };
      
      handleButton("incrementButton", 1);
      handleButton("decrementButton", -1);
      
      enter.addEventListener('wheel', function(event) {
        event.preventDefault()
    if (event.deltaY < 0) {changeValue(1)

        } else {
        changeValue(-1)
        }
    })

    enter.addEventListener('paste', function (e) {
      var textoPegado = (e.clipboardData || window.Clipboard).getData('text');
      var textoFiltrado = textoPegado.replace(/\e\x\-\D/g,'');
      if (textoPegado !== textoFiltrado) {
          e.preventDefault();
          document.execCommand('insertText', false, textoFiltrado);
        }
    });

      function insertSuperIndex(text) {
       const startPos = enter.selectionStart;
       const endPos = enter.selectionEnd;
       const currentValue = enter.value;
                
       // Insertar el texto en la posición del cursor
       enter.value = currentValue.substring(0, startPos) + text + currentValue.substring(endPos);
                
       // Mover el cursor después del texto insertado
       enter.selectionStart = enter.selectionEnd = startPos + text.length;
                
       // Enfocar el "enter" de nuevo
       enter.focus();
       submit()
    }

      function deleteBeforeCursor() {
          const startPos = enter.selectionStart;
          const endPos = enter.selectionEnd;
          const currentValue = enter.value;
                
          if (startPos === endPos && startPos > 0) {
              // Borrar un solo carácter (cuando no hay selección)
              enter.value = currentValue.substring(0, startPos - 1) + currentValue.substring(endPos);
              enter.selectionStart = enter.selectionEnd = startPos - 1;
          } else if (startPos !== endPos) {
              // Borrar la selección
              enter.value = currentValue.substring(0, startPos) + currentValue.substring(endPos);
              enter.selectionStart = enter.selectionEnd = startPos;
          }
          enter.focus();
          submit()
      }

      decrementButton.addEventListener('click', boxWidth);
      incrementButton.addEventListener('click', boxWidth);
      enter.addEventListener('wheel', boxWidth);
      enter.addEventListener('input', boxWidth);
      function boxWidth() {
        enter.style.width = 'auto'; // Reiniciar el ancho antes de medir
        const newWidth = Math.max(enter.scrollWidth, 265);
        enter.style.width = `${newWidth}px`;
    };

      function getTextWidth(text) {
        const dummyElement = document.createElement('span');
        dummyElement.style.visibility = 'hidden';
        dummyElement.style.whiteSpace = 'nowrap';
        dummyElement.textContent = text;
        document.body.appendChild(dummyElement);
        const width = dummyElement.getBoundingClientRect().width;
        document.body.removeChild(dummyElement);
        return width;
      }



