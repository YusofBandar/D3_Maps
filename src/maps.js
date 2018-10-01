var width = 960;
var height = 500;


var path = d3.geoPath();


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var map = svg.append('g')
    .style('stroke-width','1.5px');

d3.json('https://unpkg.com/us-atlas@1/us/10m.json',function(error,us){
    if(error) throw error;

    map.selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
      .attr("class", "feature")
     
})