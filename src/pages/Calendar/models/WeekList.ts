import EcamCourse from "./EcamCourse";

class WeekList {
    key: string;
    // Identifies the line number into the table
    timecode: number;
    // An array for each day
    monday: EcamCourse[] = [];
    tuesday: EcamCourse[] = [];
    wednesday: EcamCourse[] = [];
    thursday: EcamCourse[] = [];
    friday: EcamCourse[] = [];
    saturday: EcamCourse[] = [];
    sunday: EcamCourse[] = [];

    constructor(key: string, timecode: number) {
        this.key = key;
        this.timecode = timecode;
    }

    // Method used to retrieve the corresponded list with the day's name (in lowerCase string)
    getDay(day: string) {
        switch (day) {
            case "monday": return this.monday;
            case "tuesday": return this.tuesday;
            case "wednesday": return this.wednesday;
            case "thursday": return this.thursday;
            case "friday": return this.friday;
            case "saturday": return this.saturday;
            case "sunday": return this.sunday;
        
            default: return [];
        }
    }
}

export default WeekList;