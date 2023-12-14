// Import React and necessary date formatting utility from date-fns
import React from 'react';
import { format } from 'date-fns';
import './CourseColor.css'
import './TableWeek.css';

// Define a functional component named Table which takes three props: getWeekDays, getWorkHours, and courses
function TableWeek({ getWeekDays, getWorkHours, courses, selectionHandler }) {
    // Define a function to format the day to 'dd' format
    const formatDay = (day) => format(day, 'dd');
    // Define a function to format the hour to 'HH:mm' format
    const formatHour = (hour) => format(hour, 'HH:mm');
    // Define styles for the background of days of the week
    const dayOfWeekBackground = {
        backgroundColor: 'LavenderBlush', // Background color
        border: '3px ridge #007bff', // Border style

    };
    // Function for the PopUp view 
    const handleClick = (course) => {
        selectionHandler(course);
    };
    // Return JSX that represents a table with rows and columns for scheduling courses
    return (
        <div style={{ borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ border: '1px dotted #007bff', borderRadius: '5px' }}>
                <table id='weektable' style={{
                    borderCollapse: 'collapse',
                    width: '100%',
                    tableLayout: 'fixed' // Set table layout as fixed
                }}>
                    <thead>
                        <tr style={{ height: '30px' }}>
                            <th style={{ border: '1px ridge white', width: '50px' }}></th>
                            {getWeekDays().map((day) => (
                                <th key={day.getTime()}
                                style={{ border: '3px ridge #007bff', padding: '15px', ...dayOfWeekBackground, }}>
                                    {`${format(day, 'eeee')}: ${formatDay(day)} `}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {getWorkHours().map((hour) => (
                            <tr key={hour.getTime()} style={{ border: '3px ridge #007bff' }}>
                                <td style={{ border: '3px ridge #007bff', textAlign: 'center' }}>{formatHour(hour)}</td>
                                {getWeekDays().map((day) => (
                                    <td
                                        key={`${hour.getTime()}-${day.getTime()}`}
                                        style={{
                                            border: '3px ridge #007bff',
                                        }}
                                    >
                                        {courses
                                            .filter(
                                                (course) =>
                                                    format(day, 'yyyy-MM-dd') === format(course.starttime, 'yyyy-MM-dd') &&
                                                    hour.getHours() === course.starttime.getHours()
                                            )
                                            .map((course) => {
                                                let start_minutes = course.starttime.getMinutes();
                                                let end_minutes = course.endtime.getMinutes();
                                                let length = course.endtime.getHours() - course.starttime.getHours() + (end_minutes - start_minutes) / 60;
                                                const buttonHeight = length * 72;

                                                return (
                                                    <div key={course.id} className='container'>
                                                        <button
                                                            id='button'
                                                            className={'event ' + course.groupId.substring(1)}
                                                            style={{
                                                                height: buttonHeight + 'px',
                                                                top: (start_minutes * 100) / 60 + '%',
                                                                borderRadius: '4px'
                                                            }}
                                                            onClick={() => handleClick(course)}
                                                        >
                                                            <div className='description'>
                                                                <h4> {course.name} </h4>
                                                                <p>
                                                                    {course?.starttime.toLocaleTimeString().substring(0, course?.starttime.toLocaleTimeString().lastIndexOf(':'))}-
                                                                    {course?.endtime.toLocaleTimeString().substring(0, course?.endtime.toLocaleTimeString().lastIndexOf(':'))} <br />
                                                                    {course.local}
                                                                </p>
                                                            </div>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableWeek;
