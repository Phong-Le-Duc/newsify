import './_button.scss';

export default function Button(btnText, extraClass = "") {
    let buttonElm = document.createElement("button")
    buttonElm.className=`button ${extraClass}`.trim();

    buttonElm.innerText = `${btnText}`

    return buttonElm
}