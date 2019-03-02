
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
'Date': Displays Date of Call in the format 'dd-mm-yy'
'Station Area': Text field containing the Fire Station Areas where data was collected
'Desc_group': This field was derived from the 'Description' field contained in the original dataset to make the graphing process easier.
The field contains the Incident Type splits by 'Fire' or 'Special Service'.
'Desc_group_type': This field was derived from the 'Description' field. The original dataset used coded values that would not have been
descriptive enough to display on charts in the project. A lookup table that was provided with the dataset was used to create this field.
For example where the original data set would have used 'S/S GRDASS', this was captured in two fields 'Special Service', 'Garda Assistance'.
'TOC': Displayes the Time of Call in the format 'hh:mm:ss AM'
'Incident Counter': An integer field derived for graphing purposes.

The additional fields provided in the original dataset were not used in the project as they were deemed to be irrelevant
to the project or the data was of a poor quality with a lot of missing values contained in the recordset.




# # Features
* Three Drop down menus are displayed at the top of the dashboard. These enable the user to filter the data by 'Station Area',
'Incident type' and 'Year'.

Existing Features
Feature 1 - allows users X to achieve Y, by having them fill out Z
...
For some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

Features Left to Implement
Another feature idea
Technologies Used
In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

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