var width = 960;
var height = 500;


var projection = d3.geoAlbers()
    .scale(1000)
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);



var map = svg.append('g')
    .style("stroke-width", "1.5px");



var colour = d3.interpolateLab("#000000", "#FFFFFF");
var i=0;

d3.json('us.json', function (error, us) {
    if (error) throw error;

    map.selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "feature")
        .style("fill",function(d){
            i =i + 0.01;
            var c = colour(i);
            console.log(i);
            return c;
        })

    map.append("path")
        .datum(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; }))
        .attr("class", "mesh")
        .attr("d", path);

})

