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
  const musicFormats = data.columns.filter((format) => format !== "year");

  years.forEach((year) => {
    const yearData = data.find((d) => d.year === year);
    // console.log(yearData)
    const formattedData = [];
    musicFormats.forEach((format) => {
      formattedData.push({ format, sales: yearData[format] });
    });
    // console.log(formattedData)
    const donutContainer = donutContainers
      .append("g")
      .attr("transform", `translate(${xScale(year)}, ${innerHeight / 2})`);

    const pieGenerator = d3.pie().value((d) => d.sales);
    const annotatedDate = pieGenerator(formattedData);
    console.log(annotatedDate);

    const arcGenerator = d3
      .arc()
      .startAngle((d) => d.startAngle)
      .endAngle((d) => d.endAngle)
      .innerRadius(60)
      .outerRadius(100)
      .padAngle(0.02)
      .cornerRadius(3);

    const arcs = donutContainer
      .selectAll(`path.arc-${year}`)
      .data(annotatedDate)
      .join("g");

    arcs
      .append("path")
      .attr("class", `arc-${year}`)
      .attr("d", arcGenerator)
      .attr("fill", (d) => colorScale(d.data.format));

    arcs
      .append("text")
      .text((d) => {
        d["percentage"] = (d.endAngle - d.startAngle) / (2 * Math.PI);
        return d3.format(".0%")(d.percentage);
      })
      .attr("x", (d) => {
        d["centroid"] = arcGenerator
          .startAngle(d.startAngle)
          .endAngle(d.endAngle)
          .centroid();
        return d.centroid[0];
      })
      .attr("y", (d) => d.centroid[1])
      .attr("text-anchor", 'middle')
      .attr("alignment-baseline", "middle")
      .attr('fill', "#f6fafc")
      .style("font-size", "16px")
      .style("font-weight", 500)
      .attr("fill-opacity", d => d.percentage <= 0.05 ? 0 : 1)

  });
};
