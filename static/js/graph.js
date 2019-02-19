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
     //  var parseTime = d3.time.format("%H:%M %p").parse;
       
       
    
           fireData.forEach(function(d){
            d.Incident_Counter = parseInt(d.Incident_Counter); // parsing the incident count key from text to a number.
            d.Date = parseDate(d.Date);
          //  d.TOC = parseTime(d.TOC);
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
       // show_fire_by_time(ndx);
        //show_fire_by_day(ndx);
        show_fire_by_group(ndx);
         show_percentage_Incidents(ndx, "Fri", "#percentFri");
   
        
        dc.renderAll(); //call to render dimensional charting
        
    }
   
  
   
   
   
   
   function show_area_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Station_Area'));
    var group = dim.group();
    
        dc.selectMenu("#area-selector")
        .dimension(dim)
       .group(group);
   }
   
    function show_year_selector(ndx)
    {
    var dim = ndx.dimension(dc.pluck('Date'));
   
   var year = d3.time.format("%Y");
      //    fireData.forEach(function(d) {
    //     d.Date = year(parseDate(d.Date));
      //   });
   
   
  // facts.forEach(function(d) {
  //if (d.types == 2) {
    // d._type = "Type 2";
  //} else if (d.types == 3) {
    // d._type = "Type 3";
  //} else {
    // d._type = "Other";
 // }
//});

//var types = facts.dimension(dc.pluck('_type'))
   
   
   
   
   
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
   
  
  
    function show_fire_by_group(ndx){
    var group_dim = ndx.dimension(dc.pluck('Desc_group'));
    var total_count_per_group = group_dim.group().reduceSum(dc.pluck('Incident_Counter'));
    
    dc.pieChart("#Fire-by-servicegroup")
    .height(330)
    .radius(90)
    .transitionDuration(1500)
    .dimension(group_dim)
    .group(total_count_per_group);
    
    }
    

    function show_fire_by_area(ndx) {
    var name_dim = ndx.dimension(dc.pluck('Station_Area'));
    var group = name_dim.group();
  
        dc.barChart("#Fire-by-area")
        .width(1100)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(name_dim)
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
    
    //creating a fake filtered group to exlude incidents in the dataset that have not been entered with a type of incident
    var filtered_group = remove_not_specified(group)
    function remove_not_specified(Desc_group_type) {
    return {
        all:function () {
            return Desc_group_type.all().filter(function(d) {
                return d.key !="SS - Not Specified" && d.key !="Fire - Not Specified"; //removes 'Not Specified'
            });
        }
    };
}
    
         dc.rowChart("#Fire-by-description")
        .width(550)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(filtered_group)// passing in filtered group
        .transitionDuration(500)//how quickly chart animates when filtered
        .cap(10) //limit to top 10 records
        .othersGrouper(false) // exclude grouped 'others'
       
}

function show_fire_by_area10(ndx) {
    var dim = ndx.dimension(dc.pluck('Station_Area'));
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
        var total_count_per_date = date_dim.group().reduceSum(dc.pluck('Incident_Counter'));
       
       var minDate = date_dim.bottom(1)[0].Date;
       var maxDate = date_dim.top(1)[0].Date;
       var timeFormat = d3.time.format("%a %e/%m/%Y");
        
       
       function incident_by_service_type(Desc_group) {
            return function(d) {
                if (d.Desc_group === Desc_group) {
                    return +d.Incident_Counter;
                } else {
                    return 0;
                }
            }
        }
        var serviceByMonth = date_dim.group().reduceSum(incident_by_service_type('Special Service'));
        var fireByMonth = date_dim.group().reduceSum(incident_by_service_type('Fire'));
        
        dc.lineChart("#Fire-by-date")
            .width(1100)
            .height(300)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(date_dim)
            .group(total_count_per_date)
            .transitionDuration(500)
            .x(d3.time.scale().domain([minDate,maxDate]))
            .xAxisLabel("Year")
             .title(function(d) { return timeFormat(d.key) + " - " + d.value + " reported incidents"; })
             .renderTitle(true)
             .mouseZoomable(false)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .brushOn(false)
            .dotRadius(10)
            .renderArea(false)
            .renderDataPoints(true)
            .yAxis().ticks(4);
           
        
        
       
        var compositeChart = dc.compositeChart('#Fire-by-date-composite');
        compositeChart
            .width(1100)
            .height(300)
            .dimension(date_dim)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .yAxisLabel("Incident")
            .title(function(d) { return timeFormat(d.key) + " - " + d.value + " reported incidents"; })
            .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .brushOn(false)
            
            
            .compose([
                dc.lineChart(compositeChart)
                    .colors('red')
                    .group(fireByMonth, 'Fire Call Outs'),
                dc.lineChart(compositeChart)
                    .colors('orange')
                    .group(serviceByMonth, 'Service Call Outs'),
               
            ]);
        
     }
     
     
     /*
        function show_fire_by_time(ndx) {
        var time_dim = ndx.dimension(dc.pluck('TOC'));
        var total_count_per_time = time_dim.group().reduceSum(dc.pluck('Incident_Counter'));
       
    // var hours = ndx.dimension(function(d){
        //     return d3.time.hour(timeFormat.parse(d.TOC));
        // });
        // var totalByHour = hours.group().reduceSum(function(d){
        //                         return d.Incident_counter;
        //                     });   
       
       var hourChart = dc.barChart('#hour-chart')
        hourChart
        .width(550)
        .height(300)
       // .dimension(hour)
        //.group(hours)
        .dimension(time_dim)
        .group(total_count_per_time)
        .x(d3.scale.linear()
         .domain([0, 23])
         .rangeRound([0, 10 * 24]))
        .controlsUseVisibility(true);
        hourChart.yAxis().tickFormat(d3.format('s'));
       
         }
        */
        
  
    
       
     function show_percentage_Incidents(ndx, day, dayOfPercentage) {

    var dayFormat = d3.time.format("%a");
    var percentage = ndx.groupAll().reduce(

        function(p, v) {
            p.totalIncidentCount += v.Incident_Counter; 
            if (dayFormat(v.Date) === day) { 
                p.dayIncidentCount += v.Incident_Counter; 
            }
            return p;
        },
        function(p, v) {
            p.totalIncidentCount -= v.Incident_Counter;
            if (dayFormat(v.Date) === day) {
                p.dayIncidentCount -= v.Incident_Counter;

            }
            return p;
        },
        function() {
            return { totalIncidentCount: 0, dayIncidentCount: 0 };
        }
    );

 dc.numberDisplay(dayOfPercentage)

        .group(percentage)

        .transitionDuration(2000)
        .formatNumber(d3.format(".2%"))
        .valueAccessor(function(d) {
            if (d.totalIncidentCount == 0) { //If the count is 0 than return no value
                return 0;
            }
            else {
                return (d.dayIncidentCount / d.totalIncidentCount); 
            }
        });

}

        