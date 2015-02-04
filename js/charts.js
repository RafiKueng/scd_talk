
/**
 * Assign handlers
 */ 
Reveal.addEventListener('slide1', function () { initSlide1(); });
Reveal.addEventListener('treeslide', function () { initTree(); initTree = function(){};});



/**
 * Functions
 */
var initTree = function () {
    var width = 800,
        height = 1500;

    var tree = d3.layout.tree()
        .size([height, width - 160]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select("#tree_container").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(40,0)");

    d3.json("data/data.json", function(error, json) {
        var nodes = tree.nodes(json),
            links = tree.links(nodes);

        var link = svg.selectAll("path.link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", diagonal);

        var node = svg.selectAll("g.node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

        node.append("circle")
            .attr("r", 4.5);

        node.append("text")
            .attr("dx", function(d) { return d.children ? -8 : 8; })
            .attr("dy", 3)
            .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
            .text(function(d) { return d.name; });
        });

    d3.select(self.frameElement).style("height", height + "px");
};


var initSlide1 = function () {

    var data = [44, 28, 15, 16, 23, 5];
    var width = 420,
        barHeight = 20;

    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, width]);

    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", barHeight * data.length);
    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
    bar.append("rect")
        .attr("width", x)
        .attr("height", barHeight - 1);
    bar.append("text")
        .attr("x", function(d) { return x(d) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d; });
};

