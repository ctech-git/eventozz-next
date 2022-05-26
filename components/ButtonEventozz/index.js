
export const ButtonEventozz = ({backgroundColor='#001d4a', marginTop=0, callback = () => false, children}) => {
    return (
        <a className="default-btn tickets-button"
            style={{ backgroundColor, marginTop }}
            onClick={() => { callback('comprar') }}
        >
            {
                children
            }
        </a>
    )
}