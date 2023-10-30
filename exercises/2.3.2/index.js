const colorDiv = document.querySelectorAll('.color-div');

colorDiv.forEach((item) => {
    item.addEventListener('click', (e) => {
        if (e.target.style.height === "100px") {
            e.target.innerText = "";
            e.target.style.width = "50px";
            e.target.style.height = "50px";
        } else {
            e.target.innerText = e.target.style.backgroundColor;
            e.target.style.width = "100px";
            e.target.style.height = "100px";
        }
    });
})
