import React from 'react';
import { format } from 'date-fns';
import './CourseColor.css'
import './TableWeek.css';

// ... (altre importazioni rimangono invariate)

function TableWeek({ getWeekDays, getWorkHours, courses, selectionHandler }) {
    const formatDay = (day) => format(day, 'dd/MM');
    const formatHour = (hour) => format(hour, 'HH:mm');

    const handleClick = (course) => {
        selectionHandler(course);
    };

    return (
        <div>
            <table id='weektable' style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
                <thead>
                    <tr style={{ height: '30px', backgroundColor: 'rgb(198, 197, 197)' }}>
                        <th style={{ border: '1px solid black', width: '9%' }}></th>
                        {getWeekDays().map((day) => (
                            <th key={day.getTime()} style={{ border: '1px solid black', fontSize: '15px', width: '13%' }}>
                                {`${format(day, 'eeee')}: ${formatDay(day)} `}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {getWorkHours().map((hour) => (
                        <tr key={hour.getTime()} style={{ border: '1px solid black' }}>
                            <td style={{ border: '1px solid black', textAlign: 'center' }}>{formatHour(hour)}</td>
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
    );
}

export default TableWeek;
