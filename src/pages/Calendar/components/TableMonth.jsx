import { format } from 'date-fns';
import "../../../App.css";

function TableMouth({ getMonthDays, courses, selectedDate }) {
    return (
        <>
            <table style={{ borderCollapse: 'collapse', border: '1px solid black', tableLayout: 'fixed', width: '100%' }}>
                <thead>
                    <tr>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <th key={day} className="headerCell" style={{ border: '1px solid black', padding: '10px' }}>
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {getMonthDays().map((week, weekIndex) => (
                        <tr key={weekIndex} style={{ border: '1px solid black' }}>
                            {week.map((day) => (
                                <td
                                    key={day.getTime()}
                                    className={`${
                                        selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ? 'selectedDay' : ''
                                      } ${format(day, 'MM') !== format(selectedDate, 'MM') ? 'otherMonthDay' : ''}`}
                                    style={{
                                        border: '1px solid black',
                                        height: '50px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {format(day, 'dd')}
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
    );
}

export default TableMouth;