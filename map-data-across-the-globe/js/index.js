const HEIGHT = 800;
const WIDTH = 1200;

$.getJSON(
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json",
  function(data) {
    $.getJSON(
      "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json",
      function(data2) {
        var svg = d3
          .select("#container")
          .append("svg")
          .attr("height", HEIGHT)
          .attr("width", WIDTH)
          .append("g");

        var projection = d3.geoMercator().translate([WIDTH / 2, HEIGHT / 2]);
        var path = d3.geoPath().projection(projection);
        var countries = topojson.feature(data, data.objects.countries1)
          .features;
        var meteorites = data2.features;

        var tool_tip = d3
          .tip()
          .attr("class", "d3-tip")
          .offset([-8, 0])
          .html(function(d) {
            return (
              "<div>" +
              d.properties.name +
              "<br>" +
              d.properties.mass +
              " Kg<br>" +
              d.properties.year +
              "<br>" +
              d.properties.fall +
              "</div>"
            );
          });
        svg.call(tool_tip);

        svg
          .selectAll(".countries")
          .data(countries)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", path);

        svg
          .selectAll("circle")
          .data(meteorites)
          .enter()
          .append("circle")
          .attr("cx", d => {
            return projection([d.properties.reclong, d.properties.reclat])[0];
          })
          .attr("cy", d => {
            return projection([d.properties.reclong, d.properties.reclat])[1];
          })
          .attr("r", d => {
            let meteoriteSize = d.properties.mass * 0.0001;
            if (meteoriteSize > 7) {
              return 7;
            } else {
              return meteoriteSize;
            }
          })
          .attr("class", "meteorites")
          .on("mouseover", tool_tip.show)
          .on("mouseout", tool_tip.hide);
      }
    );
  }
);