//loading the data using the queue js library
//when data is downloaded call the makeGraphs function

queue()
    .defer(d3.csv, "data/firedata.csv")
    .await(makeGraphs);
    
//data will be passed into variable fireData by queue.min.js  
//creating crossfilter



function makeGraphs(error, fireData) {
var ndx =crossfilter(fireData);
 
//converting from a string into a date format, and formatting as year only
//to display in select menu drop down list as 2013,2014,2015

       var parseDate = d3.time.format("%d-%m-%y").parse;
       var format = d3.time.format("%Y");
       
       
       fireData.forEach(function(d) {
        d.Date = format(parseDate(d.Date));
         });
     
    
    

      
     
        
        var countChart = dc.dataCount("#total_incidents");
         countChart
        .dimension(ndx)
        .group(ndx.groupAll());
       
        
           
        
        
       show_fire_by_area(ndx);
        show_fire_by_date(ndx);
        show_area_selector(ndx);
        show_year_selector(ndx);
        show_type_selector(ndx);
        show_fire_by_description(ndx);
        show_fire_by_area10(ndx);
       
        
        
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
   
    function show_type_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Desc_group'));
    var group = dim.group();
        dc.selectMenu("#type-selector")
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


function show_fire_by_description(ndx) {
    var dim = ndx.dimension(dc.pluck('Desc_group_type'));
    var group = dim.group();
    
         dc.rowChart("#Fire-by-description")
        .width(550)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)//how quickly chart animates when filtered
        .cap(10) //limit to top 10 records
       .othersGrouper(false) // exclude grouped 'others'
}

function show_fire_by_area10(ndx) {
    var dim = ndx.dimension(dc.pluck('Station Area'));
    var group = dim.group();
    
         dc.rowChart("#Fire-by-area10")
        .width(550)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)//how quickly chart animates when filtered
        .cap(10) //limit to top 10 records
       .othersGrouper(false) // exclude grouped 'others'
}


     function show_fire_by_date(ndx) {
        var date_dim = ndx.dimension(dc.pluck('Date'));
        var total_spend_per_date = date_dim.group().reduceSum(dc.pluck('Description'));
        var minDate = date_dim.bottom(1)[0].date;
        var maxDate = date_dim.top(1)[0].date;
        dc.lineChart("#Fire-by-date")
            .width(1000)
            .height(300)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(date_dim)
            .group(total_spend_per_date)
            .transitionDuration(500)
            .x(d3.time.scale().domain([minDate,maxDate]))
            .xAxisLabel("Month")
            .yAxis().ticks(4);
       
       
   }
   
   