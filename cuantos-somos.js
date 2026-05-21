// Total de personas censadas
  const totalCensados = 43835324;

  // Datos porcentuales (columna LLENAR)
  //Cambia los datos de acuerdo al Censo del Dane
  const datosLlenar = [
    51.2,
    48.8,
    30.7,
    63.0,
    6.3,
    22.6,
    68.2,
    9.1
  ];

  // Etiquetas correspondientes
  //Cambia las estiquetas de las graficas de acuerdo a las variables evaluadas del censo
  const etiquetas = [
    "Hombre",
    "Mujer",
    "Hombres 0-14",
    "Hombres 15-65",
    "Hombres >=65",
    "Mujeres 0-14",
    "Mujeres 15-65",
    "Mujeres >=65"
  ];

  // Llenar el total de personas censadas
  document.getElementById('totalCensados').textContent = totalCensados.toLocaleString('es-CO');

  // Seleccionar celdas por clase
  const celdasLlenar = document.querySelectorAll('.llenar');
  const celdasFrecuencia = document.querySelectorAll('.frecuencia');
  const celdasPorcentual = document.querySelectorAll('.porcentual');

  // Array para los datos de la gráfica
  const datosPorcentualesGraficar = [];

  // Llenar las celdas de la tabla
  // porcentaje es el valor actual (ej. 51.2)  
  // index es la posición del elemento (ej. , , ..., )
  datosLlenar.forEach((porcentaje, index) => {
    // Columna LLENAR (el porcentaje tal cual)
    celdasLlenar[index].textContent = `${porcentaje}%`;

    // Calcular frecuencia absoluta
    const frecuencia = Math.round((porcentaje / 100) * totalCensados);
    celdasFrecuencia[index].textContent = frecuencia.toLocaleString('es-CO');

    // Frecuencia porcentual redondeada
    const porcentajeRedondeado = porcentaje.toFixed(2);
    celdasPorcentual[index].textContent = `${porcentajeRedondeado}%`;

    // Agregar al array para graficar
    datosPorcentualesGraficar.push(parseFloat(porcentajeRedondeado));
  });

  // Crear gráfica con Chart.js https://www.chartjs.org/
  const ctx = document.getElementById('graficaPorcentual').getContext('2d');
  new Chart(ctx, {
    type: 'bar', //bar, line, polarArea, radar, doughnut, pie
    data: {
      labels: etiquetas,
      datasets: [{
        label: 'Frecuencia Porcentual (%)',
        data: datosPorcentualesGraficar,
        backgroundColor: 'rgba(161, 12, 12, 0.6)',
        borderColor: 'rgb(160, 12, 12)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => value + '%' // Formato de los valores en el eje Y
          }
        }
      }, plugins: {
      title: {
        display: true,
        text: 'Cuantos somos',
        //font: {
        //  size: 18
        //},
        //padding: {
         // top: 10,
         // bottom: 30
        //}
      }
    }
  }
});
