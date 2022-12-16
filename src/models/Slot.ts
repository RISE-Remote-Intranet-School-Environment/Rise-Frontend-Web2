export default class Slot {
    teacher_name: string;
    course: string;
    room: string;
    time: string;
    session: number;

    constructor(name: string, course: string, room: string, time: string, session: number) {
        this.teacher_name = name;
        this.course = course;
        this.room = room;
        this.time = time;
        this.session = session;
    }
}