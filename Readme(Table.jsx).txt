The Table.jsx file contains a React functional component named Table, designed to display a schedule table for courses/events within a week view. This component takes three props: getWeekDays, getWorkHours, and courses.
The component generates a table layout with rows representing each hour of the work schedule and columns for each day of the week. It populates the table cells with scheduled courses/events based on the provided data.

Props
______
getWeekDays: A function returning an array of Date objects representing the days of the week.
getWorkHours: A function returning an array of Date objects representing working hours.
courses: An array of course/event objects containing details like ID, start/end times, name, teacher, and location.

Features
__________
Generates a table layout to visualize course schedules for each hour and day of the week.
Displays course information within the table cells, including course name, timings, teacher name, and location.
Utilizes date-fns library for date formatting and manipulation.

Functionality
_______________
formatDay: Formats the day to 'dd' format.
formatHour: Formats the hour to 'HH:mm' format.
