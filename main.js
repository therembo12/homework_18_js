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
      let rate1 = 1;
      let rate2 = 1;
      for (let i = 0; i < list.length; i++) {
        let $option = document.createElement("option");
        $option.setAttribute("value", `${list[i].cc}  ${list[i].txt}`);
        $option.setAttribute("data-cc", list[i].cc);
        $option.setAttribute("data-rate", list[i].rate);
        currency.appendChild($option);
      }
      currency1.addEventListener("input", (event) => {
        let elem = document.querySelector(
          `datalist option[value="${event.target.value}"]`
        );
        if (elem) {
          rate1 = elem.dataset.rate;
        }
        curr1.textContent = `${rate2 / rate1} ${elem.dataset.cc}`;
        console.log(currency_input.value);
        console.log(currency_input.dataset.cc);

      });
      currency2.addEventListener("input", (event) => {
        let elem = document.querySelector(
          `datalist option[value="${event.target.value}"]`
        );
        if (elem) {
            rate2 = elem.dataset.rate;
          }
          curr2.textContent = `${(rate1 / rate2).toFixed(3)} ${elem.dataset.cc}`;
          console.log(currency_input.value);
          console.log(currency_input.dataset.cc);
  
      });
      currency_input.addEventListener("input", (event) => {
        currency_out.value = (currency_input.value * (rate1 / rate2)).toFixed(3);
      });
    });
}
load();
$p = document.querySelector("#text_content");
$p.textContent = `Курси валют станом на: ${new Date().toDateString()}`;
$p.style.fontWeight = "bold";
