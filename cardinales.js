const unidcard = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const decenas = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const centenas = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];
const onceDiecinueve = ['once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
const veintiNueve = ['','veintiún', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve']
for (let i = 0; i < 11; i++) {onceDiecinueve.unshift('0')};

function numeroEnPalabras(numero) {
    otro = ' '
    if (a.checked==true && numero > 30 && numero < 100) {
       unispa = '';
    } else {
        unispa = ' ';
    };
    if (numero === 0) return "cero";
    if (numero > 99) unidcard[1] = 'un';
    if (numero == 1) unidcard[1] = '';
    if (numero == 100) centenas[1] = 'cien';
    else centenas[1] = 'ciento';
    let resultado = "";
    if (numero > 999) return '';
    let c = Math.floor(numero / 100);
    let d = Math.floor((numero - c * 100) / 10);
    let u = numero - c * 100 - d * 10;
    if (numero > 99) {decspa = ' '} 
    else { decspa = ''; unidcard[u].trimStart('')};
    if (c > 0) resultado += centenas[c];
    if (d === 1 && u > 0) {
        resultado += decspa + onceDiecinueve[numero - c * 100] + decspa;
        u = 0;
    } else if (d === 2 && u > 0) {
        resultado += decspa + veintiNueve[u] + decspa;
        u = 0;
    } else if (d > 2 && u > 0 & a.checked==true && numero > 30) {
        resultado += decspa + decenas[d] + 'i';
        unidcard.splice(1,3,'ún','dós','trés');
        unidcard[6] = 'séis';
        otro = ''
    } else if (d > 2 && u > 0 & a.checked==false && numero > 30) {
        resultado += decspa + decenas[d] + ' y';
        unidcard.splice(1,3,'un','dos','tres');
        unidcard[6] = 'seis'
    } else if (d > 0) {
        resultado += decspa + decenas[d] + decspa;
        if (u > 0 && d > 2) resultado += y;
    }

    if (numero < 10) {unispa = ''};

    if (u > 0) resultado += otro + unidcard[u] + unispa;
    if (numero > 30) {return resultado};
    return resultado;
}

function cardinales(num) {
    let result = '';
    var m = eliminarCifras(num,-9);
    var b = eliminarCifras(num,-15);
    var t = BigNumber(eliminarCifras(num,-21));


    if (t < 1e6) {miltril = ' mil trillones '} else {miltril = ' mil '};
    if (t < 2e18 && t > (999999999999999999n)) {trillon = 'un trillón '};
    if (t > 1999999999999999999n) {trillon = ' trillones '};

    if (b < 1e6) {billardo = ' mil billones '} else { billardo = ' mil '};
    if (b < 2e12 && b > 999999999999) {billon = 'un billón '};
    if (b > 1999999999999) {billon = ' billones '};
  
    if (m < 1e6) {millardo = ' mil millones '} else { millardo = ' mil '};
    if (m < 2e6 && m > 999999) {millon = 'un millón '};
    if (m > 1999999) {millon = ' millones '};

    if (num >= BigInt(1e21)){
        result += numeroEnPalabras(eliminarUltimas(num, 21)) + miltril;
        num = new BigNumber(num)
        num = num.mod(1e21).toFixed()
    }
    if (num >= BigInt(1e18)){
        result += numeroEnPalabras(eliminarUltimas(num, 18)) + trillon;
        num = new BigNumber(num)
        num = num.mod(1e18).toFixed()
    }
    if (num >= 1e15){
        result += numeroEnPalabras(eliminarUltimas(num, 15)) + billardo;
        num = new BigNumber(num)
        num = num.mod(1e15).toFixed()
    }
    if (num >= 1e12){
        result += numeroEnPalabras(eliminarUltimas(num, 12)) + billon;
        num %= 1e12
    }
    if (num >= 1e9) {
        result += numeroEnPalabras(eliminarUltimas(num, 9)) + millardo;
        num %= 1e9
    }
    if (num >= 1e6) {
        result += numeroEnPalabras(eliminarUltimas(num, 6)) + millon;
        num %= 1e6
    }
    if (num >= 1e3) {
        result += numeroEnPalabras(eliminarUltimas(num, 3)) + ' mil ';
        num %= 1e3;
    }
    if (num > 0) {
        result += numeroEnPalabras(num);
    }
    if (num == 1 ) {result += 'uno'};
    result = result.trim();

    if (apocope.checked==false) {result = result.replace(/(un|ún)$/, 'uno')}
    else {result = result.replace(/uno$/, 'un'); chk.checked=false; g = 'm'};

    if (g == 'f') {result = result.replace('uno','una')} 
    else {result = result.replace('una','uno')}
    return changeCase(result)
}

function eliminarUltimas(numero, potencia) {
    var numero = new BigNumber(numero)
    var divisor = new BigNumber(10).pow(potencia);
    if (numero.isGreaterThanOrEqualTo(divisor)) {
        numero = numero.div(divisor).integerValue(BigNumber.ROUND_FLOOR).toFixed();
        return numero;
    } else {
        return numero;
    }
}

function eliminarCifras(numero,des) {
    if (numero > 1000) {
        numero = numero.toString();
        numero = numero.slice(des);
        return numero;
    } else {
        return numero;
    }
}

