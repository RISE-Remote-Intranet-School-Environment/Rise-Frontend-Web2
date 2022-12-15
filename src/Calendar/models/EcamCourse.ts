interface EcamCourse {
    id: string; // id unique
    groupId: string; // Série ou demi-série d'étudiants
    starttime: Date;
    endtime: Date;
    local: string;
    name: string;
    description: string;
    labo: boolean;
}

export default EcamCourse;