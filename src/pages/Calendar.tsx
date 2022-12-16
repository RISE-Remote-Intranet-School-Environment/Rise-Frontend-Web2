import React from 'react';

import CalendarView from './Calendar/views/Calendar';
import EcamCourse from './Calendar/models/EcamCourse';

// You can make a list of "EcamCourse" if you want to test the calendar with many courses
// Be aware to modify './Calendar/views/DayColumn.tsx' with a loop to go through all courses
const course: EcamCourse = {
    id: "1",
    groupId: "3BE",
    starttime: new Date(2022, 11, 5, 12, 45, 0, 0),
    endtime: new Date(2022, 11, 5, 16, 15, 0, 0),
    local: "2E51",
    name: "Test",
    description: "Ceci est un test",
    teacherName: "Teacher",
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