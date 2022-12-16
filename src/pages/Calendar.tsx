import React from 'react';

import CalendarView from './Calendar/views/Calendar';
import EcamCourse from './Calendar/models/EcamCourse';

// J'ai créé un exemple de cours pour l'afficher sur le calendrier
// Libre à vous de le tester avec une liste plus fournie de cours
// La classe est définie dans "models/EcamCourse", comme précisée dans l'importation
const course: EcamCourse = {
    id: "1",
    groupId: "3BE",
    starttime: new Date(2022, 11, 5, 12, 45, 0, 0),
    endtime: new Date(2022, 11, 5, 16, 15, 0, 0),
    local: "2E51",
    name: "Test",
    description: "Ceci est un test",
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