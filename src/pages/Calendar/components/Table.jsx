// Import React and necessary date formatting utility from date-fns
import React from 'react';
import { format } from 'date-fns';

// Define a functional component named Table which takes three props: getWeekDays, getWorkHours, and courses
function Table({ getWeekDays, getWorkHours, courses }) {
    // Define a function to format the day to 'dd' format
    const formatDay = (day) => format(day, 'dd');
    
    // Define a function to format the hour to 'HH:mm' format
    const formatHour = (hour) => format(hour, 'HH:mm');
    
    // Define styles for the background of days of the week
    const dayOfWeekBackground = {
        backgroundColor: 'Lavender', // Background color
        border: '3px ridge Black', // Border style
    };

    // Return JSX that represents a table with rows and columns for scheduling courses
    return (
        <div style={{ borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ border: '1px dotted Black', borderRadius: '5px' }}>
                <table
                    style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        tableLayout: 'fixed' // Set table layout as fixed
                    }}
                >
                    <thead>
                        {/* Header row for the table */}
                        <tr>
                            {/* Empty cell for the time column */}
                            <th style={{ border: '1px ridge white', width: '50px' }}></th>
                            {/* Cells representing each day of the week */}
                            {getWeekDays().map((day) => (
                                <th
                                    key={day.getTime()}
                                    style={{ border: '3px ridge #000000', padding: '15px', ...dayOfWeekBackground }}
                                >
                                    {/* Display the full day name and date */}
                                    {`${format(day, 'eeee')} ${formatDay(day)} `}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Loop through each hour of the work schedule */}
                        {getWorkHours().map((hour) => (
                            <tr key={hour.getTime()} style={{ border: '3px ridge #000000' }}>
                                {/* Column for displaying hours */}
                                <td style={{ border: '3px ridge #000000' }}>{formatHour(hour)}</td>
                                {/* Loop through each day to display scheduled courses */}
                                {getWeekDays().map((day) => (
                                    <td
                                        key={`${hour.getTime()}-${day.getTime()}`}
                                        style={{
                                            border: '3px ridge #000000',
                                        }}
                                    >
                                        {/* Display courses scheduled for the specific hour and day */}
                                        {courses
                                            .filter(
                                                (course) =>
                                                    format(day, 'yyyy-MM-dd') === format(course.starttime, 'yyyy-MM-dd') &&
                                                    hour.getHours() === course.starttime.getHours()
                                            )
                                            .map((course) => (
                                                <div key={course.id}>
                                                    <strong>{course.name}</strong>
                                                    <br />
                                                    {/* Display course timings, teacher name, and location */}
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
            </div>
        </div>
    );
}

// Export the Table component as the default export
export default Table;
