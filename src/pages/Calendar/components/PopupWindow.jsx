import './PopupWindow.css';

function PopupWindow ({course}) {
    return (
        <div>
            <h1>Info</h1>
            <table id='popup'>
                <tbody>
                    <tr>
                        <td className='ref'>Name of the course</td>
                        <td>{course?.name ?? "No name"}</td>
                    </tr>
                    <tr>
                        <td className='ref'>Professor</td>
                        <td>
                            {course?.teacherName ?? "/"} <br />
                            Mail: {course.tacherEmail ?? "/"}
                        </td>
                    </tr>
                    <tr>
                        <td className='ref'>Date and Time</td>
                        <td>{course?.starttime.toISOString().split('T')[0] ?? "/"} <br />
                            {course?.starttime.toLocaleTimeString().substring(0, course?.starttime.toLocaleTimeString().lastIndexOf(':'))}-
                            {course?.endtime.toLocaleTimeString().substring(0, course?.endtime.toLocaleTimeString().lastIndexOf(':'))}</td>
                    </tr>
                    <tr>
                        <td className='ref'>Classroom</td>
                        <td>{course?.local ?? "/"}</td>
                    </tr>
                    <tr>
                        <td className='ref'>Description</td>
                        <td>{course?.description ?? "/"}</td>
                    </tr>
                    <tr>
                        <td className='ref'>Link</td>
                        <td><a href={course?.link} title='Link of course'>{course?.link ?? "/"}</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PopupWindow