const NODEWIDTH = 14;
const NODEHEIGHT = 14;
const HEIGHT = 500;
const WIDTH = 1000;

$.getJSON(
  "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json",
  function(dataset) {
    //Create nodes and links for the visualisation
    var links = dataset.links;
    var nodes = dataset.nodes;

    //Add svg
    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    //Use force function
    var force = d3.layout
      .force()                  //build the layout
      .size([WIDTH, HEIGHT])    //set sizes
      .nodes(d3.values(nodes))  //add nodes
      .links(links)             //add links
      .on("tick", tick)         //do tick function every tick
      .linkDistance(20)         //set for proper svg size
      .start()                  //
      .charge(-100);            //set charge

    //Add connecting links
    var link = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link");

    //Add the nodes
    var node = svg
      .selectAll(".node")
      .data(force.nodes())
      .enter()
      .append("image")
      .attr("xlink:href", d => {
        return (
          "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/4x3/" +
          d.code +
          ".svg"
        );
      })
      .attr("class", "node")
      .attr("height", NODEHEIGHT)
      .attr("width", NODEWIDTH)
      .call(force.drag);

    //Change positions every tick
    function tick(e) {
      //Set node position
      node
        .attr("x", d => d.x)
        .attr("y", d => d.y);
      //Set link position
      link
        .attr("x1", d => d.source.x + NODEWIDTH / 2)
        .attr("x2", d => d.target.x + NODEWIDTH / 2)
        .attr("y1", d => d.source.y + NODEHEIGHT / 2)
        .attr("y2", d => d.target.y + NODEHEIGHT / 2);
    }
  }
);