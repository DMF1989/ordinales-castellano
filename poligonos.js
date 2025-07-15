let completeName = ''
function polygons(n) {
  let poligono = "";
  let unoVeintinueveLad = ["","mono","deca","en o un","do","tri","tetra","penta o pente","hexa",
    "hepta","octo u octa","enea o nona","iso o icosa","hena","dia","tria"];
  unoVeintinueveLad = unoVeintinueveLad.map(word => {
    let parts = word.split(" ");
    return parts.map(part => ["o", "u","","mono",'deca','icosa',"hena","dia","tria"].includes(part.trim()) ? part : part + 'deca').join(" ");
  });
  unoVeintinueveLad = unoVeintinueveLad.map(word => {
    let parts = word.split(" ");
    return parts.map(part => ["o", "u"].includes(part.trim()) ? part : part + '́gono').join(" ");
  });
  let valuesToAdd = ['tetra','penta','hexa','hepta','octa','enea'];
  let decenasLad = valuesToAdd;
  valuesToAdd = valuesToAdd.map(value => value + '́gono');
  unoVeintinueveLad.splice(24,0, ...valuesToAdd);
  valuesToAdd.unshift('dígono','trígono')
  let unidadesLados = valuesToAdd.map(value => 'kai' + value)
  unidadesLados.unshift('́gono','kaihenágono')

  valuesToAdd[1] += ' o triángulo'
  valuesToAdd[2] += ', cuadrángulo o cuadrilátero';
  unoVeintinueveLad.splice(2,0, ...valuesToAdd);
  decenasLad.unshift('tria');
  decenasLad = decenasLad.map(value => value + 'conta');
  decenasLad.push('hecta');
  let valueToAdd = '';
  decenasLad = Array(3).fill(valueToAdd).concat(decenasLad);
  let unidades = n.match(/\d{1}$/g);
  let unidCentecimas = n.match(/\d{2}$/g);
  let centUnidad;
  let milUnidad;
  let miriaUnidad;
  let decemiriaUnidad;
  let hectamiriaUnidad;
  if(n > 99){centUnidad = (n.match(/\d{3}$/g)[0]).match(/^\d{1}/g)};
  if(n > 999){milUnidad = (n.match(/\d{4}$/g)[0]).match(/^\d{1}/g)};
  if(n > 9999){miriaUnidad = (n.match(/\d{5}$/g)[0]).match(/^\d{1}/g)};
  if(n > 99999){decemiriaUnidad = (n.match(/\d{6}$/g)[0]).match(/^\d{1}/g)};
  if(n > 999999){hectamiriaUnidad = (n.match(/\d{7}$/g)[0]).match(/^\d{1}/g)};
  let decenas = Math.floor(unidCentecimas / 10);
  let defaultNames = ['','di','tri','tetra','penta','hexa','hepta','octa','enea'];
  let centesimas = defaultNames.map(value => value + 'hecta');
  centesimas.unshift('');
  
  let chiliaNames = 'chilia';  
  if ((/\b\d{4,}\b/).test(n)) {
    if (n.match(/^\d{1}/g) > 1) {chiliaNames = 'schilia'};
    if (n.match(/^\d{1}/g) > 3) {chiliaNames = 'kischilia'};
  };
  let chilia = defaultNames.map(value => value + chiliaNames);
  chilia.unshift('');

  let miria = defaultNames.map(value => 
    n.match(/^\d{1}/g) > 3 ? value + 'kismiria' : 
    n.match(/^\d{1}/g) > 1 ? value + 'smiria' : 
    value + 'miria'
  );
  miria.unshift('');

  let decemiria = defaultNames.map(value => value + 'decemiria');
  decemiria.unshift('');

  let hectamiria = defaultNames.map(value => value + 'hectamiria');
  hectamiria.unshift('');

  if (n > 0) {poligono = unoVeintinueveLad[n]};
  if (n == 13) {poligono += ' o triskaidecágono'};
  if (unidCentecimas > 20 && unidCentecimas < 30 && unidades != 0) {poligono = "icosi" + unoVeintinueveLad[unidCentecimas] + ' o icosa' + unidadesLados[unidades]};
  if (unidCentecimas > 29) {poligono = decenasLad[decenas] + unidadesLados[unidades]};
  let centesima = '';
  let suf = '';
  if ((/\b\d{3,}\b/).test(n)) {
  if (unidCentecimas < 10) {suf = unidadesLados[unidades]};
  if (unidCentecimas > 9) {suf = 'kai' + unoVeintinueveLad[unidCentecimas]};
  if (unidCentecimas > 19) {suf = 'icosa' + unidadesLados[unidades]};
  if (unidCentecimas > 29) {suf = decenasLad[decenas] + unidadesLados[unidades]};
  centesima = centesimas[centUnidad];
  poligono = centesima
  };
  if ((/\b\d{4,}\b/).test(n)) {
    poligono = chilia[milUnidad];
    if (n > 1099) {poligono = chilia[milUnidad] + centesima};
    };
  if ((/\b\d{5,}\b/).test(n)) {
    poligono = miria[miriaUnidad]
    if (n > 10099) {poligono = miria[miriaUnidad] + centesima};
    if (n > 10999) {poligono = miria[miriaUnidad] + chilia[milUnidad] + centesima};
    };
  let decenasLadKismiria = decenasLad;
  decenasLadKismiria.splice(1,2,'deca','icosa');
  decenasLadKismiria = decenasLadKismiria.map(value => value + 'kismiria');
  if ((/\b\d{6,}\b/).test(n)) {
    poligono = decenasLadKismiria[decemiriaUnidad];
      if (n > 100099) {poligono = decenasLadKismiria[decemiriaUnidad] + centesima};
      if (n > 100999) {poligono = decenasLadKismiria[decemiriaUnidad] + chilia[milUnidad] + centesima};
      if (n > 109999) {poligono = decenasLadKismiria[decemiriaUnidad] + miria[miriaUnidad] + chilia[milUnidad] + centesima};
  };
  if ((/\b\d{7,}\b/).test(n)) {
    poligono = hectamiria[hectamiriaUnidad]
      if (n > 1000099) {poligono = hectamiria[hectamiriaUnidad] + centesima};
      if (n > 1000999) {poligono = hectamiria[hectamiriaUnidad] + chilia[milUnidad] + centesima};
      if (n > 1009999) {poligono = hectamiria[hectamiriaUnidad] + miria[miriaUnidad] + chilia[milUnidad] + centesima};
      if (n > 1099999) {poligono = hectamiria[hectamiriaUnidad] + decemiria[decemiriaUnidad] + miria[miriaUnidad] + chilia[milUnidad] + centesima};
  };
  let polTitle = document.querySelector("div:nth-of-type(4)");
  if (n > 9999999) {polTitle.style.display = "none"};
  completeName = poligono + suf;

    if (/^80*$/.test(n)) {completeName += ' u ' + completeName.replace(poligono.substring(3,4),'o')};
    if (/^90*$/.test(n)) {completeName += ' o ' + completeName.replace(poligono.substring(0,3),'non')};

  function alternate (number, original, alternate) {
  if (n == number) {completeName += ' o ' + completeName.replace(original, alternate)};
};
  alternate(30,'tria','tri');
  alternate(40,'tetra','tessara');
  alternate(50,'a','e');
  alternate(60,'a','e');
  alternate(70,'hepta','hebdome');
  alternate(100,'hecta','hecatonta');
  alternate(1e3,'chilia','kilia');
  alternate(1e6,'hectamiria','mega');
  if (n > 99 && n < 200){
  if ((n.match(/\d{1}$/g)[0]) == 0) {completeName += ' o ' + unoVeintinueveLad[Math.floor(n/10)].replace('cá','cacontá')}
};

  return changeCase(completeName)
}


/* Rojo: #FF0000
Azul: #0000FF
Verde: #008000
Amarillo: #FFFF00
Naranja: #FFA500
Morado: #800080
Rosa: #FFC0CB
Negro: #000000
Blanco: #FFFFFF
Gris: #808080 */

/* document.getElementById('enter').addEventListener('input', function (evt) {
  const input = evt.target;
  const cursorPos = input.selectionStart;

  // Texto a la izquierda del cursor
  const leftText = input.value.substring(0, cursorPos);

  // Texto a la derecha del cursor
  const rightText = input.value.substring(cursorPos);

  console.log("Izquierda del cursor: ", leftText);
  console.log("Derecha del cursor: ", rightText);
});

document.getElementById('miCampo').addEventListener('keypress', function (evt) {
  const input = evt.target;
  const cursorPos = input.selectionStart;

  // Obtener el texto a la izquierda del cursor
  const leftText = input.value.substring(0, cursorPos);

  // Verificar si la tecla presionada es el signo menos y si hay una "e" a la izquierda del cursor
  if (evt.key === '-' && leftText.endsWith('e')) {
      evt.preventDefault();
  }
}); */