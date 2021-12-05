const container = document.getElementById("container"); // 1
const container2 = document.querySelector("container"); // 2
const lisecond = document.querySelectorAll("li.second"); // 3
const thirdliinol = document.querySelector("ol li.third"); // 4

// container.innerHTML = "Hello!"; // 5
const footer = document.querySelector(".footer"); 
footer.classList.add("main"); // 6
footer.classList.remove("main"); // 7

// 9
const newLi = document.createElement("li");
newLi.innerHTML = "four"; 

// 10
const ul = document.querySelector("ul");
ul.append(newLi);

// 11
const lis = document.querySelectorAll("ol li");
for (li of lis) { 
    li.style.backgroundColor = "green";;
}

// 12
footer.remove(); 