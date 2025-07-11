
import "./ErrorContainer.scss"

export const ErrorContainer = ({ message }) => {
    return (
        <p className="error">{message}</p>
    )
}
