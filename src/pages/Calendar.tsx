<<<<<<< HEAD
import React from 'react';

import 'reactjs-popup/dist/index.css';
import CalendarView from './Calendar/views/Calendar';
=======
import "../App.css"
import React, { useState } from 'react';
import List from './Calendar/components/List';
import Table from './Calendar/components/Table';
>>>>>>> b8a42d1c2332318b0fc8732072cd9f7b13e0fb06
import EcamCourse from './Calendar/models/EcamCourse';
import {
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

<<<<<<< HEAD
// You can make a list of "EcamCourse" if you want to test the calendar with many courses
// Be aware to modify './Calendar/views/DayColumn.tsx' with a loop to go through all courses
const course1: EcamCourse = {
    id: "1",
    groupId: "MA1",
    starttime: new Date(2022, 11, 5, 12, 45, 0, 0),
    endtime: new Date(2022, 11, 5, 16, 15, 0, 0),
    local: "2E51",
    name: "Algo",
    description: "Ceci est un cours",
    teacherName: "Teacher",
    labo: false
}
const course2: EcamCourse = {
    id: "2",
    groupId: "MA1",
    starttime: new Date(2022, 11, 5, 8, 0, 0, 0),
    endtime: new Date(2022, 11, 5, 10, 0, 0, 0),
    local: "2F51",
    name: "Progra parallele",
    description: "Ceci est un labo",
    teacherName: "Teacher",
    labo: true
}
const course3: EcamCourse = {
    id: "3",
    groupId: "MA1",
    starttime: new Date(2022, 11, 6, 10, 0, 0, 0),
    endtime: new Date(2022, 11, 6, 11, 0, 0, 0),
    local: "1G01",
    name: "DataBase",
    description: "Ceci est un labo",
    teacherName: "Teacher",
    labo: true
}
const course4: EcamCourse = {
    id: "4",
    groupId: "MA1",
    starttime: new Date(2022, 11, 8, 10, 0, 0, 0),
    endtime: new Date(2022, 11, 8, 11, 0, 0, 0),
    local: "1G01",
    name: "DataBase",
    description: "Ceci est un labo",
    teacherName: "Teacher",
    labo: true
}
const course5: EcamCourse = {
    id: "5",
    groupId: "MA1",
    starttime: new Date(2022, 11, 7, 12, 45, 0, 0),
    endtime: new Date(2022, 11, 7, 16, 15, 0, 0),
    local: "2E51",
    name: "Algo",
    description: "Ceci est un cours",
    teacherName: "Teacher",
    labo: false
}
const course6: EcamCourse = {
    id: "6",
    groupId: "MA1",
    starttime: new Date(2022, 11, 9, 8, 0, 0, 0),
    endtime: new Date(2022, 11, 9, 10, 0, 0, 0),
    local: "2F51",
    name: "Progra parallele",
    description: "Ceci est un labo",
    teacherName: "Teacher",
    labo: true
}
export interface ICalendarPageProps{}
=======
function Calendar() {
  // variabile di stato selectedDate che salva la data selezionata
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
>>>>>>> b8a42d1c2332318b0fc8732072cd9f7b13e0fb06

  // esempio di corso
  const courses: EcamCourse[] = [
    {
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
      description: 'Laboratory during the student can implement a website',
      teacherName: 'LOUIS Jean-Guillaume',
      tacherEmail: 'crt@ecam.be',
      labo: false,
    },
    // Aggiungi altri eventi lezione se necessario
  ];

  // funzione che si occupa della modifica della data
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // funzione che si occupa dell'incrementazione della data di una settimana con il bottone
  const handleIncrementWeek = () => {
    if (selectedDate) {
      const newDate = addDays(selectedDate, 7);
      setSelectedDate(newDate);
    }
  };

  // funzione che si occupa del decremento della data di una settimana con il bottone
  const handleDecrementWeek = () => {
    if (selectedDate) {
      const newDate = subDays(selectedDate, 7);
      setSelectedDate(newDate);
    }
  };


  const handleSwitchViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'week' ? 'month' : 'week'));
  };


  // funzione che mi permette di ottenere gli altri giorni della settimana rispetto al giorno selezionato
  const getWeekDays = (): Date[] => {
    if (selectedDate) {
      const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const endOfCurrentWeek = endOfWeek(selectedDate, { weekStartsOn: 1 });
      const daysOfWeek = eachDayOfInterval({ start: startOfCurrentWeek, end: endOfCurrentWeek });
      return daysOfWeek;
    }
    return [];
  };

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
          currentDay = addDays(currentDay!, 1);  // Ajout du "!" pour indiquer que currentDay n'est pas null
          return day;
        });
        monthDays.push(week);
      }
    }

    return monthDays;
  };

  // funzione che mi restituisce le ore lavorative del giorno
  const getWorkHours = (): Date[] => {
    const workHours: Date[] = [];
    if (selectedDate) {
      for (let i = 8; i <= 19; i++) {
        workHours.push(addHours(selectedDate, i));
      }
    }
    return workHours;
  };

  const formatDay = (day: Date) => format(day, 'dd/MM/yyyy');
  

  return (
    <>
      <div>
        <label>Seleziona una data:</label>
        <input
          type="date"
          value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
        />

        <button onClick={handleIncrementWeek}>Aumenta di una settimana</button>
        <button onClick={handleDecrementWeek}>Diminuisci di una settimana</button>
        <button onClick={handleSwitchViewMode}>{viewMode === 'week' ? 'View Monthly' : 'View Weekly'}</button>

        <p>Data selezionata: {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Nessuna data selezionata'}</p>

        {selectedDate && (
          <>
            {viewMode === 'week' && (
              <Table
                getWeekDays={getWeekDays}
                getWorkHours={getWorkHours}
                courses={courses}
              />
            )}
            {viewMode === 'month' && (
              <>
                <p>Altri giorni del mese:</p>
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
                            className={selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ? 'selectedDay' : ''}
                            style={{
                              border: '1px solid black',
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
<<<<<<< HEAD
            {/* <p>This is Calendar Page</p> */}
            <CalendarView courses={[course1,course2,course3,course4,course5,course6]}/>
=======
          <List
            getWeekDays={getWeekDays}
            courses={courses} />
>>>>>>> b8a42d1c2332318b0fc8732072cd9f7b13e0fb06
        </div>
      </div>
    </>
  );
}

<<<<<<< HEAD

export default CalendarPage;
=======
export default Calendar;
>>>>>>> b8a42d1c2332318b0fc8732072cd9f7b13e0fb06
