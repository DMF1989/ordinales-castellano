var space = ' ';

function toOrdinal(n, g) {
    var ordinales = [
        ["","primero","segundo","tercero","cuarto","quinto","sexto","séptimo","octavo","noveno"],
        ["","décimo","vi","tri","cuadra","quincua","sexa","septua","octo","nona"],
        ["","cen","ducen","tricen","cuadringen","quingen","sexcen","septingen","octingen","noningen"]
    ];
    ordinales[1] = ordinales[1].map(word => ['','décimo'].includes(word) ? word : word + 'gésimo')
    ordinales[2] = ordinales[2].map(word => [''].includes(word) ? word : word + 'tésimo')
    let ordinal = '';
    if (apocope.checked) {ordinales[0][1] = 'primer'; ordinales[0][3] = 'tercer'}
    if (a.checked==true) {
         space = ''; if (n.match(/\d{1}$/g) != 0) {ordinales[1][1] = ordinales[1][1].replace('é','e')}}    
    else {space = ' '};

    let number = eliminarCifras(n,-9);
    let numBil = eliminarCifras(n,-15);
    let numTri = eliminarCifras(n,-21);
    let numCua = eliminarCifras(n,-27);
    let numQui = eliminarCifras(n,-33);   

    if (numQui < BigInt(scientificToString(2e30)) && numQui > 999999999999999999999999999999n) if(n < 1e9){quintillonesimo = 'quintillónesimo '} else {quintillonesimo = 'un quintillónesimo '};
    if (numQui > 1999999999999999999999999999999n) {if(n < 1e33) {quintillonesimo = 'quintillónesimo '} else {quintillonesimo = ' quintillónesimo '}};
    if (numQui < 1e30) { milquin = ' mil quintillónesimo '} else { milquin = ' mil '};    

    if (numCua < BigInt(scientificToString(2e24)) && numCua > 999999999999999999999999n) if(n < 1e9){cuatrillonesimo = 'cuatrillónesimo '} else {cuatrillonesimo = 'un cuatrillónesimo '};
    if (numCua > 1999999999999999999999999n) {if(n < 1e27) {cuatrillonesimo = 'cuatrillónesimo '} else {cuatrillonesimo = ' cuatrillónesimo '}};
    if (n >= BigInt(1e30)) {cuatrillonesimo = 'cuatrillónesimo '};
    if (numCua < 1e24) { milcuatri = ' mil cuatrillónesimo '} else { milcuatri = ' mil '};

    if (numTri < BigInt(2e18) && numTri > 999999999999999999n) if(n < 1e9){trillonesimo = 'trillonésimo '} else {trillonesimo = 'un trillonésimo '};
    if (numTri > 1999999999999999999n) {if(n < 1e21) {trillonesimo = 'trillonésimo '} else {trillonesimo = ' trillonésimo '}};
    if (n >= BigInt(1e24)) {trillonesimo = 'trillonésimo '};
    if (numTri < 1e18) { miltrillo = ' mil trillonésimo '} else { miltrillo = ' mil '};

    if (numBil < 2e12 && numBil > 999999999999) if(n < 1e9){billonesimo = 'billonésimo '} else {billonesimo = 'un billonésimo '};
    if (numBil > 1999999999999) {if(n < 1e15) {billonesimo = 'billonésimo '} else {billonesimo = ' billonésimo '}};
    if (n >= BigInt(1e18)) {billonesimo = 'billonésimo '}
    if (numBil < 1e12) { milbillo = ' mil billonésimo '} else { milbillo = ' mil '};

    if (number < 2e6 && number > 999999) if(n < 1e9){millon = 'millonésimo '} else {millon = 'un millonésimo '};
    if (number > 1999999) {if(n < 1e9) {millon = 'millonésimo '} else {millon = ' millonésimo '}};
    if (n >= BigInt(1e12)) {millon = 'millonésimo '}
    if (number < 1e6) { millardo = ' mil millonésimo '} else { millardo = ' mil '};

    if (n >= BigInt(scientificToString(1e33))) {
        ordinal += numeroEnPalabras(eliminarUltimas(n, 33)) + milquin;
        n = BigInt(n) % (10n**33n)
    }
    if (n >= BigInt(scientificToString(1e30))) {
        ordinal += numeroEnPalabras(eliminarUltimas(n, 30)) + quintillonesimo;
        n = BigInt(n) % (10n**30n)
    } 
    if (n >= BigInt(scientificToString(1e27))) {
        ordinal += numeroEnPalabras(eliminarUltimas(n, 27)) + milcuatri;
        n = BigInt(n) % (10n**27n)
    }    
    if (n >= BigInt(scientificToString(1e24))) {
        ordinal += numeroEnPalabras(eliminarUltimas(n, 24)) + cuatrillonesimo;
        n = BigInt(n) % (10n**24n)
    }
    if (n >= BigInt(1e21)) {
        ordinal += numeroEnPalabras(eliminarUltimas(n, 21)) + miltrillo;
        n = BigInt(n) % (10n**21n)
    }
    if (n >= BigInt(1e18)) {
        ordinal += numeroEnPalabras(eliminarUltimas(n, 18)) + trillonesimo;
        n = BigInt(n) % (10n**18n)
    } 
    if (n >= 1e15) {
        ordinal += numeroEnPalabras(eliminarUltimas(n, 15)) + milbillo;
        n = BigInt(n) % (10n**15n)
    } 
    if (n >= 1e12) {
        ordinal += numeroEnPalabras(eliminarUltimas(n, 12)) + billonesimo;
        n = n.toString()
        n %= 1e12
    } 
    if (n >= 1e9) {
        ordinal += numeroEnPalabras(eliminarUltimas(n, 9)) + millardo;
        n = n.toString()
        n %= 1e9
    }    
    if (n >= 1e6) {
        ordinal += numeroEnPalabras(eliminarUltimas(n, 6)) + millon;
        n = n.toString()
        n %= 1e6;
    }  
    if (n >= 1e3) {
        ordinal += numeroEnPalabras(eliminarUltimas(n, 3)) + 'milésimo ';
        n = n.toString()
        n %= 1e3;
    }
    if (n >= 100) {
        ordinal += ordinales[2][eliminarUltimas(n, 2)] + ' ';
        n = n.toString()
        n %= 100;
    }
    if (n >= 10) {
        ordinal += ordinales[1][eliminarUltimas(n, 1)] + space;
        n = n.toString()
        n %= 10;
    }
    if (n > 0) {
        ordinal += ordinales[0][n];
    };

    if (enter.value == 7) {ordinal += ' o sétimo'};
    if (enter.value == 11) {ordinal += ', onceno  o undécimo'};
    if (enter.value == 12) {ordinal += ' o duodécimo'};
    if (enter.value == 13) {ordinal += ', decimotercio o tredécimo'};
    if (enter.value == 16) {ordinal += ' o hexadécimo'};
    if (enter.value == 19) {ordinal += ' o decimonono'};

    ordinal = ordinal.replace(/\s\s+/g, ' ');
    if (g == 'f') {ordinal = genre(ordinal)};
    if (ordinal.includes('oo')) {ordinal = ordinal.replace('oo','o')};

    return reemplazarPrimeraLetraAcentuada(ordinal.trim())
}

function reemplazarPrimeraLetraAcentuada(texto) {
    const vocalesAcentuadas = ['á', 'é', 'í', 'ó', 'ú'];
    const vocales = ['a', 'e', 'i', 'o', 'u'];
    let palabras = texto.split(' ');
    for (let j = 0; j < palabras.length; j++) {
        let palabra = palabras[j];
        let contador = 0;
        for (let i = 0; i < palabra.length; i++) {
            if (vocalesAcentuadas.includes(palabra[i])) {
                contador++;
            }
        }
        if (contador >= 2) {
            for (let i = 0; i < palabra.length; i++) {
                if (vocalesAcentuadas.includes(palabra[i])) {
                    let indice = vocalesAcentuadas.indexOf(palabra[i]);
                    palabra = palabra.substr(0, i) + vocales[indice] + palabra.substr(i + 1);
                    break;
                }
            }
        }
        palabras[j] = palabra;
    }
    return changeCase(palabras.join(' '));
};

function genre(ordinal) {
    let words = ordinal.split(" ");
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        const excludedWords = /cuatro|cinco|ocho|ciento|tercio|^o$/;
        if (word.endsWith(['o']) && !excludedWords.test(words[i])) {
            words[i] = word.slice(0, -1) + 'a';
        };
        if (word.endsWith(['o,']) && !excludedWords.test(words[i])) {
            words[i] = word.slice(0, -2) + 'a,';
        };
        if (word.endsWith('iún') && !['millón', 'millones'].includes(words[i+1])) {
            words[i] = word.slice(0, -2) + 'una';
        }
        if (word === 'un' && !['millón', 'millones'].includes(words[i+1])) {
            words[i] = 'una';
        }
    }
    return words.join(" ");
};
