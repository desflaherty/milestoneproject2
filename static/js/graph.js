//loading the data using the queue js library
//when data is downloaded call the makeGraphs function

queue()
    .defer(d3.csv, "data/2013-2015-dfb-fire.csv")
    .await(makeGraphs);
    
//data will be passed into variable fireData by queue.min.js  
//creating crossfilter
    function makeGraphs(error, fireData) {
        var ndx =crossfilter(fireData);
        
        var parseDate = d3.time.format("%d/%m/%Y").parse;
        fireData.forEach(function(d){
            d.date = parseDate(d.date);
        })
        
        var date_dim = ndx.dimension(dc.pluck('Date'));
        var total_incidents_per_month = date_dim.group().reduceSum(dc.pluck('Description'));
        
        var minDate = date_dim.bottom(1)[0].date;
        var maxDate = date_dim.top(1)[0].date;
        
             dc.lineChart("#Fire-by-date")
            .width(1000)
            .height(300)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(date_dim)
            .group(total_incidents_per_month)
            .transitionDuration(500)
            .x(d3.time.scale().domain([minDate,maxDate]))
            .xAxisLabel("Month")
            .yAxis().ticks(4);
        
        show_fire_by_area(ndx);
        show_fire_by_date(ndx);
        show_area_selector(ndx);
        show_year_selector(ndx);
        
        dc.renderAll(); //call to render dimensional charting
        
    }
   
   function show_area_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Station Area'));
    var group = dim.group();
    
        dc.selectMenu("#area-selector")
        .dimension(dim)
       .group(group);
   }
   
    function show_year_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Date'));
    var group = dim.group();
        dc.selectMenu("#year-selector")
        .dimension(dim)
        .group(group);
        
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




