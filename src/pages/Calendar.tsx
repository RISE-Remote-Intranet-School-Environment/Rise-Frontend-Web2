import React from 'react';

import CalendarView from './Calendar/views/Calendar';
import EcamCourse from './Calendar/models/EcamCourse';

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

const CalendarPage: React.FunctionComponent<ICalendarPageProps> = (props) => {
    return (
        <div>
            {/* <p>This is Calendar Page</p> */}
            <CalendarView courses={[course1,course2,course3,course4,course5,course6]}/>
        </div>
    )
}

export default CalendarPage;