// Load the data here
d3.csv("./data/daily_precipitations.csv").then((data) => {
  console.log(data);
  drawArc(data);
});

// Draw the arc here
const drawArc = (data) => {
  const pieChartWidth = 300;
  const pieChartHeight = 300;
  const svg = d3
    .select("#arc")
    .append("svg")
    .attr("viewBox", [0, 0, pieChartWidth, pieChartHeight]);

  const innerChart = svg
    .append("g")
    .attr(
      "transform",
      `translate(${pieChartWidth / 2}, ${pieChartHeight / 2})`
    );

  const numberOfDays = data.length;
  const numberOfDaysWithPrecipitations = data.filter(
    (d) => d.total_precip_in > 0
  ).length;
  const percentageDaysWithPrecipitations = Math.round(
    (numberOfDaysWithPrecipitations / numberOfDays) * 100
  );
  console.log(percentageDaysWithPrecipitations);
  const angleDaysWithPrecipitations_deg =
    (percentageDaysWithPrecipitations * 360) / 100;

  const angleDaysWithPrecipitations_rad =
    (angleDaysWithPrecipitations_deg * Math.PI) / 180;

  console.log(angleDaysWithPrecipitations_rad);

  const arcGenerator = d3
    .arc()
    .innerRadius(80)
    .outerRadius(120)
    .padAngle(0.02)
    .cornerRadius(6);

  innerChart
    .append("path")
    .attr("d", () => {
      return arcGenerator({
        startAngle: 0,
        endAngle: angleDaysWithPrecipitations_rad,
      });
    })
    .attr("fill", "#6EB7C2");

  innerChart
    .append("path")
    .attr("d", () => {
      return arcGenerator({
        startAngle: angleDaysWithPrecipitations_rad,
        endAngle: 2 * Math.PI,
      });
    })
    .attr("fill", "#DCE2E2");

  const centroid = arcGenerator
    .startAngle(0)
    .endAngle(angleDaysWithPrecipitations_rad)
    .centroid();

  console.log(centroid);

  innerChart
    .append("text")
    .text((d) => d3.format(".0%")(percentageDaysWithPrecipitations / 100))
    .attr("x", centroid[0])
    .attr("y", centroid[1])
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .style("font-weight", 500);
};
