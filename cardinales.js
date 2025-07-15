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
    if (numero == 0) return "cero";
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
    else { decspa = ''; unidcard[u]/* .trimStart('') */};
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
    let m = eliminarCifras(num,-9);
    let b = eliminarCifras(num,-15);
    let t = eliminarCifras(num,-21);
    let cu = eliminarCifras(num,-27);
    let q = eliminarCifras(num,-33);

    if (q < 1e30) {milquint = ' mil quintillones '} else {milquint = ' mil '};
    if (q < BigInt(scientificToString(2e30)) && q > 999999999999999999999999999999n) {quintillon = 'un quintillón '};
    if (q > 1999999999999999999999999999999n) {quintillon = ' quintillones '};

    if (cu < 1e24) {milcuatril = ' mil cuatrillones '} else {milcuatril = ' mil '};
    if (cu < BigInt(scientificToString(2e24)) && cu > 999999999999999999999999n) {cuatrillon = 'un cuatrillón '};
    if (num >= BigInt(1e30)) {cuatrillon = 'cuatrillón '};
    if (cu > 1999999999999999999999999n) {cuatrillon = ' cuatrillones '};

    if (t < 1e18) {miltril = ' mil trillones '} else {miltril = ' mil '};
    if (t < BigInt(2e18) && t > 999999999999999999n) {trillon = 'un trillón '};
    if (num >= BigInt(1e24)) {trillon = 'trillón '};
    if (t > 1999999999999999999n) {trillon = ' trillones '};

    if (b < 1e12) {billardo = ' mil billones '} else { billardo = ' mil '};
    if (b < 2e12 && b > 999999999999) {billon = 'un billón '};
    if (num >= BigInt(1e18)) {billon = 'billón '}
    if (b > 1999999999999) {billon = ' billones '};
  
    if (m < 1e6) {millardo = ' mil millones '} else { millardo = ' mil '};
    if (m < 2e6 && m > 999999) {millon = 'un millón '};
    if (num >= BigInt(1e12)) {millon = 'millón '}
    if (m > 1999999) {millon = ' millones '};

    if (num >= 1000000000000000000000000000000000n){
        result += numeroEnPalabras(eliminarUltimas(num, 33)) + milquint
        num = BigInt(num) % (10n**33n)
    };
    if (num >= 1000000000000000000000000000000n){
        result += numeroEnPalabras(eliminarUltimas(num, 30)) + quintillon;
        num = BigInt(num) % (10n**30n)
    };
    if (num >= 1000000000000000000000000000n){
        result += numeroEnPalabras(eliminarUltimas(num, 27)) + milcuatril;
        num = BigInt(num) % (10n**27n)
    };
    if (num >= 1000000000000000000000000n){
        result += numeroEnPalabras(eliminarUltimas(num, 24)) + cuatrillon;
        num = BigInt(num) % (10n**24n)
    };
    if (num >= BigInt(1e21)){
        result += numeroEnPalabras(eliminarUltimas(num, 21)) + miltril;
        num = BigInt(num) % (10n**21n)
    };
    if (num >= BigInt(1e18)){
        result += numeroEnPalabras(eliminarUltimas(num, 18)) + trillon;
        num = BigInt(num) % (10n**18n)
    };
    if (num >= 1e15){
        result += numeroEnPalabras(eliminarUltimas(num, 15)) + billardo;
        num = BigInt(num) % (10n**15n)
    };
    if (num >= 1e12){
        result += numeroEnPalabras(eliminarUltimas(num, 12)) + billon;
        num = num.toString()
        num %= 1e12
    };
    if (num >= 1e9) {
        result += numeroEnPalabras(eliminarUltimas(num, 9)) + millardo;
        num = num.toString()
        num %= 1e9
    };
    if (num >= 1e6) {
        result += numeroEnPalabras(eliminarUltimas(num, 6)) + millon;
        num = num.toString()
        num %= 1e6
    };
    if (num >= 1e3) {
        result += numeroEnPalabras(eliminarUltimas(num, 3)) + ' mil ';
        num = num.toString()
        num %= 1e3;
    };
    if (num > 0) {
        num = num.toString()
        result += numeroEnPalabras(num);
    };
    if (num == 1 ) {result += 'uno'};
    result = result.trim();

    if (apocope.checked==false) {result = result.replace(/(un|ún)$/, 'uno')}
    else {result = result.replace(/uno$/, 'un'); chk.checked=false; g = 'm'};

    if (g === 'f') {
        result = result.replace(/uno|tos/g, function(match) {
          return match === 'uno' ? 'una' : 'tas';
        });
      };
    return result
}
exampleone = '31 415 926 535 897 932 384 626 433 832 795';
exampletwo = '100 000 000 000 000 000 000 000'
examplethree = '1 000 000 000 000 000 000 000 000 000 000'
examplefour = '1 000 001 000 001 000 001 000 001 000 000'
examplefith = '998 999 999 999 999 999'
examplesix = '1 999 999 999 999 999 999 999 999 999 999'
exampleseven = '1 000 000 000 000 000 000 000 000 000'
exampleeight = '1 000 000 000 000 000 000 000 000 000 000 000'
/* console.log(BigInt(scientificToString(eval('7.4*10**26')))) */

    function eliminarUltimas(numero, potencia) {
        var divisor = Math.pow(10, potencia);
        if (numero >= divisor) {
        numero = BigInt(scientificToString(numero))/BigInt(scientificToString(divisor))
        return numero.toString();
        } else {
        return numero.toString();
        }
    };

    function eliminarCifras(numero,des) {
        if (numero > 1000) {
        numero = numero.toString();
        numero = numero.slice(des);
        return numero;
        } else {
        return numero;
        }
    };

    function scientificToString(num) {
        return num.toLocaleString('fullwide', { useGrouping: false });
    }

    function fixNumber(num) {
        decNum = num.match(/\.\d+/g);
        if (/\+|-\d+(\.)?$/g.test(num)) {decNum[1] = '.0'}
        let n;
        if (decNum[0].length >= decNum[1].length) {n = decNum[0].length} else {n = decNum[1].length}
        return eval(num).toFixed(--n)
    }
    
    function zeroPoint(num) {
        let mantissa = num.match(/^\d+(\.\d+)?/g)[0];
        let exponent = num.match(/\-\d+$/g)[0];
        if (exponent < -20) {
            alert('¡Número invalido!\nNo se admiten números menores a menos veinte'); 
            exponent = exponent.slice(0, -1); enter.value = enter.value.slice(0, -1)
        };
        decNum = num.match(/\.\d+/g)[0].length-1
        let toFixedNumber = decNum + Math.abs(exponent)
        let x = new Big(mantissa);
        let y = new Big('10').pow(Number(exponent));
        let z = x.times(y)
        return z.toFixed(toFixedNumber)
    } 

