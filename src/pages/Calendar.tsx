import 'reactjs-popup/dist/index.css'; // Import CSS for pop-up
//import CalendarView from './Calendar/views/Calendar';
import "../App.css"
import React, { useState } from 'react';
import List from './Calendar/components/List';
import Table from './Calendar/components/Table';
import EcamCourse from './Calendar/models/EcamCourse';
import {
// Import date-fns functions for date manipulation
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isWithinInterval,
  addHours,
  startOfMonth,
  endOfMonth,
} from 'date-fns';


// You can make a list of "EcamCourse" if you want to test the calendar with many courses
// Be aware to modify './Calendar/views/DayColumn.tsx' with a loop to go through all courses

function Calendar() {
  // state variable selectedDate that saves the selected date
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');


  // course example
  const courses: EcamCourse[] = [
    {// Array of course objects
      id: '1',
      groupId: '4MIN',
      starttime: new Date(2023, 11, 27, 11, 0),
      endtime: new Date(2023, 11, 27, 16, 0),
      local: '2D50',
      name: 'Software Architecture and Quality Lab',
      link: 'https://www.ecam.be/cursus-informatique/',
      description: 'Laboratory during the student can implement a website',
      teacherName: 'LOUIS Jean-Guillaume',
      tacherEmail: 'crt@ecam.be',
      labo: false,
    },
    {
      id: '2',
      groupId: '4MIN',
      starttime: new Date(2023, 11, 29, 16, 0),
      endtime: new Date(2023, 11, 29, 17, 0),
      local: '2D50',
      name: 'Software Licences',
      link: 'https://www.ecam.be/cursus-informatique/',
      description: 'Laboratory to improve a website and its architecture',
      teacherName: 'LOUIS Jean-Guillaume',
      tacherEmail: 'crt@ecam.be',
      labo: false,
    },
    // Aggiungi altri eventi lezione se necessario
  ];

  // function that handles date modification
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // function that handles incrementing the date by one week with the button
  const handleIncrementWeek = () => {
    if (selectedDate) {
      const newDate = addDays(selectedDate, 7);
      setSelectedDate(newDate);
    }
  };

  // function that handles decrementing the date by one week with the button
  const handleDecrementWeek = () => {
    if (selectedDate) {
      const newDate = subDays(selectedDate, 7);
      setSelectedDate(newDate);
    }
  };

// Function to switch between week and month view modes
  const handleSwitchViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'week' ? 'month' : 'week'));
  };


  // Function to retrieve days of the week relative to the selected date
  const getWeekDays = (): Date[] => {
    if (selectedDate) {
      const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const endOfCurrentWeek = endOfWeek(selectedDate, { weekStartsOn: 1 });
      const daysOfWeek = eachDayOfInterval({ start: startOfCurrentWeek, end: endOfCurrentWeek });
      return daysOfWeek;
    }
    return [];
  };
// Function to retrieve days of the month
const getMonthDays = (): Date[][] => {
    const monthDays: Date[][] = [];
    const daysOfWeek = getWeekDays();

    let startOfMonth: Date | null = null;
    let endOfMonth: Date | null = null;

    if (selectedDate) {
      startOfMonth = startOfWeek(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1), { weekStartsOn: 1 });
      endOfMonth = endOfWeek(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0), { weekStartsOn: 1 });

      let currentDay = startOfMonth;
      while (currentDay && currentDay <= endOfMonth) {
        const week = daysOfWeek.map(() => {
          const day = currentDay;
          currentDay = addDays(currentDay!, 1);  // Adding "!" to indicate that currentDay is not null
          return day;
        });
        monthDays.push(week);
      }
    }

    return monthDays;
  };

  // function that returns the working hours of the day
  const getWorkHours = (): Date[] => {
    const workHours: Date[] = [];
    if (selectedDate) {
      for (let i = 8; i <= 19; i++) {
        workHours.push(addHours(selectedDate, i));
      }
    }
    return workHours;
  };

  const formatDay = (day: Date) => format(day, 'dd-MM-yyyy');



  const containerStyle = {
      fontFamily: 'Optima, sans-serif',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px',

      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      background: '#f7f7f7',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '20px',
      border: '1px solid white ',
  };
  const calendarStyle = {

      fontFamily: 'Optima, sans-serif',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px',
      //border: '1px solid #ccc',

      boxShadow: '0 0 1px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      //border: '500px solid blue navy',
  };
  const buttonStyle = {
      padding: '8px 16px',
      fontSize: '14px',
      cursor: 'pointer',

      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      marginRight: '10px',
  };
  const labelStyle = {
      fontSize: '16px',
      fontWeight: 'bold',
  };
  const headerStyle: React.CSSProperties = {
      fontFamily: 'Optima, sans-serif',
      background: '#007bff',
      color: '#fff',
      padding: '15px',
      borderRadius: '5px 5px 0 0',
      textAlign: 'center',
      fontSize: '24px',
  };
  const contentStyle = {
      fontFamily: 'Optima, sans-serif',
      background: '#fff',

      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };
  const footerStyle: React.CSSProperties = {
      fontFamily: 'Optima, sans-serif',
      background: '#007bff',
      color: '#fff',
      padding: '15px',
      borderRadius: '0 0 5px 5px',
      textAlign: 'center',
  };


  return (
     <>
       <div style={{ ...containerStyle, borderRadius: '5px'}}>
        <div style={headerStyle}>Calendar</div>
        <div style={{ ...contentStyle, borderRadius: '5px'}}>
         <label>Select a date:</label>
         <input
           type="date"
           value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
           onChange={(e) => handleDateChange(new Date(e.target.value))}
         />

         <button style={buttonStyle} onClick={handleIncrementWeek}>Next Week</button>
         <button style={buttonStyle} onClick={handleDecrementWeek}>Previous Week</button>
         <button style={buttonStyle} onClick={handleSwitchViewMode}>{viewMode === 'week' ? 'View Monthly' : 'View Weekly'}</button>

         <p>Selected date : {selectedDate ? format(selectedDate, 'dd-MM-yyyy') : 'No date selected'}</p>
{/* Display weekly or monthly view based on the selected mode */}
         {selectedDate && (
           <>
             {viewMode === 'week' && (
                <div style={{ borderRadius: '5px', overflow: 'hidden' }}>

                   <Table
                     getWeekDays={getWeekDays}
                     getWorkHours={getWorkHours}
                     courses={courses}
                   />
                </div>
             )}
             {viewMode === 'month' && (
               <>
                 <p>Days of the month:</p>
                 <table style={{ borderCollapse: 'collapse', borderRadius: '5px', tableLayout: 'fixed', width: '100%', overflow: 'hidden' }}>
                   <thead>
                     <tr>
                       {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                         <th key={day} className="headerCell" style={{ border: '3px ridge #007bff',  padding: '15px' }}>
                           {day}
                         </th>
                       ))}
                     </tr>
                   </thead>
                   <tbody>
                     {getMonthDays().map((week, weekIndex) => (
                       <tr key={weekIndex} style={{ border: '3px ridge #007bff', borderRadius:'5px' }}>
                         {week.map((day) => (
                           <td
                             key={day.getTime()}
                             className={selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ? 'selectedDay' : ''}
                             style={{
                               border: '3px ridge #007bff',
                             }}
                           >
                             {formatDay(day)}
                             <br />
                             {courses
                               .filter(
                                 (course) =>
                                   format(day, 'yyyy-MM-dd') === format(course.starttime, 'yyyy-MM-dd')

                               )
                               .map((course) => (
                                 <div key={course.id}>
                                   <strong>{course.name}</strong>
                                   <br />
                                   {`${format(course.starttime, 'HH:mm')} - ${format(course.endtime, 'HH:mm')}`}
                                   <br />
                                   {`Teacher: ${course.teacherName}`}
                                   <br />
                                   {`Location: ${course.local}`}
                                 </div>
                               ))}
                           </td>
                         ))}
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </>
             )}
           </>
         )}
         <div>


           <List
             getWeekDays={getWeekDays}
             courses={courses} />

         </div>
         </div>
         <div style={footerStyle}>
                 © 2023 Your Calendar App. All rights reserved.
         </div>
       </div>
     </>
   );
 }

 //export default CalendarPage;
 export default Calendar;
