import React from 'react';
import { format, isSameMonth, isSameDay } from 'date-fns';
import './TableMonth.css'; // Assurez-vous d'importer votre fichier CSS

function TableMonth({ getMonthDays, courses, selectedDate, selectionHandler }) {
  const formatDay = (day) => format(day, 'dd/MM');
  const isCurrentMonth = (day) => isSameMonth(day, selectedDate);

  const handleClick = (course) => {
    selectionHandler(course);
  };

  return (
    <div>
      <table
        id="monthtable"
        className="month-table" // Ajoutez cette classe pour appliquer les styles CSS
        style={{ borderCollapse: 'collapse', border: '1px solid black', width: '100%' }}
      >
        <thead>
          <tr style={{ height: '30px', backgroundColor: 'rgb(198, 197, 197)' }}>
            {getMonthDays()[0].map((day) => (
              <th
                key={day.getTime()}
                className={`headerCell ${isSameDay(day, selectedDate) ? 'selectedDay' : ''}`}

                style={{
                  border: '1px solid black',
                  fontSize: '15px',
                  width: '13%',
                }}
              >
                {format(day, 'eeee')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getMonthDays().map((week, index) => (
            <tr key={index} style={{ border: '1px solid black' }}>
              {week.map((day) => (
                <td
                  key={day.getTime()}
                  className={`${
                    !isCurrentMonth(day) ? 'otherMonthDay' : ''
                  } ${isSameDay(day, selectedDate) ? 'selectedDay' : ''}`}
                  style={{
                    border: '1px solid black',
                    verticalAlign: 'top',
                    position: 'relative',
                    height: '100px',
                  }}
                >
                  <div>
                    <div style={{ marginBottom: '5px' }}>{formatDay(day)}</div>
                    {courses
                      .filter((course) => format(day, 'yyyy-MM-dd') === format(course.starttime, 'yyyy-MM-dd'))
                      .map((course) => (
                        <div key={course.id} className="container">
                          <button
                            id="button"
                            className={`event ${course.groupId.substring(1)}`}
                            style={{
                              height: '100%',
                              borderRadius: '4px',
                            }}
                            onClick={() => handleClick(course)}
                          >
                            <div className="description">
                              <h4> {course.name} </h4>
                              <p>
                                {course?.starttime.toLocaleTimeString().substring(0, course?.starttime.toLocaleTimeString().lastIndexOf(':'))}-
                                {course?.endtime.toLocaleTimeString().substring(0, course?.endtime.toLocaleTimeString().lastIndexOf(':'))} <br />
                                {course.local}
                              </p>
                            </div>
                          </button>
                        </div>
                      ))}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableMonth;
