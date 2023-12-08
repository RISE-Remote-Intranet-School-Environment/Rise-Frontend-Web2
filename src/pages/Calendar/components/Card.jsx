import {format} from 'date-fns';
function Card({ name, starttime, endtime, teacherName, local}) {
    return (
        <div>
            <p>
                <strong>{name}</strong>
                <br />
                {`${format(starttime, 'dd/MM/yyyy')}`}
                <br />
                {`${format(starttime, 'HH:mm')} - ${format(endtime, 'HH:mm')}`}
                <br />
                {`Teacher: ${teacherName}`}
                <br />
                {`Location: ${local}`}
            </p>
        </div>
    );
}

export default Card;