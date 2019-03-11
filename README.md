
# Project Name: A Dashboard showing Fire Brigade Call Out Activity in the Dublin Area.


I wanted to develop a project that used an Irish dataset to make it more interesting
for me. The main Irish websites that provide open data are the Central Statistics Office https://www.cso.ie/en/databases/
and the Data Gov site https://data.gov.ie/. After reviewing both sites I came accross the Fire & Ambulance datasets available at
https://data.gov.ie/dataset/fire-brigade-and-ambulance. The Dublin Fire Brigade dataset had some interesting data recorded and
as far as I am aware there there are no existing showcases on the Data Gov website thus far using this dataset,so this is why I
decided to develop a dashboard using this data for the second milestone project. The most recent data available was for the 2013-2015
time period. The data portal was contacted via email to seek a more updated record source and I did receive a reply that the Dublin Fire
Brigade would provide another updated dataset but there are no timelines when this could be delivered so the project was developed with
the most recent data available.


# # UX
*Strategy:* 
The intention of the project would be to use custom visualizations in order to provide insight on the incidents reported by
the fire services in the Dublin area over a 3 year period from 2013-2015. Public Safety is an area that is of interest and
concern to the general public as a whole, yet from my research in this area I have not been able to locate resources
that would show fire call outs in a easily digestible format such as in an interactive dashboard.
This project is intended to provide insight into this area for public consumption as it showcases the work being done by the
emergency services to ensure the safety of the public in Dublin.
The project would aim to provide learnings that can be implemented by the planners of Dublin Fire Brigade (DBF) to allocate resources.
Insights gained from using the dashboard could highlight peak times of the day for call outs,
problem times of the year i.e Halloween, areas with highest call out frequency, and additional special requests
that DBF provide. 

*User Stories:*

As a planner or senior executive in DBF - (also relevant to interested parties in other Gov agencies or general member of the public): 
* be able to use filter menus to navigate the dataset,
* be able to view total amount of call out incidents contained in the dataset
* have a graphical display of total call outs by area
* which areas and incidents are generating the most call outs
* a time line of call out activity to highlight spikes in the year such as Halloween
* have a view of peak time and day of calls
* be able to interact with these visualizations by filtering on different areas of interest that would help generate insight

A mockups for the proposed dashboard layout and metrics can be found in the project folder on github
https://github.com/desflaherty/milestoneproject2/tree/master/wireframe.

*Data Cleaning:*

After an examination of the dataset I decided which fields would be used and also if there was any data formatting neeeded prior to project
development.

The fields used in the project were:
* 'Date': Displays Date of Call in the format 'dd-mm-yy'
* 'Station Area': Text field containing the Fire Station Areas where data was collected
* 'Desc_group': This field was derived from the 'Description' field contained in the original dataset to make the graphing process easier.
The field contains the Incident Type splits by 'Fire' or 'Special Service'.
* 'Desc_group_type': This field was derived from the 'Description' field. The original dataset used coded values that would not have been
descriptive enough to display on charts in the project. A lookup table that was provided with the dataset was used to create this field.
For example where the original data set would have used 'S/S GRDASS', this was captured in two fields 'Special Service', 'Garda Assistance'.
* 'TOC': Displayes the Time of Call in the format 'hh:mm:ss AM'
* 'Incident Counter': An integer field derived for graphing purposes.

The additional fields provided in the original dataset were not used in the project as they were deemed to be irrelevant
to the project or the data was of a poor quality with a lot of missing values contained in the recordset.


# # Existing Features
* Three Drop down menus are displayed at the top of the dashboard. These enable the user to filter the data by 'Station Area','Incident type' and 'Year'.
* A number counter to display total reported incidents. The counter will update dynamically when data is filtered using menu dropdowns or charts.
* A number counter to display 'fire' reported incidents.
* A number counter to display 'special service' reported incidents.
* A bar chart to display total incidents by area. Each area can be selected and a filter will be updated across the dashboard.
* A row chart displaying the Top 10 areas by incident volume.
* A row chart displaying the Top 10 incident types/
* A bar chart displaying all incident types.
* A line chart displaying a time line of recorded incidents by year and month. A zoomable feature allows zooming to day also.
* A composite line chart to show splits of 'fire' and 'special service' across year and month.
* A bar chart showing call volume by 24 hour time range.
* A row chart displaying volume of incidents by day.
* A reset button to allow the user to reset the filters chosen.
* A back to top button to scroll the page back to the top for easier navigation.
* JQuery Tooltips are used for two graphs to explain how they can be used correctly or for interpretation of the information. The
  charts with JQuery Tooltips are the 'Incident by Time' and 'Top 10 Incidnet by description'. Other charts are self-explanatory so no Tooltip is used.
* Other charts use D3 tooltips and have information dispalyed in a easily interpreted way.

# # Features Left to Implement
If an updated recordset can be sourced data for the time range 2016-2018 can be added to the project.
There is a field contained in the original dataset that records a time when the first fire brigade responded to the scence of a call.
However the field contains a lot of missing values. If the data can be populated a 'response time' field could be derived by using the 
'TOC' time of call field and this field. Average response time by area could also be derived.

# # Technologies Used

* HTML5 -The webs core markup language used for creating content for the web. HTML5 is the 5th edition of the language. https://www.w3.org/TR/html52/
* CSS  - Used in style.css. Style.css containes the stylesheet used to format the presentation of the website. 
* Bootstrap 3.3.7  - An open source toolkit for developing with HTML, CSS and JS https://getbootstrap.com/
* Javascript -An object-oriented computer programming language commonly used to create interactive effects within web browsers. https://developer.mozilla.org/bm/docs/Web/JavaScript
* D3.JS - A JavaScript library for visualizing data using web standards. D3 combines powerful visualization and interaction techniques with a data-driven approach to DOM manipulation.https://d3js.org/
* DC.JS - A Javascript charting library. It leverages D3 to render charts in CSS-friendly SVG format. Used to create the charts used in the dashboard.https://dc-js.github.io/dc.js/
* Font Awesome - A font and icon toolkit based on CSS and LESS. Used to display the info graphic used as a tooltip https://fontawesome.com/
* Google Fonts -A library of fontsthat can be used in the website.https://fonts.google.com/
* JQuery - A JavaScript library used to simplify DOM manipulation. Used to control the button features used in the project. https://jquery.com/



# #  Testing

The index.html was checked with HTML validator https://validator.w3.org/#validate_by_input to remove 
as all warnings and  all errors.
The CSS style sheet was checked using http://csslint.net/. There were no errors but there are some warning messages returned.
The Javascript file was checked using https://codebeautify.org/jsvalidate - some warnigns were returned.

Responsinator was used to check responsiveness of different devices - https://www.responsinator.com 
Google Chrome developer was also used.

Devices tested on include: Galaxy S5, iPhone 5/SE, iPhone 6/7/8, iPhone 6/7/8 Plus, iPhone X, iPad, iPad Pro, Desktop PC. 
Browsers tested were Google Chrome,Internet Explorer and Firefox. Also the Safari browser on iPhone.

Although D3 is made for desktop, media queries were introduced with a scroll allow value in the CSS file so that the charts can be
scrolled across on smaller device screens such as mobile.

The criteria used for testing included:

* Functionality
* Navigation
* Display

The format used for testing can be viewed below. 

| Feature         | Device        | Browser   | Result | 
| -------------   |:------------- | :------   | :----- |
| Area Menu       |IPhone         | Chrome    | Pass   |
| Type Menu       |IPhone         | Chrome    | Pass   |
| Year Menu       |IPhone         | Chrome    | Pass   |
| Barchart1       |IPhone         | Chrome    | Pass   |
| Barchart2       |IPhone         | Chrome    | Pass   |
| Line Graph1     |IPhone         | Chrome    | Pass   |
| Row Chart1      |IPhone         | Chrome    | Pass   |
| Button1         |IPhone         | Chrome    | Pass   |
| Area Menu       |Desktop        | Chrome    | Pass   |
| Type Menu       |Desktop        | Chrome    | Pass   |
| Year Menu       |Desktop        | Chrome    | Pass   |
| Barchart1       |Desktop        | Chrome    | Pass   |
| Barchart2       |Desktop        | Chrome    | Pass   |
| Line Graph1     |Desktop        | Chrome    | Pass   |
| Row Chart1      |Desktop        | Chrome    | Pass   |
| Button1         |Desktop        | Chrome    | Pass   |




Sample test script:

* Test all dropdown menus to ensure they display all values and filter the data correctly.
* Use reset button to refresh the data.
* Use scroll button to scroll back to top.
* Ensure scroll button disappears when at top of screen.
* Ensure scroll button appears when user starts to scroll.

* On mobile device ensure all charts can be scrolled from left to right.
* Ensure Information Icon is correctly displayed.
* Ensure Info Tooltip appears and disappears as expected.

* Filter on chart value and ensure all other charts update with filtered data.
* Use reset button to refresh the data.

* Choose a weekday on day of week row chart and ensure the timeline chart only displys this day.
* Use reset button to refresh the data.

* Test external HTML links in the footer to ensure they function and open in a new webpage.


## Issues Noticed:

When the user zooms on the line chart the scroll to the right feature is no longer available. The user would have to zoom back out again
so that the scroll across feature is available again. This is the functionality available and acts as expected.

On Ipad there is a empty space to the right of the incident counters as the station area chart stacks under the 
counters. If the station area chart was aligned to the right of the counters it would look squashed as only part of the chart would be visible
and so this appearance was left as it is.

Internet Explorer does not display the dashboard charts.

A mouseover is used in the JQuery file to control the JQuery tooltip. This works as expected when using a mouse on desktop however on mobile
devices the Info Icon has to be pressed to appear so does not then disappear. The reset button would need to be clicked for the Tooltip to 
disappear from being displayed on top of the chart.

The D3 tooltips don't appear on mobile as rollover functionality is not available. As these charts were developed for deskttop this functionality is
as expected.

## Deployment:
The project was continuously pushed to github commiting any changes through the development stages.
A new respository was created in github and initiallized in git at the start of the project.
The finished project was deployed to github pages through the settings - master branch link
https://desflaherty.github.io/milestoneproject2

The files used for the development are located at https://github.com/desflaherty/milestoneproject2


To run the code locally clone the repository and run the index.html page.

## Credits:

* The code used for the reset charts button was located at http://bl.ocks.org/d3noob/6584483
* The code used for the JQuery back to top button was located at https://www.templatemonster.com/blog/back-to-top-button-css-jquery/


## Content

* The Database used in the project was obtained from https://data.gov.ie/dataset/fire-brigade-and-ambulance
* Licensed under creative commons attribution 4.0 https://creativecommons.org/licenses/by/4.0/