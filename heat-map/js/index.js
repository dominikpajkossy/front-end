$.getJSON(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",
  function(dataset) {
    var baseTemp = dataset.baseTemperature;
    var Months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Nomvember",
      "December"
    ];

    var svg = d3
      .select("#container")
      .append("svg")
      .attr("height", 600)
      .attr("width", 1048)
      .style("background-color", "#111");

    var tool_tip = d3
      .tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) {
        d3.select(this).style("opacity",0);
        return (
          "<div>" +
          Months[d.month - 1] +
          " " +
          d.year +
          "<br>" +
          (baseTemp + d.variance) +
          " °C </div>"
        );
      });
    svg.call(tool_tip);

    svg
      .selectAll("rect")
      .data(dataset.monthlyVariance)
      .enter()
      .append("rect")
      .attr("height", 50)
      .attr("width", 4)
      .attr("x", d => {
        return (d.year - 1753) * 4;
      })
      .attr("y", d => {
        let pos = (d.month - 1) * 50;
        switch (d.month) {
          case 1:
            return pos;
            break;
          case 2:
            return pos;
            break;
          case 3:
            return pos;
            break;
          case 4:
            return pos;
            break;
          case 5:
            return pos;
            break;
          case 6:
            return pos;
            break;
          case 7:
            return pos;
            break;
          case 8:
            return pos;
            break;
          case 9:
            return pos;
            break;
          case 10:
            return pos;
            break;
          case 11:
            return pos;
            break;
          case 12:
            return pos;
            break;
        }
      })
      .style("fill", d => {
        let temp = Math.round((baseTemp + d.variance) * 100);
        if (temp >= 0 && temp < 270) return "#5e4fa2";
        else if (temp >= 270 && temp < 390) return "black";
        else if (temp >= 390 && temp < 500) return "#3288bd";
        else if (temp >= 500 && temp < 610) return "#66c2a5";
        else if (temp >= 610 && temp < 720) return "#abdda4";
        else if (temp >= 720 && temp < 830) return "#e6f598";
        else if (temp >= 830 && temp < 940) return "#ffffbf";
        else if (temp >= 940 && temp < 1050) return "#fee08b";
        else if (temp >= 1050 && temp < 1160) return "#fdae61";
        else if (temp >= 1160) return "#f46d43";
        else return "#d53e4f";
      })
      .on("mouseover", tool_tip.show)
      .on("mouseout", function(){
      d3.select(this).style("opacity",500);
      tool_tip.hide;
      });
  }
);