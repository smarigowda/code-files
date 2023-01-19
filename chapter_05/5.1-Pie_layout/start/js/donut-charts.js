const drawDonutCharts = (data) => {
  // Generate the donut charts here

  const svg = d3
    .select("#donut")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const donutContainers = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const years = [1975, 1995, 2013];
  const musicFormats = data.columns.filter(format => format !== 'year')

  years.forEach((year) => {
    const yearData = data.find(d => d.year === year)
    console.log(yearData)
    const formattedData = []
    musicFormats.forEach( format => {
      formattedData.push({ format, sales:  yearData[format]})
    })
    console.log(formattedData)
    donutContainers
      .append("g")
      .attr("transform", `translate(${xScale(year)}, ${innerHeight / 2})`);
  });


};
