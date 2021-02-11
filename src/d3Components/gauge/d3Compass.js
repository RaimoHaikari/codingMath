import * as d3 from "d3";

/*
 * http://bl.ocks.org/msqr/3202712
 */
export const D3Compass = () => {

    let svg;
    let gElem;
    let arcs;
    let lg;
    let pg;

    let data = []
    let width = 200;
    let height = 200;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};

    let arc;

    let labelInset = 10;

    let maxAngle = 360;    // Piirretään koko kehä
    let minAngle = 0;

    let maxValue;           // Kehän tekstien määrittämisen apuna...
    let minValue = 0;

    let needlePath;


    let r;
    let range;
    let ringInset
    let ringWidth;
    let scale; // a linear scale that maps domain values to a percent from 0..1


	let ticks;
    let tickData;
    let tickLabels = ["N","E","S","w"];
    let transitionMs = 4000;



    let updateData;
    let updateHeight;
    let updateWidth;

    /*
     * range = config.maxAngle - config.minAngle;
     */
    let configure = () => {

        let majorTicks = tickLabels.length;

        range = maxAngle - minAngle;

        // Ympyrän kehä
        r = Math.floor(Math.min(width, height) * 0.8) / 2;
        ringInset = Math.floor(Math.min(width, height) * 0.1);
        ringWidth =  Math.floor(Math.min(width, height) * 0.06);

        // Kompassinuoli
        let arrowWHalf =  Math.floor(Math.min(width, height) * 0.03);
        let arrowLen =  Math.floor(Math.min(width, height) * 0.20)
        needlePath = `M 0,0 L 0,-${arrowWHalf} L ${arrowLen},0 L 0,${arrowWHalf} Z`

        console.log("wid", width)

        // a linear scale that maps domain values to a percent from 0..1
        maxValue = majorTicks - 1
        let ylaraja = maxValue / (maxValue + 1)
        scale = d3.scaleLinear()
            .range([0, ylaraja])
            .domain([minValue, maxValue])

        ticks = scale.ticks(majorTicks);

        tickData = d3.range(majorTicks)
            .map(function() {
                return 1/majorTicks;
            });


        arc = d3
            .arc()
            .innerRadius(r - ringWidth - ringInset)
            .outerRadius(r - ringInset)
            .startAngle(function(d, i) {
				var ratio = d * i;
				return deg2rad(minAngle + (ratio * range));
			})
			.endAngle(function(d, i) {
				var ratio = d * (i+1);
				return deg2rad(minAngle + (ratio * range));
            });
            

    }

    let deg2rad = (deg) => {
		return deg * Math.PI / 180;
    }
    
    /*
     * How can I draw compass shape in d3.js and colour each triangle differently?
     * https://stackoverflow.com/questions/56716395/how-can-i-draw-compass-shape-in-d3-js-and-colour-each-triangle-differently
     */
    let drawNeedle = (value) => {

        let angle = parseInt(value);

        let data = [
            { angle: angle, color: 'black'}, 
            { angle: (180 + angle) % 360, color: 'red'}
        ];

        let paths = pg
            .selectAll('path')
            .data(data);

        paths
            .enter()
            .append('path')
                .attr('d', needlePath)
            .merge(paths)
                .style('fill', d => d.color)
                .attr('transform', d => `rotate(${d.angle})`);

        paths.exit().remove();

    }

    function chart(selection){

        /*
         *
         */
        selection.each(function(){

            configure();

            svg = d3
                .select(this)
                .append('svg')
                .attr("viewBox", [0,0, width, height])

            gElem = svg
                .append('g')
                .attr('transform', "translate(" + ((width) / 2) + ", " + ((height) / 2) + ")");

            arcs = gElem
                .append('g')
                .selectAll('path')
                .data(tickData)
                .enter()
                .append('path')
                    .attr('fill', function(d, i) {
                        return i % 2 == 0 ? "navy" : "red"
                    })
                    .attr('d', arc);

            lg = gElem
                .append('g')
                    .attr('class', 'label');

            lg
                .selectAll('text')
				.data(ticks)
                .enter()
                .append('text')
                    .attr('transform', function(d, i) {

                        var ratio = scale(d);
                        var newAngle = minAngle + (ratio * range);

                        return `rotate(${newAngle}) translate(0, ${labelInset - r})`;
                    })
                .text((d, i) => tickLabels[i]);

            // - kompassineula
            pg = gElem.append('g');
            drawNeedle(0)

            updateData = function() {
                drawNeedle(data[0])
            }

            updateHeight = function() {}
            updateWidth = function() {}

        })
    }

    chart.data = function(val){

        if(!arguments.length) return data;

        data = val;

        if(typeof updateData === 'function')
            updateData();
   
        return chart

    }

    chart.height = function(val){

        if(!arguments.length) return height;

        height = val;

        if(typeof updateHeight === 'function')
            updateHeight();
   
        return chart

    }

    chart.width = function(val){

        if(!arguments.length) return width;

        width = val;

        if(typeof updataWidth === 'function')
            updateWidth();
   
        return chart

    }

    return chart

}