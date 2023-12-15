# Desciption of Frontend code done on 15/12/2023 by:

Lorenzo Grassi 23606

Ghita Bennouna 18383

Edwin Creten 20220

Emene Abbah 17282

Yann De Middelaer 18281

Edouard de Schietere de Lophem 18072

In this repository you will find all the Front-End-Web part of the R.I.S.E. project for the course of Architecture and Software Quality at ECAM 
The previous version of the project that we inherited used the following technologies:

* Python.
* JavaScript with the Next.js and React framework.
* Npm.
  
We have observed that the configuration and launch of the project was very tedious and complicated. We have then decided to make the project easier to launch and easier to understand.

## HOW TO LAUNCH THE PROJECT (requires Npm):
Open a Cmd prompt in the project directory. (RFW in this case) Type following commands: 

### To install the dependencies:
* npm install

### To run the project:

* npm start

For this new version of the project, we decided to switch from JavaScript to TypeScript and to throw away Python. We used React to create and power our website. 
There is a lot of documentation and tutorials about it so if you need any help you can always browse the internet for help.

For the Menu part of the WebSite there are two main things we made:

A 'Navbar' component which is the menu on top of the website, in this Navbar are Links to the pages we created, we already have created all the Pages we should require for the project but if you want to add a page you need to create it in the pages folder and add a link in the links.json file. Then you need to route it by adding it’s route in to the App.tsx file. 

We also added a route to Home when clicking on the Logo Container and we defined a “default” route to the homepage for when the website is launched using npm start.

For the Login page we used an mui component, which is an online library where you can find components for your React application, and put it on the login page this will show you a form to login and the given username and password can be collected to send them the database and be compared to see if the user exists or not and then can login to it’s own version of the website with its own syllabus page etc... How to get started with MUI

On the HomePage there is just an image that gets shown because we didn’t know what to put here but if you want to make/design a homepage you just need to put your code in the Home.tsx file.

The Calendar page is a basic calendar page where a calendar get's shown and where you can add different events and show them.

The Syllabus page is meant to be a shop where students can buy their courses. Our pages is able to make students already choose which Syllabuses they want to buy and add them to a cart.

Points to improve and still to create:

-Grade page on the "Note" page there still needs to be an frontend created to show and display the different grades of a student.

-Forum page also needs to be created, there needs to be communication with the student help team to know what they want to implement and how they see their forum page to implement the different widgets they want.

-Implement the Back-End API's from the other groups to the already existing pages (User-Management,Calendar,Syllabus) and see what they want to add or change.

## Display React app

This project was bootstrapped with Create React App.

Available Scripts

### In the project directory, you can run:

* npm start

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

* npm test

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

* npm run build

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

* npm run eject

Note: this is a one-way operation. Once you eject, you can’t go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Calendar.tsx
This file contains a React component that implements a flexible calendar view allowing users to visualize courses/events either weekly or monthly.

The component leverages React state management using hooks (useState and useEffect) to handle the selected date, course selection, and view mode (week/month). It includes features for navigating through weeks and months, displaying course information, and allowing users to switch between weekly and monthly views.

The EcamCourse model represents individual courses/events, holding details such as ID, group ID, start/end times, location, name, description, teacher information, and whether it's a lab session.

N.B: in javascript wounting starts from 0, that's why the month 10 reprensents November for instance.
____________
### Dependencies
React and its hooks (useState, useEffect)

External libraries:
  reactjs-popup for displaying course details in a popup
  date-fns for date manipulation and formatting
____________
### Features
Dynamic switching between weekly and monthly views.

Navigation buttons for moving between weeks/months.

Date selection using an input field.

Popup window displaying detailed information for a selected course.

Responsive design for desktop and mobile views (switches between table and list view based on screen width).
____________
### Usage
Adjust the EcamCourse array (courses) within the component to test different courses/events.


## Table.jsx
The file contains a React functional component named Table, designed to display a schedule table for courses/events within a week view. This component takes three props: getWeekDays, getWorkHours, and courses.

The component generates a table layout with rows representing each hour of the work schedule and columns for each day of the week. It populates the table cells with scheduled courses/events based on the provided data.
____________
### Props
getWeekDays: A function returning an array of Date objects representing the days of the week.

getWorkHours: A function returning an array of Date objects representing working hours.

courses: An array of course/event objects containing details like ID, start/end times, name, teacher, and location.
____________
### Features
Generates a table layout to visualize course schedules for each hour and day of the week.

Displays course information within the table cells, including course name, timings, teacher name, and location.

Utilizes date-fns library for date formatting and manipulation.
_________________
### Functionality
formatDay: Formats the day to 'dd' format.

formatHour: Formats the hour to 'HH:mm' format.


## TableMonth.jsx
The file contains a React functional component named TableMonth. This component renders a monthly view table for course schedules. It takes several props, including getMonthDays, courses, selectedDate, and selectionHandler.

The component generates a table layout to display course schedules on a month-based view. It populates the table cells with scheduled courses/events based on the provided data for each day of the month.
________
### Props
getMonthDays: A function returning a two-dimensional array of Date objects representing days of the month.

courses: An array of course/event objects containing details like ID, start/end times, name, location, etc.

selectedDate: A Date object representing the currently selected date.

selectionHandler: A function to handle the selection of a course/event.
____________
### Features
Displays a table layout representing each day of the month and its scheduled courses.

Highlights the selected day and differentiates current month days from other months.

Provides interactive course/event buttons with details like course name, timings, and location.

Utilizes date-fns library for date formatting and comparison.
______________
### Functionality

formatDay: Formats the day to 'dd/MM' format.
isCurrentMonth: Checks if a given day belongs to the current selected month.

The front end of the Calendar microservice utilizes three main libraries:

    'react'
    'reactjs-popup'
    'date-fns'

If the project encounters any errors related to the reading of these libraries, our advice is to try running the following commands in the terminal:

    npm i
    npm install reactjs-popup
    npm install date-fns

The code for the front end of the calendar microservice is distributed as follows.

## CALENDAR.TSX
This file represents a kind of 'main' for our code.

Within it, the four states of our code are specified:

    selectedDate: manages the user's selection of the date
    selectedCourse: manages the selection of the course for which the PopUp window is to be displayed
    viewMode: manages the switch between WeekTable and MonthTable
    windowWidth: manages the width of the display window
_____
The functions defined in this file are:
    handleDateChange: manages the change of the selected date
    handleSelection: manages the change of the selected course
    handleClosedPopup: manages the closure of the PopUp window
    handleIncrementWeek: manages the increment of the selected date by one week through the corresponding button
    handleDecrementWeek: manages the decrement of the selected date by one week through the corresponding button
    handleIncrementMonth: manages the increment of the selected date by one month through the corresponding button
    handleDecrementMonth: manages the decrement of the selected date by one month through the corresponding button
    handleSwitchViewMode: manages the switch between WeekTable and MonthTable
    getWeekDay: returns the other days of the week relative to the selected day
    getMonthDays: returns the other days of the month relative to the selected day
    getWorkHours: returns an array containing all the hours from 8:00 to 20:00
______

## TableWeek.jsx
In this file, we find the definition of the WeekTable.
_____
## PopupWindow.jsx
In this file, we find the definition of the table displayed in the PopupWindow.
_____
## List.jsx
In this file, we find the definition of the list displayed when the window width is less than 700px. The list consists of a list of Card components.
____
## Card.jsx
In this file, we find the definition of the Card element. The attributes displayed on the screen for each course are then specified.
handleClick: Handles the selection of a course/event when clicked.
______
# Possible future improvements:
* Connect both the frontend and backend to display the courses directly from database
* Add a Year view to filter courses by year
* Possibility to add a course to an empty cell
* How to refresh the page automatically when then backend has been modified
______
## Learn more
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.
