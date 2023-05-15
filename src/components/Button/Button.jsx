import style from "./Button.module.css"

export const Button = ({ name, value, setSelected, backgroundColor }) => {
    return (
        <div
            className={`${style.Button} ${style[`Button__${backgroundColor}`]}`}
            value={value}
            onClick={() => setSelected(value)}
            >
            {name}
        </div>
    )
}
