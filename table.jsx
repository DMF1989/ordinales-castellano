import React, { useState, useEffect } from 'react';


const initialData = [
  { year: 2022, categories: [
    { category: 'Producción', values: [10] },
    { category: 'Ventas', values: [8] },
    { category: 'Precio', values: [1] },
  ]},
  { year: 2023, categories: [
    { category: 'Producción', values: [12] },
    { category: 'Ventas', values: [10] },
    { category: 'Precio', values: [2] },
  ]},
  { year: 2024, categories: [
    { category: 'Producción', values: [14] },
    { category: 'Ventas', values: [13] },
    { category: 'Precio', values: [4] },
  ]},
];

const setUniqueNames = () => {
  const formElements = Array.from(document.querySelectorAll('input'));

  formElements.forEach((element, index) => {
    const uniqueName = `name_${index}_${Math.random().toString(36).substr(2, 9)}`;
    element.setAttribute('name', uniqueName);
  });
};

function EditableIndex({ value, onChange }) {
  return <input type="text" min='0' value={value} onChange={e => onChange(e.target.value)} />;
}

function EditableCell({ value, onChange }) {
  return <input type="number" min='0' value={value} onChange={e => onChange(e.target.value)} />;
}

function EditableYear({ value, onChange }) {
  return <input type="number" min='0' value={value} onChange={e => onChange(e.target.value)} />;
}

function EditableCategory({ value, onChange }) { return <input type='text' value={value} onChange={e => onChange(e.target.value)} />; }

function App() {
  const [bienNames, setBienNames] = useState([]);
  const [data, setData] = useState(initialData);
  const [sum, setSum] = useState([]);
  const [growth, setGrowth] = useState([]);

  useEffect(() => {
    setUniqueNames();
  }, [data]);

  const handleEdit = (yearIndex, rowIndex, colIndex, newValue) => {
    const newData = [...data];
    newData[yearIndex].categories[rowIndex].values[colIndex] = Number(newValue);
    setData(newData);
  };

  const handleEditYear = (yearIndex, newValue) => {
    const newData = [...data];
    newData[yearIndex].year = Number(newValue);
    setData(newData);
  };

  const handleEditCategory = (yearIndex, rowIndex, newValue) => { const newData = [...data]; newData[yearIndex].categories[rowIndex].category = newValue; setData(newData); };

  const handleAddColumn = () => {
    const newData = data.map(year => ({ ...year, categories: year.categories.map(row => ({ ...row, values: [...row.values, ''] })) }));
    setData(newData);
  };

  const handleEditBien = (index, newValue) => {
    // Copiamos el estado actual
    const newBienNames = [...bienNames];
    // Cambiamos el nombre del bien en el índice dado
    newBienNames[index] = newValue;
    // Actualizamos el estado con el nuevo array
    setBienNames(newBienNames);
  };

  const handleRemoveColumn = () => {
    if (data[0].categories[0].values.length > 1) {
      const newData = data.map(year => {
        const newCategories = year.categories.map(row => {
          const newValues = [...row.values];
          newValues.pop();
          return { ...row, values: newValues };
        });
        return { ...year, categories: newCategories };
      });
      setData(newData);
    }
  };

  const handleAddYear = () => {
    const newYear = data[data.length - 1].year + 1;
  const newCategories = data[data.length-1].categories.map(category => ({
    category: category.category,
    values: category.values.map(() => '')
  }));
  const newData = [...data, { year: newYear, categories: newCategories }];
    setData(newData);
  };

  const handleRemoveYear = () => {
    if (data.length > 1) {
      const newData = [...data];
      newData.pop();
      setData(newData);
    }
  };

  const calculateSumAndGrowth = () => {
    let elements = document.getElementsByTagName("h3");
for(let i = 0; i < elements.length; i++){
    elements[i].style.display = "block";
}
    const baseYear = data[0];
    const basePriceRow = baseYear.categories.find(row => row.category === 'Precio');
  
const newSums = data.map(year => {
  const productionRow = year.categories.find(row => row.category === 'Producción');
  const priceRow = year.categories.find(row => row.category === 'Precio');
  const nominalYearSum = productionRow && priceRow && basePriceRow ? productionRow.values.reduce((acc, value, index) => acc + value * priceRow.values[index], 0) : 0;
  const realYearSum = productionRow && priceRow && basePriceRow ? productionRow.values.reduce((acc, value, index) => acc + value * basePriceRow.values[index], 0) : 0;
  return { ...year, nominalSum: nominalYearSum, realSum: realYearSum };
});

  
    const deflactors = [100];
    const newGrowth = newSums.map((yearSum, index) => {
      if (index === 0) {
        return { year: yearSum.year, nominalGrowth: null, realGrowth: null, inflation: null, deflactor: null, deflactorChange: null};
      } else {
        const previousYearSum = newSums[index - 1] || { deflactor: 100 };
        const nominalGrowth = ((yearSum.nominalSum - previousYearSum.nominalSum) / previousYearSum.nominalSum).toFixed(4)*100;
        const realGrowth = ((yearSum.realSum - previousYearSum.realSum) / previousYearSum.realSum).toFixed(4)*100;
        const inflation = nominalGrowth - realGrowth;
        const deflactor = ((yearSum.nominalSum / yearSum.realSum)*100).toFixed(2);
        deflactors.push(deflactor);
        const deflactorChange = index > 0 ? ((deflactor - deflactors[index - 1]) / deflactors[index - 1]).toFixed(4)*100 : null;
        return { year: yearSum.year, nominalGrowth: nominalGrowth, realGrowth: realGrowth, inflation: inflation, deflactor: deflactor, deflactorChange: deflactorChange };
      }
    });
    setSum(newSums);
    setGrowth(newGrowth);
  }
  
  return (
    <div>
        <table>
          <thead>
            <tr>
              <th>Año</th>
              <th>Categoría</th>
              {data[0].categories[0].values.map((_, index) => (<th className='bien' key={index}>
              <EditableIndex
                  value={bienNames[index] || `Bien ${index + 1}`} // Si no hay un nombre definido, usamos el valor por defecto
                  onChange={(newValue) => handleEditBien(index, newValue)} // Pasamos la función que cambia el nombre
                />
            </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((year, yearIndex) => (
              <React.Fragment key={yearIndex}>
                {year.categories.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {rowIndex === 0 && <td className='year' rowSpan={year.categories.length}><EditableYear value={year.year} onChange={newValue => handleEditYear(yearIndex, newValue)} /></td>}
                    <td className='category'><EditableCategory value={row.category} onChange={newValue => handleEditCategory(yearIndex, rowIndex, newValue)} /></td>
                    {row.values.map((value, colIndex) => (
                      <td key={colIndex}>
                        <EditableCell value={value} onChange={newValue => handleEdit(yearIndex, rowIndex, colIndex, newValue)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      <div>
        <button onClick={handleAddColumn}>+</button>
        <button onClick={handleRemoveColumn}>-</button>
      </div>
      <div>
        <button onClick={handleAddYear}>+ Año</button>
        <button onClick={handleRemoveYear}>- Año</button>
      </div>
      <div>
      <button onClick={calculateSumAndGrowth}>Calcular</button>
<span>
<h3>PIB Nominal</h3>
{sum.map((yearSum, index) => (
  <p key={index}>PIB {yearSum.year}: {yearSum.nominalSum}</p>
))}
{growth.map((yearGrowth, index) => (
  yearGrowth.nominalGrowth !== null && <p key={index}>Δ{yearGrowth.year}: {yearGrowth.nominalGrowth} %</p>
))}
<h3>PIB Real</h3>
{sum.map((yearSum, index) => (
  <p key={index} style={{gridColumn: "2"}}>PIB {yearSum.year}: {yearSum.realSum}</p>
))}
{growth.map((yearGrowth, index) => (
  yearGrowth.realGrowth !== null && <p key={index}>Δ{yearGrowth.year}: {yearGrowth.realGrowth} %</p>
))}
<h3 title = "ΔPIB(N) – ΔPIB(R)">Inflación</h3>
{growth.map((yearGrowth, index) => (
 yearGrowth.inflation !== null && <p key={index}>Δ{yearGrowth.year}: {yearGrowth.inflation} %</p>
))}
<h3 title = "ΔPIB(N) / ΔPIB(R)">Deflactor</h3>
{growth.map((yearGrowth, index) => (
 yearGrowth.deflactor !== null && <p key={index}>Δ{yearGrowth.year}: {yearGrowth.deflactor} %</p>
))}
<h3 title = "DEFn - DEFn-1">Inflación (deflactor)</h3>
{growth.map((yearGrowth, index) => (
 yearGrowth.deflactorChange !== null && <p key={index}>Δ{yearGrowth.year}: {yearGrowth.deflactorChange} %</p>
))}
</span>
      </div>
    </div>
  );
}

export default App;
