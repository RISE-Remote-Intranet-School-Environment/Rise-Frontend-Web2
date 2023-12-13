import React from 'react';
import { format } from 'date-fns';

function Table({ getWeekDays, getWorkHours, courses }) {
    const formatDay = (day) => format(day, 'dd');
    const formatHour = (hour) => format(hour, 'HH:mm');
    const dayOfWeekBackground = {
            backgroundColor: 'LavenderBLush', // Set the background color here
            border: '3px ridge #007bff',

        };

    return (
        <div style={{ borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ border: '1px dotted #007bff', borderRadius: '5px' }}>
                <table
                    style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                    }}
                >
                <thead>
                    <tr>
                        <th style={{ border: '1px ridge white' }}></th>
                        {getWeekDays().map((day) => (
                            <th key={day.getTime()} style={{ border: '3px ridge #007bff', padding: '15px', ...dayOfWeekBackground,}}>
                                {`${format(day, 'eeee')} ${formatDay(day)} `}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {getWorkHours().map((hour) => (
                        <tr key={hour.getTime()} style={{ border: '3px ridge #007bff' }}>
                            <td style={{ border: '3px ridge #007bff' }}>{formatHour(hour)}</td>
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
            </div>
        </div>
    );
}

export default Table;