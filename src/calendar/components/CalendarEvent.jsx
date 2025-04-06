

export const CalendarEvent = ({ event }) => {

    const { title, user } = event;

    return (
        <>
            <div className="d-flex flex-column w-100 ">
                <strong className="capitalize">{title}</strong>
                <strong className="capitalize">{user.name}</strong>
            </div>
        </>
    )

}