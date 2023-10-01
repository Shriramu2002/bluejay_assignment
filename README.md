# Bluejay_assignment
This application takes a CSV file with a particular set of columns as input and outputs the employees,<br>
 **a)** Who has worked for 7 consecutive days.<br>
 **b)** Who have less than 10 hours of time between shifts but greater than 1 hour.<br>
 **c)** Who has worked for more than 14 hours in a single shift.

 ## Assumption taken
**1.**  The CSV file is sorted based on the 'Position ID' column.<br>
**2.**  If the 'Position ID' parameter is the same (same employee), then based on the 'Time' column.<br>
**3.**  So for a particular employee, the CSV file entries correspond to his/her sequential work history.<br>
**4.**  There are some entries where the 'Time OUT' parameter is missing, there I have considered its value as 'Time'.<br>
**5.**  Employees with a single entry with empty values in the 'Time' and 'Time Out' columns, have been neglected (as they have not even considered a single shift).

## Steps to install and use
All these steps are for linux based systems<br>
First, clone the repo from github,
```
git clone https://github.com/Shriramu2002/bluejay_assignment.git
```
Then copy the CSV files that are required to be analyzed into the csv_files directory in the cloned repo
### Using docker
If you have docker installed at your systems, navigate to the cloned reop and run,
```
docker build -t bluejayimg .
docker run --name bluejaycontainer -it --rm bluejayimg
analyze new Assignment_Timecard.csv
```
### Without using docker
First, ensure you have npm and node installed in your system, otherwise install them using [downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Then navigate to the clone repo and run,
```
npm install
npm link
```
Then check if the analyze bin is in working condition by running
```
analyze --help
```
If you can see the output, then run
```
analyze new Assignment_Timecard.csv
```


