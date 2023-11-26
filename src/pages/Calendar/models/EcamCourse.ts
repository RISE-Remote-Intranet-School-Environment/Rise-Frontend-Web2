/*
    Interface used to define fields who describe an ECAM course
    Quando si definisce un oggetto si utilizza un'interfaccia.
 */
interface EcamCourse {
    id: string; // unique Id to identifie each course into the calendar
    groupId: string; // student's choice of studies
    starttime: Date;
    endtime: Date;
    local: string;
    name: string; // Course's name
    link?: string; // Course's link
    description?: string; // Course's description
    teacherName?: string;
    tacherEmail?: string;
    labo?: boolean; // If the course is a lab
}

export default EcamCourse;