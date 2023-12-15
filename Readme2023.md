# Desciption of Calendar code done on 15/12/2023 by:

Lorenzo Grassi

Ghita Bennouna

Edwin Creten

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
