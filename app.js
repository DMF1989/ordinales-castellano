    var quote = '';
    var s;
    var interval;

    var miCampo = document.getElementById('enter');
    var span = document.getElementsByTagName("span");
    var tit = document.querySelectorAll("h3");
    var label = document.getElementsByTagName("label")

    var a = document.getElementById("a");
    var chk = document.getElementById("g");
    var skc = document.getElementById('"');
    var apocope = document.getElementById("apocope");

    a.addEventListener("click",() => { submit() } )
    
    chk.addEventListener("click", change);
    skc.addEventListener("click",() => {
    if(skc.checked==true){quote = '"'; submit()} 
    else {quote = ''; submit()}});

    function selOpt() {
        var select = document.getElementById('mySelect').value;
        if(select == 'lowercase'){s = 'l'; submit()};
        if(select == 'capitalize'){s = 'c'; submit()};
        if(select == 'uppercase'){s = 'u'; submit()};
    };    
    
    function change(){if(chk.checked) {g = 'f'; apocope.checked=false; submit()} 
    else {g = 'm'; submit()}
    };

    apocope.addEventListener("click",() => {
        if (apocope.checked) {change()}
    })

    submit = () => {

    for (let h3 of tit) {
        if (miCampo.value != 0) {h3.style.display = "block"} else {h3.style.display = "none"}
    };  

    if (apocope.checked==true) {chk.checked=false};
    let value = enter.value.replace(/[^0-9]/g, '');

    if(value == 7){pre = ' o '; span[2].style.display = 'inline'} 
    else if([11, 12, 13].includes(Number(value))) {span[2].style.display = 'inline'}
    else{pre = ' y ';span[2].style.display = 'none'}
 
    span[0].innerHTML = quote + toOrdinal(value, g, s) + quote;
    span[1].innerHTML = ' o ' + quote + alOrdinal(value - 11, g, s) + quote;
    span[2].innerHTML = pre + quote + alOrdinal2(value - 7, g, s) + quote;
    span[3].innerHTML = quote + cardinales(value) + quote;
    
    if(value == 0){[0, 3].forEach(i => span[i].innerHTML = '')};
    if([11, 13].includes(Number(value))){span[1].style.display = "inline"}
    else {span[1].style.display = "none"};
    }

    function changeCase(ordinal){
        if (s == 'u') {return ordinal.toUpperCase()}
        else if (s == 'c') {return capitalizeWords(ordinal)}
        if (s == 'l') {return ordinal.toLowerCase()};
        return ordinal
    };

    function capitalizeWords(str) {
        let words = str.split(' ');
        let result = [];
        for (let i = 0; i < words.length; i++) {
            if (words[i] !== 'y') {
                result.push(words[i].charAt(0).toUpperCase() + words[i].slice(1));
            } else {
                result.push(words[i]);
            }
        }
        return result.join(' ');
    }

    miCampo.addEventListener('keypress', function (evt) {
        var key = evt.key;
        if (key < '0' || key > '9')
        {
            evt.preventDefault();
        }
    });

    miCampo.addEventListener('input', formatValue);

    var digitSpace;
    /* var twoDigitSpace; */
    let backspace;
    let keyNumber
    miCampo.onkeydown = function(event) {
      digitSpace = (/^\d\s/).test(miCampo.value)
    /*   twoDigitSpace = (/^\d\d\s/).test(miCampo.value) */
      if (event.key == "Backspace") {backspace = true} else {backspace = false}
      if (event.key == /^[0-9]*$/i) {keyNumber == true} else {keyNumber = false}
    };

    function formatNumber(n) {
        // Obtener la posición actual del cursor
        var position = miCampo.selectionStart;
        // Convertir el número a una cadena y dividir la parte entera de los decimales
        var parts = n.toString().split(" ");
        // Reemplazar los números con una coma cada tres dígitos en la parte entera
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        // Unir la parte entera y decimal de nuevo
        var formatted = parts.join(" ");
        // Establecer el valor del elemento con el número formateado
        miCampo.value = formatted;
        // Ajustar posición del cursor
        miCampo.setSelectionRange(position, position);
        if (digitSpace && backspace && position > 1) {miCampo.setSelectionRange(position, position-1)};
        if ((/^\d\d\s/).test(miCampo.value) && backspace) {miCampo.setSelectionRange(position, position)};
        if ((/^\d\s\d\d\d/).test(miCampo.value) && !backspace) {miCampo.setSelectionRange(position+1, position+1)};
        return formatted;
    };
    
    function formatValue(e) {
        e.target.value = formatNumber(e.target.value.replace(/[^0-9]/g, ''));
    }
    
    function changeValue(delta) {
        var currentValue = miCampo.value === '' ? 0 : miCampo.value.replace(/ /g, '');
        if (currentValue === 0 && delta < 0) {
            return;
        }
        var newValue = new BigNumber(currentValue).plus(delta).toFixed();
        if (newValue >= 0) {
            miCampo.value = newValue == 0 ? '' : formatNumber(newValue);
            submit();
        }
    }

    function handleButton(buttonId, delta) {
    var button = document.getElementById(buttonId);
    button.addEventListener("mousedown", function(event) {
      if(event.button == 2) return; 
      changeValue(delta);
      interval = setInterval(changeValue, 100, delta);
    });
    button.addEventListener("mouseup", function() {
      clearInterval(interval);
    });
}
      
      handleButton("incrementButton", 1);
      handleButton("decrementButton", -1);
      
      miCampo.addEventListener('paste', function (e) {
        var textoPegado = (e.clipboardData || window.Clipboard).getData('text');
        var textoFiltrado = textoPegado.replace(/\D/g,'');
        if (textoPegado !== textoFiltrado) {
            e.preventDefault();
            document.execCommand('insertText', false, textoFiltrado);
        }
    });


  
    enter.addEventListener('input', function() {
        const textWidth = getTextWidth(this.value);
        this.style.width = (textWidth + 200) + 'px';
      });
      
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

