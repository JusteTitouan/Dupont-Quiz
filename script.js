const a = document.querySelectorAll(".question-item");
const cong = document.getElementById("alert");
cong.hidden = true;
cong.classList.add("wrong");

function updateSelected() {
    const l = document.querySelectorAll(".question-item label");
    for(const la of l) {
        if(la.children[0].checked)
            la.classList.add("selected");
        else
            la.classList.remove("selected");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let i = document.querySelectorAll(".question-item label > input");
    for(const input of i)
        input.checked = false;
    updateSelected();
});

document.addEventListener("click", updateSelected);

function result() {
    let {correct_nb, all_correct} = Array.from(a).reduce((prev, cur) => {
        let d = cur.querySelector("div");
        d.className = "";
        let right = true;
        if(
            Array.from(cur.querySelectorAll("label")).reduce((prev_, cur_) => {
                let input = cur_.querySelector("input");
                cur_.className = "";
                if(input.checked) {
                    if(input.value != "true")
                        cur_.classList.add("wrong");
                    else 
                        cur_.classList.add("right");
                    return prev_ && true;
                }
                if(input.value == "true")
                    return false;
                return prev_ && true;
        }, true)) {
            d.classList.add("right");
            prev['correct_nb']++;
        } else {
            d.classList.add("wrong");
            prev['all_correct'] = false;
        }
        return prev;
    }, {correct_nb: 0, all_correct: true});
    if(all_correct) {
        cong.classList.replace("wrong", "right");
        cong.hidden = false;
    } else {
        cong.classList.replace("right", "wrong");
        cong.hidden = true;
    }
}