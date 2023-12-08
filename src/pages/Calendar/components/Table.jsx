import React from 'react';
import { format } from 'date-fns';

function Table({ getWeekDays, getWorkHours, courses }) {
    const formatDay = (day) => format(day, 'dd/MM/yyyy');
    const formatHour = (hour) => format(hour, 'HH:mm');

    return (
        <div>
            <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black' }}></th>
                        {getWeekDays().map((day) => (
                            <th key={day.getTime()} style={{ border: '1px solid black' }}>
                                {`${format(day, 'eeee')}: ${formatDay(day)} `}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {getWorkHours().map((hour) => (
                        <tr key={hour.getTime()} style={{ border: '1px solid black' }}>
                            <td style={{ border: '1px solid black' }}>{formatHour(hour)}</td>
                            {getWeekDays().map((day) => (
                                <td
                                    key={`${hour.getTime()}-${day.getTime()}`}
                                    style={{
                                        border: '1px solid black',
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
    );
}

export default Table;