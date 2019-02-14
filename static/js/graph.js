//loading the data using the queue js library
//when data is downloaded call the makeGraphs function

queue()
    .defer(d3.csv, "data/2013-2015-dfb-fire.csv")
    .await(makeGraphs);
    
//data will be passed into variable fireData by queue.min.js  
//creating crossfilter
    function makeGraphs(error, fireData) {
        var ndx =crossfilter(fireData);
        
        show_fire_by_area(ndx);
        
        dc.renderAll(); //call to render dimensional charting
        
    }
   

    function show_fire_by_area(ndx) {
    var dim = ndx.dimension(dc.pluck('Station Area'));
    var group = dim.group();
    
    dc.barChart("#Fire-by-area")
        .width(1100)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)//how quickly chart animates when filtered
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Station Area")
        .yAxis().ticks(20);
}




