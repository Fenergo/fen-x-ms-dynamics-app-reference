
export function FieldStyles(isReadOnly: boolean | undefined) {
    // base style
    const TextAreaStyles = {
        width: 285,
        fontWeight: 600,
        color: "rgb(0, 0, 0)",
        border: "1px solid transparent"
    }

    // readonly style
    const HoverBorderStyle = ( isReadOnly ? {} : {
        selectors: {
            ':hover': {
                border: "1px solid black"
            },
            ':focus::placeholder': {
                color: "transparent",
            }
        }
    })

    return {...TextAreaStyles, ...HoverBorderStyle}
} 


export function ComboBoxStyles(isReadOnly: boolean = false) {

    const TextAreaStyles = {
        width: 285,
        fontWeight: 600,
        color: "rgb(0, 0, 0)",
        border: "1px solid transparent"
    }

    const HoverBorderStyle = (isReadOnly ? {} : {
        selectors: {
            ':hover': {
                border: "1px solid rgb(0, 0, 0)"
            },
            ':focus::placeholder': {
                color: "transparent",
            },
            '.ms-ComboBox::after': {
                border: "1px none transparent"
            }
        }
    })

    return {...TextAreaStyles, ...HoverBorderStyle}
} 