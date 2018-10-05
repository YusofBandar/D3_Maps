var width = 1700;
var height = 3000;

var yOffset = 0;

var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)


var colour = [d3.interpolateLab("#000000", "#FFFFFF"), d3.interpolateLab("#0CE64E", "#0A3E1A")];

var screenWidth = (document.body.clientWidth/2)-800;


var i = 0;
d3.json('us.json', function (error, us) {
    if (error) throw error;


    for (var i = 0; i < 2; i++) {
        var map = svg.append('g')
            .style("stroke-width", "1.5px")
            .attr("transform", "translate("+ screenWidth/2 + "," + (-1200 + yOffset) + ")");

        map.selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "feature")
            .style("fill", function (d) {
                var c = colour[i];
                return c(normalize(d.id));
            })


        map.append("path")
            .datum(topojson.mesh(us, us.objects.states, function (a, b) {
                return a !== b;
            }))
            .attr("class", "mesh")
            .attr("d", path);

        yOffset += 600;
    }


})



function normalize(val) {
    var result = (val - 0) * (1 - 0.1) / (54 - 1) + 0.1
    return result;
}