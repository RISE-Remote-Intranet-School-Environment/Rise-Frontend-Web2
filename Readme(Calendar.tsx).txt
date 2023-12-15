Calendar.tsx

This file contains a React component that implements a flexible calendar view allowing users to visualize courses/events either weekly or monthly.
The component leverages React state management using hooks (useState and useEffect) to handle the selected date, course selection, and view mode (week/month). It includes features for navigating through weeks and months, displaying course information, and allowing users to switch between weekly and monthly views.
The EcamCourse model represents individual courses/events, holding details such as ID, group ID, start/end times, location, name, description, teacher information, and whether it's a lab session.

Dependencies
____________
React and its hooks (useState, useEffect)
External libraries:
  reactjs-popup for displaying course details in a popup
  date-fns for date manipulation and formatting

Features
___________
Dynamic switching between weekly and monthly views.
Navigation buttons for moving between weeks/months.
Date selection using an input field.
Popup window displaying detailed information for a selected course.
Responsive design for desktop and mobile views (switches between table and list view based on screen width).

Usage
_______
Adjust the EcamCourse array (courses) within the component to test different courses/events.
