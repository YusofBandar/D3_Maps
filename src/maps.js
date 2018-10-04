var width = 1700;
var height = 3000;

var yOffset = 400;

var projection = d3.geoAlbers()
    .scale(1000)
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)


var colour = [d3.interpolateLab("#000000", "#FFFFFF"),d3.interpolateLab("#0CE64E", "#0A3E1A")];

var i = 0;

for (var l = 0; l < 2; l++) {
    let map = svg.append('g')
        .style("stroke-width", "1.5px")
        .attr("transform", "translate(200," + (-1200 + yOffset) + ")")





    d3.json('us.json', function (error, us) {
        if (error) throw error;

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
            .datum(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; }))
            .attr("class", "mesh")
            .attr("d", path);

    })

    yOffset = yOffset + 1000;

    console.log(normalize(20));
}


function normalize(val) {
   var result = (val - 0) * (1-0.1)/(54-1) + 0.1
   return result;
}











