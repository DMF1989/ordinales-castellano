
var ordinalLatinWord = [
    ['','primus','secundus','tertius','quartus','quintus','sextus','septimus','octavus','nonus','decimus'],
    ['','undecimus','duodecimus','tertius decimus','quartus decimus','quintus decimus','sextus decimus','septimus decimus','duodētrīcēsimus','ūndētrīcēsimus'],
    ['','vicesimus','vīcēsimus prīmus','vīcēsimus secundus','vīcēsimus tertius','vīcēsimus quārtus','vīcēsimus quīntus','vīcēsimus sextus','vīcēsimus septimus','vīcēsimus octāvus ','vīcēsimus nōnus']
    ['','','vicesimus','tricesimus','quadragesimus','quinquagesimus','sexagesimus','septuagesimus','octogesimus', 'nonagesimus'],
    ['','centesimus','ducentesimus','trecentesimus','quadringentesimus','quingentesimus','sescentesimus','septingentesimus','octingentesimus','nongentesimus']
];

 muladvLatin = [
    ["semel", "bis", "ter", "quater", "quinquies", "sexies", "septies", "octies", "novies", "decies"],
    ["decies","vicenties","triginta","quadraginta","quinquaginta","sexaginta","septuaginta","octoginta","nonaginta"],
    ["centes","ducentes","trecentus","quadringenti","quingenti","sescenti","septingenti","octingenti","nongenti"]
]

function latinTitle(n){
    let latin = '';
    if (n < 11){
        latin = ordinalLatinWord[0][n]
    } else if (n < 20) {
        latin = ordinalLatinWord[1][Math.floor(n - 10)];
    } else if (n > 19) {
        if (n % 10 === 0) {
        latin = ordinalLatinWord[2][n / 10]
        latin = ordinalLatinWord[3][n / 100]      
        }
    }
    span[0].title = latin
}



