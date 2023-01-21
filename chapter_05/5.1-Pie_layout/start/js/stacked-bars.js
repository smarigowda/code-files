const drawStackedBars = (data) => {
  // Generate the stacked bar chart here

  /*******************************/
  /*    Append the containers    */
  /*******************************/

  const svg = d3
    .select("#bars")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const stackGenerator = d3.stack().keys(formatsInfo.map((f) => f.id));
  const annnotatedData = stackGenerator(data);
  console.log(annnotatedData);

  const maxUpperBoundary = d3.max(
    annnotatedData[annnotatedData.length - 1],
    (d) => d[1]
  );
  console.log(maxUpperBoundary);

  const yScale = d3
    .scaleLinear()
    .domain([0, maxUpperBoundary])
    .range([innerHeight, 0])
    .nice();

  annnotatedData.forEach((series) => {
    console.log(series);
    innerChart
      .selectAll(`.bar-${series.key}`)
      .data(series)
      .join("rect")
      .attr("class", `.bar-${series.key}`)
      .attr("x", (d) => xScale(d.data.year))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
      .attr("fill", colorScale(series.key));
  });
};
