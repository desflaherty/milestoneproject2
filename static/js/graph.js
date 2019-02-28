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
       var parseTime = d3.time.format("%H:%M:%S").parse;
       var parseHour = d3.time.format("%H");
       var parseMonth = d3.time.format("%b");
       
            fireData.forEach(function(d){
            d.Incident_Counter = parseInt(d.Incident_Counter); // parsing the incident count key from text to a number.
            d.Date = parseDate(d.Date);
            d.TOC = parseHour(parseTime(d.TOC));
            d.Year = d.Date.getFullYear();
            d.Month = parseMonth(d.Date);
            
});


             
        show_area_selector(ndx);
        show_type_selector(ndx);
        show_year_selector(ndx);
        totalIncidentCount(ndx);
        show_incidents_that_are_fire(ndx);
        show_incidents_that_are_special(ndx);
        show_fire_by_area(ndx);
        show_fire_by_date(ndx);
        show_fire_by_all_incidents(ndx);
        show_fire_by_description(ndx);
        show_fire_by_area10(ndx);
        show_fire_by_time(ndx);
       // show_fire_by_group(ndx);//
        show_fire_by_day(ndx);
        //show_fire_by_month(ndx);//
        dc.renderAll(); //call to render dimensional charting
        
    }
   
 
   
   
  /* ********* AREA MENU DROPDOWN **********  */ 
   
   function show_area_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Station_Area'));
    var group = dim.group();
        dc.selectMenu("#area-selector")
        .dimension(dim)
       .group(group)
       .title(function(d) { return d.key; })
        .promptText('All Station Areas');
   }
   
  
   /* ********* CALL TYPE DROPDOWN **********  */  
   
    function show_type_selector(ndx){
    var dim = ndx.dimension(dc.pluck('Desc_group'));
    var group = dim.group();
        dc.selectMenu("#type-selector")
        .dimension(dim)
        .group(group)
        .title(function(d) { return d.key; })
        .promptText('Incident Type');
   }
   
   /* ********* YEAR MENU DROPDOWN **********  */ 
   
   function show_year_selector(ndx,Year)
    {
     var yeardim = ndx.dimension(dc.pluck('Year'));
     var group = yeardim.group();
       dc.selectMenu('#year-selector')
               .dimension(yeardim)
               .group(group)
               .title(function(d) { return d.key; })
               .promptText('Year');
   }
   
   /*
   function show_month_selector(ndx,Month)
   {
     var monthdim = ndx.dimension(dc.pluck('Month'));
     var group = monthdim.group();
       dc.selectMenu('#month-selector')
               .dimension(monthdim)
               .group(group)
               .title(function(d) { return d.key; })
               .promptText('Month');
   }
   */
 
 /* 
  function show_fire_by_month(ndx) {
     var Month = ndx.dimension(function (d) {
        var month = d.Date.getMonth();
        var name = [ 'January', 'February' , 'March','April','May','June','July','August','September','October','November','December'];
        return name[month];
        });
    
        var monthGroup = Month.group();
      
         dc.barChart("#Fire-by-month")
        .width(800)
        .height(200)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(Month)
        .group(monthGroup)
        .transitionDuration(500)//how quickly chart animates when filtered
        //.x(d3.scale.ordinal())
       .x(d3.scale.ordinal().domain(Month))
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Month")
       
       
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .yAxis().ticks(10);
       // .yAxis().tickFormat(d3.format(".3s"));
       
}

       
*/


/*
    function show_fire_by_group(ndx){
    var group_dim = ndx.dimension(dc.pluck('Desc_group'));
    //var total_count_per_group = group_dim.group().reduceSum(dc.pluck('Incident_Counter'));
    
    var total_count_per_group = group_dim.group().reduce(
        function(p, v) {
            p.total += v.Incident_Counter;
            return p;
        },
        function(p, v) {
            p.total -= v.Incident_Counter;

            return p;
        },
        function() {
            return { total: 0 };
        }
    );
    
    dc.pieChart("#Fire-by-servicegroup")
    .height(330)
    .radius(90)
    .transitionDuration(1500)
    .dimension(group_dim)
    .group(total_count_per_group)
    .title(function(d) { return d.key + " " + ((d.value.total / 38552) * 100).toFixed(2) + "% - " + d.value.total + " Reported Incidents"; })
   .valueAccessor(function(d) {
            if (d.value.total > 0) {
                return d.value.total;
            }
            else {
                return 0;
            }
        });
  
        
        
  
  
    }
    */
    
  /* ********* TOTAL INCIDENT COUNTER **********  */   
    
    function totalIncidentCount(ndx){
    
    var incident_count = ndx.groupAll().reduce(
        function(p, v) {
            p.total += v.Incident_Counter;
            return p;
        },
        function(p, v) {
            p.total -= v.Incident_Counter;
            return p;
        },
        function() {
            return { total: 0 };
        }
    );
    
   dc.numberDisplay("#total_incidents")
        .group(incident_count)
        .transitionDuration(1700)
        .formatNumber(d3.format("2f"))
     .valueAccessor(function(d) { return d.total; });
    }
    
  /* ********* FIRE INCIDENT COUNTER **********  */     
    
    function show_incidents_that_are_fire(ndx) {
    var incidentsThatAreFire = ndx.groupAll().reduce(
        function(p, v) {
            if (v.Desc_group === "FIRE") {
                p.are_fire++;
            }
            return p;
        },
        function(p, v) {
            if (v.Desc_group === "FIRE") {
                p.are_fire--;
            }
            return p;
        },
        function() {
            return {are_fire: 0};    
        },
    );
    
    dc.numberDisplay("#totalfire_incidents")
        .group(incidentsThatAreFire)
        .transitionDuration(1700)
        .formatNumber(d3.format("2f"))
        .valueAccessor(function(d) { return d.are_fire; });
    }
        
  /* ********* SPECIAL SERVICE INCIDENT COUNTER **********  */ 

function show_incidents_that_are_special(ndx) {
    var incidentsThatAreSpecial = ndx.groupAll().reduce(
        function(p, v) {
            if (v.Desc_group === "SPECIAL SERVICE") {
                p.are_special++;
            }
            return p;
        },
        function(p, v) {
            if (v.Desc_group === "SPECIAL SERVICE") {
                p.are_special--;
            }
            return p;
        },
        function() {
            return {are_special: 0};    
        },
    );
    
    dc.numberDisplay("#totalspecial_incidents")
        .group(incidentsThatAreSpecial)
        .transitionDuration(1700)
        .formatNumber(d3.format("2f"))
        .valueAccessor(function(d) { return d.are_special; });
    }
    
    
  /* ********* STATION BARCHART **********  */     

    function show_fire_by_area(ndx) {
    var name_dim = ndx.dimension(dc.pluck('Station_Area'));
    var group = name_dim.group();
   
        dc.barChart("#Fire-by-area")
        .width(800)
        .height(300)
        .margins({top: 10, right: 50, bottom: 120, left: 50})
        .dimension(name_dim)
        .group(group)
        .transitionDuration(500)//how quickly chart animates when filtered
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("FIRE STATION AREA")
        .title(function(d) { return ((d.value / 38552) * 100).toFixed(2) + "% - " + d.value + " Reported Incidents" + " at " + d.key; })
        .yAxis().ticks(20);
}

 /* ********* ALL INCIDENTS BARCHART **********  */  
 
  function show_fire_by_all_incidents(ndx) {
    var type_dim = ndx.dimension(dc.pluck('Desc_group_type'));
    var group = type_dim.group();
  
  
        dc.barChart("#Fire-by-all-incidents")
        .width(1200)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 150, left: 50 })
        .elasticY(false)
        .dimension(type_dim)
        .group(group)
        .transitionDuration(500)//how quickly chart animates when filtered
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("INCIDENT DESCRIPTION TYPE")
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .title(function(d) {return (d.key + " : " + d.value + " Reported Incidents"); })
        .yAxis().ticks(10);
      
}

 /* ********* TOP 10 DESCRIPTION TYPE ROWCHART**********  */ 


function show_fire_by_description(ndx) {
    var dim = ndx.dimension(dc.pluck('Desc_group_type'));
    var group = dim.group();
    
    //creating a fake filtered group to exlude incidents in the dataset that have not been entered with a 'type of incident' description
    var filtered_group = remove_not_specified(group);
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
        .width(600)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(filtered_group)// passing in filtered group
        .transitionDuration(500)//how quickly chart animates when filtered
        .cap(10) //limit to top 10 records
        .othersGrouper(false) // exclude grouped 'others'
        .title(function(d) {return (d.key + " : " + d.value + " Reported Incidents"); })
}


/* ********* TOP 10 STATION AREA ROWCHART **********  */ 

function show_fire_by_area10(ndx) {
    var dim = ndx.dimension(dc.pluck('Station_Area'));
    var group = dim.group();
    
         dc.rowChart("#Fire-by-area10")
        .width(600)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)//how quickly chart animates when filtered
        .cap(10) //limit to top 10 records
        .title(function(d) {return (d.key + " : " + d.value + " Reported Incidents"); })
       .othersGrouper(false); // exclude grouped 'others'
        
}

/* ********* TIMELINE CHART**********  */ 

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
        var serviceByMonth = date_dim.group().reduceSum(incident_by_service_type('SPECIAL SERVICE'));
        var fireByMonth = date_dim.group().reduceSum(incident_by_service_type('FIRE'));
        
        dc.lineChart("#Fire-by-date")
            .width(1200)
            .height(350)
            .margins({top: 10, right: 50, bottom: 50, left: 50})
            .dimension(date_dim)
            .group(total_count_per_date)
            .transitionDuration(500)
            .x(d3.time.scale().domain([minDate,maxDate]))
            .xAxisLabel("YEAR")
            .yAxisLabel("INCIDENTS")
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
            .width(1200)
            .height(350)
            .margins({top: 10, right: 50, bottom: 50, left: 50})
            .dimension(date_dim)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .xAxisLabel("YEAR")
            .yAxisLabel("INCIDENTS")
            .title(function(d) { return timeFormat(d.key) + " - " + d.value + " reported incidents"; })
            .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .brushOn(false)
            
            .compose([
                dc.lineChart(compositeChart)
                    .colors('red')
                    .group(fireByMonth, 'FIRE CALL OUTS'),
                dc.lineChart(compositeChart)
                    .colors('orange')
                    .group(serviceByMonth, 'SPECIAL SERVICE CALL OUTS'),
               
            ]);
        
     }
     
     
     /* ********* INCIDNETS BY TIME OF CALL **********  */ 
     
        function show_fire_by_time(ndx) {
        var time_dim = ndx.dimension(dc.pluck('TOC'));
        var total_count_per_time = time_dim.group().reduceSum(dc.pluck('Incident_Counter'));
        var timeFormat = d3.time.format("%H:%M:%S");
        
        dc.barChart("#Fire-by-time")
        .width(600)
        .height(300)
        .margins({top: 10, right: 50, bottom: 50, left: 50})
        .dimension(time_dim)
        .group(total_count_per_time)
        //.title(function(d) { return timeFormat(d.key) + " - " + d.value + " reported incidents"; })
        .title(function(d) {return (d.key + ":00 hrs."+" Over the next hour there were " + d.value + " Reported Incidents"); })
        .renderTitle(true)
        .transitionDuration(500)//how quickly chart animates when filtered
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("24 Hour Time")
        .yAxis().ticks(20);
         }
        
     
       
  /* ********* INCIDENTS BY DAY OF THE WEEK **********  */ 

      function show_fire_by_day(ndx) {
        var dayOfWeek = ndx.dimension(function (d) {
        var day = d.Date.getDay();
        var name = [ 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY' ];
        return name[day];
        });
    
        var dayOfWeekGroup = dayOfWeek.group();
      
         dc.rowChart("#Fire-by-day")
        .width(600)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dayOfWeek)
        .group(dayOfWeekGroup)
        .title(function(d) { return ((d.value / 38552) * 100).toFixed(2) + "% - " + d.value + " Reported Incidents" + " on " + d.key; })
        .transitionDuration(500);//how quickly chart animates when filtered
       

}