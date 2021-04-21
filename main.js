// let button = document.querySelector("button").addEventListener("click", load)
// load()
// function load() {
//   fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
//     .then((response) => response.json())
//     .then((list) => {
//       console.log(list);
//       let $inputList = document.createElement("input");
//       $inputList.setAttribute("list", "currency");
//       $inputList.setAttribute("type", "text");
//       let $dataList = document.createElement("datalist");
//       $dataList.setAttribute("id", "currency");
//       for (let i = 0; i < list.length; i++) {
//         let $option = document.createElement("option");
//         Object.assign($option, {
//           value: list[i].txt,
//         });
//         $option.setAttribute("data-cc", list[i].cc);
//         $option.setAttribute("data-rate", list[i].rate);
//         $dataList.appendChild($option);
//       }
//       document.body.append($inputList, $dataList);
//     });
// }
function load() {
  fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
    .then((response) => response.json())
    .then((list) => {
      let rate1 = "1";
      let rate2 = "1";
      let elem1
      let elem2
      for (let i = 0; i < list.length; i++) {
        let $option = document.createElement("option");
        $option.setAttribute("value", `${list[i].cc}  ${list[i].txt}`);
        $option.setAttribute("data-cc", list[i].cc);
        $option.setAttribute("data-rate", list[i].rate);
        currency.appendChild($option);
      }
      currency1.addEventListener("input", (event) => {
         elem1 = document.querySelector(
          `datalist option[value="${event.target.value}"]`
        );
        if (elem1 && elem2) {
          rate1 = elem1.dataset.rate;
          if (rate2 == rate1) {
            curr1.textContent = `${rate1} ${elem1.dataset.cc}`;
            curr2.textContent = `${rate2} ${elem2.dataset.cc}`;
          }
          if (rate1 > rate2) {
            curr1.textContent = `${1} ${elem1.dataset.cc}`;
            curr2.textContent = `${rate1} ${elem2.dataset.cc}`;
          } else {
            curr1.textContent = `${rate2} ${elem1.dataset.cc}`;
            curr2.textContent = `${1} ${elem2.dataset.cc}`;
          }
        }
      });
      currency2.addEventListener("input", (event) => {
         elem2 = document.querySelector(
          `datalist option[value="${event.target.value}"]`
        );
        if (elem1 && elem2) {
          rate2 = elem2.dataset.rate;
          if (rate2 == rate1) {
            curr1.textContent = `${rate1} ${elem1.dataset.cc}`;
            curr2.textContent = `${rate2} ${elem2.dataset.cc}`;
          }
          if (rate1 > rate2) {
            curr1.textContent = `${1} ${elem1.dataset.cc}`;
            curr2.textContent = `${rate1} ${elem2.dataset.cc}`;
          } else {
            curr1.textContent = `${rate2} ${elem1.dataset.cc}`;
            curr2.textContent = `${1} ${elem2.dataset.cc}`;
          }
        }
      });
      currency_input.addEventListener("input", (event) => {
        currency_out.value = (currency_input.value * (rate1 / rate2)).toFixed(
          3
        );
      });
    });
}
load();
$p = document.querySelector("#text_content");
$p.textContent = `Курси валют станом на: ${new Date().toDateString()}`;
$p.style.fontWeight = "bold";
