/**
 * Interface used to define fields who describe an ECAM course
 */
interface EcamCourse {
    id: string; // unique Id to identifie each course into the calendar
    groupId: string; // student's choice of studies
    starttime: Date;
    endtime: Date;
    local: string;
    name: string; // Course's name
    description?: string; // Course's description
    teacherName?: string;
    labo?: boolean; // If the course is a lab
}

export default EcamCourse;