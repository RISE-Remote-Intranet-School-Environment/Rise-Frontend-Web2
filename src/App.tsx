import React from 'react';
import logo from './logo.svg';
import './App.css';
import {add} from 'date-fns';

import {
  WeeklyCalendar,
} from 'antd-weekly-calendar';
import CalendarView from './Calendar/views/Calendar';
import EcamCourse from './Calendar/models/EcamCourse';

const event = {
  eventId: '12',
  startTime: add(new Date(), { days: 1 }),
  endTime: add(new Date(), { days: 1, hours: 0.5 }),
  title: 'test event',
};

const coloredEvent = {
  eventId: '123',
  // startTime: add(new Date(), { days: 1 }),
  startTime: add(new Date(), { days: -1, hours: 1 }),
  // endTime: add(new Date(), { days: 1, hours: 2 }),
  endTime: add(new Date(), { days: -1, hours: 4 }),
  title: 'another test event',
  backgroundColor: 'green',
};

// const events = [
//   { eventId: "1", startTime: new Date(2022, 11, 14, 12, 0, 0), endTime: new Date(2022, 11, 14, 14, 30, 0), title: 'Ap. 1', backgroundColor: 'red' },
//   { eventId: "2", startTime: new Date(2022, 11, 18, 10, 0, 0), endTime: new Date(2022, 11, 25, 17, 15, 0), title: 'Ap. 1' },
// ];

const course: EcamCourse = {
  id: "1",
  groupId: "3BE",
  starttime: new Date(2022, 11, 5, 16, 30, 0, 0),
  endtime: new Date(2022, 11, 5, 16, 45, 0, 0),
  local: "2E51",
  name: "Test",
  description: "Ceci est un test",
  labo: false
}

function MyCalendar() {
  return (
    <>
      <WeeklyCalendar
        events={[event, coloredEvent]}
        weekends={true}
        onEventClick={(event) => console.log(event)}
        onSelectDate={(date) => console.log(date)}
      />
    </>
  );
}

function App() {
  return (
    <>
      <CalendarView courses={[course]}/>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
