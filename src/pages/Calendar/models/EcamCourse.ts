interface EcamCourse {
    id: string; // id unique
    groupId: string; // Série ou demi-série d'étudiants
    starttime: Date;
    endtime: Date;
    local: string;
    name: string; // Nom du cours
    description: string; // Description du cours
    labo: boolean; // Si le cours est un labo
}

export default EcamCourse;