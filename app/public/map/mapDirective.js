angular.module('map').directive('map', ['$filter', 'd3Service', 'lodashService', function ($filter, d3Service, lodashService) {
    function link(scope, element, attrs) {
        console.log('dir');
        var $el = element[0];
        //d3.xml("img/map.svg", "image/svg+xml", function(xml) {
            var paths = [];
            _.map(scope.svgData.children[0].children, function(item) {
                var rtn = {};
                _.map(item.attributes, function(s) {
                    rtn[s.name] = s.value;
                });
                paths.push(rtn);
            });
            paths.shift();

            var color = d3.scale.category20c();

            var colours = ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9"];

            var heatmapColour = d3.scale.linear()
                .domain(d3.range(0, 1, 1.0 / (colours.length - 1)))
                .range(colours);

            var dataset = [];
            _.map(scope.companyData.campaigns, function(item) {
                dataset.push(item.states[1]);
            });

            // dynamic bit...
            var c = d3.scale.linear().domain(d3.extent(dataset)).range([0,1]);

            var temp = d3.select("#mapHolder")
                .append("svg")
                    .attr("id", "mapSvg")
                    .attr("xmlns", "http://www.w3.org/2000/svg")
                    .attr("version", "1.1")
                    .attr("width", "959")
                    .attr("height", "593");
            temp.selectAll("path")
                        .data(paths)
                        .enter().append("path")
                            .attr("id", function(d) { return d.id; })
                            .attr("class", function(d) {
                                if(d.class === undefined) {
                                    return "class";
                                } else {
                                    return d.class;
                                }
                            })
                            .attr("d", function(d) {
                                if(d.d === undefined) {
                                    return null;
                                } else {
                                    return d.d;
                                }
                            })
                            .style("fill", function (d, i) { return heatmapColour(c(i)); })
                            .style("stroke", "black")
                .on('click', function(evt) {
                    console.log(evt);
                });
        //});
    };

    function resize() {
        /* Find the new window dimensions */
        console.log(d3.select("#mapSvg").style("margin-top"));
        var width = parseInt(d3.select("#mapSvg").style("width")) - margin * 2,
            height = parseInt(d3.select("#mapSvg").style("height")) - margin * 2;

        /* Update the range of the scale with new width/height */
        xScale.range([0, width]).nice(d3.time.year);
        yScale.range([height, 0]).nice();

        /* Update the axis with the new scale */
        graph.select('.x.axis')
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        graph.select('.y.axis')
            .call(yAxis);

        /* Force D3 to recalculate and update the line */
        graph.selectAll('.line')
            .attr("d", line);
    };

    d3.select(window).on('resize', resize);

    return  {
        restrict: 'E',
        link: link,
        templateUrl: 'app/map/map.html'
    }
}]);