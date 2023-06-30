const panel = document.querySelector(".panel");
const panel_li = panel.querySelectorAll("li");
const panel_li_arr = Array.from(panel_li);
const len = panel_li.length;
const btnUp = document.querySelector(".btnUp");
const btnDown = document.querySelector(".btnDown");

panel_li.forEach((el) => { splitTxt(el.querySelector("h2")) });
// panel_li에 반복을 돌면서 각각의 li에 반복적으로 splitTxt 함수 적용
// splitTxt 함수의 인수로 반복을 돌고있는 panel li 안에
// h2 태그를 찾아서 인수로 넣는다

btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);

function moveUp() {
    // on class가 붙은 대상을 panel에서 찾는다
    const current_item = panel.querySelector(".on");
    const current_index = panel_li_arr.indexOf(current_item);
    const delay = 600;
    // 찾은 그 대상의 index를 구한다
    // (indexOf) => panel_li_arr

    // 다음은 슬라이드 index를 변수로 만들어서
    let next_index = null;
    // 조건문으로 다음 index가 어떤 값이 될지
    // 순환을 시킨다 (index = 2이면 0, 아니면 +1)
    if (current_index !== len - 1) {
        next_index = current_index + 1;
    } else {
        next_index = 0;
    }
    // 위의 것이 가독성, 확장성, 유지보수성이 더 좋다
    // current_index !== len - 1 ? next_index = current_index + 1 : next_index = 0;
    current_item.classList.remove("on");
    // 현재 li에 on을 지운다
    current_item.classList.add("up");
    // 그리고 on을 지운 현재 li에 up class를 붙여 위로 올라가는
    // 효과를 가지도록 한다
    panel_li[next_index].classList.add("down");
    // 그리고 next_index에 해당하는 li에 down이라는 class를 붙인다 (일시적)

    // delay 시간 뒤에 함수 안의 내용을 실행한다
    setTimeout(() => {
        panel_li[next_index].classList.remove("down");
        // down class를 지운다
        panel_li[next_index].classList.add("on");
        // 동시에 on을 붙여서 before, after로 나누었던
        // li를 붙여지는 모션을 보여준다
        panel.querySelector(".up").classList.remove("up");
        // 동시에 이전에 활성화되었던 current_item에 붙인
        // up 클래스를 지운다
    }, delay);
}

function moveDown() {
    const current_item = panel.querySelector(".on");
    const current_index = panel_li_arr.indexOf(current_item);
    const delay = 600;

    let prev_index = null;

    if (current_index !== 0) {
        prev_index = current_index - 1;
    } else {
        prev_index = len - 1;
    }

    current_item.classList.remove("on");
    current_item.classList.add("down");
    panel_li[prev_index].classList.add("up");

    setTimeout(() => {
        panel_li[prev_index].classList.remove("up");
        panel_li[prev_index].classList.add("on");
        panel.querySelector(".down").classList.remove("down");
    }, delay);
}

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

    /*
    innerHTML: 요소 내부 HTML을 조작하는 속성
    신뢰할 수 없는 데이터를 innerHTML에 직접 삽입하면 문제가 된다

    하지만 메모리상에서 만들고 HTML에 직접 삽입해야 할 때는
    innerHTML 외에는 다른 방법이 없다
    */
}