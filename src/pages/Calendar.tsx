import React from 'react';

import CalendarView from './Calendar/views/Calendar';
import EcamCourse from './Calendar/models/EcamCourse';

// You can make a list of "EcamCourse" if you want to test the calendar with many courses
// Be aware to modify './Calendar/views/DayColumn.tsx' with a loop to go through all courses
const course: EcamCourse = {
         id: "1",
        groupId: "4MIN",
        starttime: new Date(2022, 11, 5, 12, 45, 0, 0),
        endtime: new Date(2022, 11, 5, 16, 15, 0, 0),
        local: "2D50",
        name: "Software Architecture and Quality Lab",
        link: "https://www.ecam.be/cursus-informatique/",
        description: "Laboratory during the student can implementation a website",
        teacherName: "LOUIS Jean-Guillaume",
        tacherEmail: "crt@ecam.be",
        labo: false
}

export interface ICalendarPageProps{}

const CalendarPage: React.FunctionComponent<ICalendarPageProps> = (props) => {
    return (
        <div>
            {/* <p>This is Calendar Page</p> */}
            <CalendarView courses={[course]}/>
        </div>
    )
}

export default CalendarPage;