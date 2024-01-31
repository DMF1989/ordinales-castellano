var space = ' ';

function toOrdinal(n, g) {
    var ordinales = [
        ["","primero","segundo","tercero","cuarto","quinto","sexto","séptimo","octavo","noveno"],
        ["","décimo","vigésimo","trigésimo","cuadragésimo","quincuagésimo","sexagésimo","septuagésimo","octogésimo","nonagésimo"],
        ["","centésimo","ducentésimo","tricentésimo","cuadringentésimo","quingentésimo","sexcentésimo","septingentésimo","octingentésimo","noningentésimo"]
    ]
    let ordinal = '';
    if (apocope.checked) {ordinales[0][1] = 'primer'; ordinales[0][3] = 'tercer'}
    if (a.checked==true) {
         space = ''}    
    else {space = ' '};
    var number = eliminarCifras(n,-9);
    var numBil = eliminarCifras(n,-15);
    var numTri = eliminarCifras(n,-21);   

    if (numTri < 2e18 && numTri > 999999999999999999n) if(n < 1e9){trillonesimo = 'trillonesimo '} else {trillonesimo = 'un trillonesimo '};
    if (numTri > 1999999999999999999n) {if(n < 1e18) {trillonesimo = 'trillonesimo '} else {trillonesimo = ' trillonesimo '}};
    if (numTri < 1e18) { miltrillo = ' mil trillonésimo '} else { miltrillo = ' mil '}

    if (numBil < 2e12 && numBil > 999999999999) if(n < 1e9){billonesimo = 'billonesimo '} else {billonesimo = 'un billonesimo '};
    if (numBil > 1999999999999) {if(n < 1e15) {billonesimo = 'billonesimo '} else {billonesimo = ' billonesimo '}};
    if (numBil < 1e12) { milbillo = ' mil billonésimo '} else { milbillo = ' mil '}

    if (number < 2e6 && number > 999999) if(n < 1e9){millon = 'millonésimo '} else {millon = 'un millonésimo '};
    if (number > 1999999) {if(n < 1e9) {millon = 'millonésimo '} else {millon = ' millonésimo '}};
    if (number < 1e6) { millardo = ' mil millonésimo '} else { millardo = ' mil '}

    if (n >= BigInt(1e21)){
        ordinal += numeroEnPalabras(BigNumber(n).div(1e21).integerValue(BigNumber.ROUND_FLOOR).toFixed()) + miltrillo;
        n = new BigNumber(n)
        n = n.mod(1e21).toFixed()
    }
    if (n >= BigInt(1e18)){
        ordinal += numeroEnPalabras(BigNumber(n).div(1e18).integerValue(BigNumber.ROUND_FLOOR).toFixed()) + trillonesimo;
        n = new BigNumber(n)
        n = n.mod(1e18).toPrecision()
    }
    if (n >= 1e15){
        ordinal += numeroEnPalabras(BigNumber(n).div(1e15).integerValue(BigNumber.ROUND_FLOOR).toFixed()) + milbillo;
        n = new BigNumber(n)
        n = n.mod(1e15).toPrecision()
    }
    if (n >= 1e12){
        ordinal += numeroEnPalabras(BigNumber(n).div(1e12).integerValue(BigNumber.ROUND_FLOOR).toFixed()) + billonesimo;
        n = new BigNumber(n)
        n = n.mod(1e12).toPrecision()
    }
    if (n >= 1e9) {
        ordinal += numeroEnPalabras(BigNumber(n).div(1e9).integerValue(BigNumber.ROUND_FLOOR).toFixed()) + millardo;
        n = new BigNumber(n)
        n = n.mod(1e9).toPrecision()
    } 
    if (n >= 1e6) {
        ordinal += numeroEnPalabras([Math.floor(n / 1e6)]) + millon;
        n %= 1e6;
    }  
    if (n >= 1e3) {
        ordinal += numeroEnPalabras([Math.floor(n / 1e3)]) + 'milésimo ';
        n %= 1e3;
    }
    if (n >= 100) {
        ordinal += ordinales[2][Math.floor(n / 100)] + ' ';
        n %= 100;
    }
    if (n >= 10) {
        ordinal += ordinales[1][Math.floor(n / 10)] + space;
        n %= 10;
    }
    if (n > 0) {
        ordinal += ordinales[0][n];
    }

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
}

function alOrdinal(n, g) {
    let ordinal = '';
    const decDiez = ['undécimo','','tredécimo'];
    if (n >= 0) {ordinal += decDiez[n]};
    if (g == 'f') {ordinal = ordinal.slice(0, -1) + "a"};  
    return changeCase(ordinal)
};

function alOrdinal2(n, g) {
    let ordinal = '';
    const decDiez2 = ['sétimo','','','','onceno','duodécimo','decimotercio'];
    if(n == 0) {span[2].title = 'rara vez usado'} else {span[2].title = ''};
    if (n >= 0) {ordinal += decDiez2[n]};
    if (g == 'f') {ordinal = ordinal.split(/o$/).join("a")};  
    return changeCase(ordinal)
};

function genre(ordinal) {
    let words = ordinal.split(" ");
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        const excludedWords = /cuatro|cinco|ocho|ciento$/;
        if (word.endsWith('o') && !excludedWords.test(words[i])) {
            words[i] = word.slice(0, -1) + 'a';
        }
        if (word.endsWith('iún') && !['millón', 'millones'].includes(words[i+1])) {
            words[i] = word.slice(0, -2) + 'una';
        }
        if (word === 'un' && !['millón', 'millones'].includes(words[i+1])) {
            words[i] = 'una';
        }
    }
    return words.join(" ");
};

