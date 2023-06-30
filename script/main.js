const panel = document.querySelector(".panel");
const panel_li = panel.querySelectorAll("li");
const panel_li_arr = Array.from(panel_li);
const len = panel_li.length;
const btnUp = document.querySelector(".btnUp");
const btnDown = document.querySelector(".btnDown");

function splitTxt(el) {
    const txt = el.textContent;
    /*
    textContent vs innerText
    textContent: 요소의 모든 텍스트 content를 가져온다
    innerText: 텍스트를 가져오긴 하지만
    CSS 또는 JS로 숨겨지거나 훼손되면 가져오지 못한다

    예) 어떤 요소를 display: none;을 하면
    innerText로는 가져올 수 없지만 textContent로는 가져올 수 있다
    */
    const fragment = document.createDocumentFragment();
    /*
        DocumentFragement: DOM 조작을 메모리상에서 수행하는 method;
        메모리에서만 DOM을 구성하고 실제로는 한 번만 DOM에 삽입한다
        (성능 개선)
    */
    let num = 0;
    for (let el of txt) {
        let span = document.createElement("span");
        span.style.transitionDelay = `${0.1 * num++}s`
        span.textContent = el;
        fragment.appendChild(span);
    }
    el.innerHTML = "";
    el.appendChild(fragment);
}