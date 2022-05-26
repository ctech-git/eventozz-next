
export const EventWarning = ({ color, text }) => {
    return (
        <div className="event-finish pt-100">
            <span
                style={{ color }}
            >{text}</span>
        </div>
    )
}