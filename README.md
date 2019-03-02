
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
* Three Drop down menus are displayed at the top of the dashboard. These enable the user to filter the data by 'Station Area',
'Incident type' and 'Year'.
*A number counter to display total reported incidents. The counter will update dynamically when data is filtered using menu dropdowns or charts.
*A number counter to display 'fire' reported incidents.
*A number counter to display 'special service' reported incidents.
*A bar chart to display total incidents by area. Each area can be selected and a filter will be updated across the dashboard.
*A row chart displaying the Top 10 areas by incident volume.
*A row chart displaying the Top 10 incident types/
*A bar chart displaying all incident types.
*A line chart displaying a time line of recorded incidents by year and month. A zoomable feature allows zooming to day also.
*A composite line chart to show splits of 'fire' and 'special service' across year and month.
*A bar chart showing call volume by 24 hour time range.
*A row chart displaying volume of incidents by day.
*A reset button to allow the user to reset the filters chosen.
*A back to top button to scroll the page back to the top for easier navigation.

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
* Font Awesome - A font and icon toolkit based on CSS and LESS https://fontawesome.com/
* Google Fonts -A library of fontsthat can be used in the website https://fonts.google.com/
* JQuery - A JavaScript library used to simplify DOM manipulation. https://jquery.com/


JQuery
The project uses JQuery to simplify DOM manipulation.
Testing
In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

Contact form:
Go to the "Contact Us" page
Try to submit the empty form and verify that an error message about the required fields appears
Try to submit the form with an invalid email address and verify that a relevant error message appears
Try to submit the form with all inputs valid and verify that a success message appears.
In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

Deployment
This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:

Different values for environment variables (Heroku Config Vars)?
Different configuration files?
Separate git branch?
In addition, if it is not obvious, you should also describe how to run your code locally.

Credits
Content
The text for section Y was copied from the Wikipedia article Z
Media
The photos used in this site were obtained from ...
Acknowledgements
I received inspiration for this project from X