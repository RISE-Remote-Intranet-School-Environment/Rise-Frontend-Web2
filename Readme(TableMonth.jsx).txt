The TableMonth.jsx file contains a React functional component named TableMonth. This component renders a monthly view table for course schedules. It takes several props, including getMonthDays, courses, selectedDate, and selectionHandler.
The component generates a table layout to display course schedules on a month-based view. It populates the table cells with scheduled courses/events based on the provided data for each day of the month.

Props
_______
getMonthDays: A function returning a two-dimensional array of Date objects representing days of the month.
courses: An array of course/event objects containing details like ID, start/end times, name, location, etc.
selectedDate: A Date object representing the currently selected date.
selectionHandler: A function to handle the selection of a course/event.

Features
_________
Displays a table layout representing each day of the month and its scheduled courses.
Highlights the selected day and differentiates current month days from other months.
Provides interactive course/event buttons with details like course name, timings, and location.
Utilizes date-fns library for date formatting and comparison.

Functionality
______________
formatDay: Formats the day to 'dd/MM' format.
isCurrentMonth: Checks if a given day belongs to the current selected month.
handleClick: Handles the selection of a course/event when clicked.
