import {format} from 'date-fns';
import Card from './Card';
function List({getWeekDays, courses}) {
    return (
        <div>
            {getWeekDays().map((day) => (
                <div key={`${format(day, 'yyyy/MM/dd')}`}>
                    {courses
                        .filter(
                            (course) =>
                                format(day, 'yyyy-MM-dd') === format(course.starttime, 'yyyy-MM-dd')
                        )
                        .map((course) => (
                            <Card
                                key={course.id}
                                name={course.name}
                                starttime={course.starttime}
                                endtime={course.endtime}
                                teacherName={course.teacherName}
                                local={course.local} />
                        ))}
                </div>
            ))}
        </div>
    );
}

export default List;