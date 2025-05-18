let c = document.querySelectorAll(".currency");
let btn = document.getElementById("btn");
let inn = document.querySelector(".input");
let res = document.getElementById("result");
let conttt = document.querySelector(".cont");
let hiddentext = document.getElementById("h-text");

fetch("https://api.frankfurter.dev/v1/currencies")
  .then((res) => res.json())
  .then((msg) => dropdown(msg));

function dropdown(msg) {
  //console.log( Object.entries(msg))
  let curr = Object.entries(msg);

  for (let i = 0; i < curr.length; i++) {
    let opt = `<option value="${curr[i][0]}">${curr[i][0]}</option>`;
    c[0].innerHTML += opt;
    c[1].innerHTML += opt;
  }
}

btn.addEventListener("click", () => {
  let cur1 = c[0].value;
  let cur2 = c[1].value;
  let inputval = parseFloat(inn.value);

  if (cur1 === cur2) {
    conttt.style.height = "300px";
    hiddentext.style.color = "red";
    hiddentext.innerHTML = "choose different currency";
  } else if (isNaN(inputval) || inputval <= 0) {
    hiddentext.innerHTML = "please enter valid amount";
    conttt.style.height = "300px";
    hiddentext.style.color = "red";
  } else {
    hiddentext.style.display="none"
    convert(cur1, cur2, inputval);
  }
});

function convert(cur1, cur2, inputval) {
  fetch(
    `https://api.frankfurter.dev/v1/latest?amount=${inputval}&from=${cur1}&to=${cur2}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      const convertedAmount = data.rates[cur2].toFixed(2);

      res.innerHTML = `${inputval} ${cur1} = ${convertedAmount} ${cur2}`;
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Conversion failed. Please try again.");
    });
}
