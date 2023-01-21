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

  const stackGenerator = d3
    .stack()
    .keys(formatsInfo.map((f) => f.id))
    .order(d3.stackOrderDescending)
    // .order(d3.stackOrderAscending)
    .offset(d3.stackOffsetExpand);

  const annnotatedData = stackGenerator(data);
  console.log(annnotatedData);

  // this works only for the default stacking order (order none)
  // same order as in the array, so the last series, d[1] can be used to find the max domain value
  // const maxUpperBoundary = d3.max(
  //   annnotatedData[annnotatedData.length - 1],
  //   (d) => d[1]
  // );

  const minLowerBoundaries = [];
  const maxUpperBoundaries = [];

  annnotatedData.forEach((series) => {
    minLowerBoundaries.push(d3.min(series, (d) => d[0]));
    maxUpperBoundaries.push(d3.max(series, (d) => d[1]));
  });
  console.log(minLowerBoundaries);
  console.log(maxUpperBoundaries);

  const minDomain = d3.min(minLowerBoundaries);
  const maxDomain = d3.max(maxUpperBoundaries);

  const yScale = d3
    .scaleLinear()
    .domain([minDomain, maxDomain])
    .range([innerHeight, 0])
    // .nice();

  annnotatedData.forEach((series) => {
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

  const bottomAxis = d3
    .axisBottom(xScale)
    .tickValues(d3.range(1975, 2020, 5))
    .tickSizeOuter(0);

  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  const leftAxis = d3.axisLeft(yScale)

  innerChart.append("g").call(leftAxis);
};
