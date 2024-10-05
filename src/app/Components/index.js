const arr = ["anish", "Bapp", "chacha"];
const cha = document.getElementById("ch");
const a = document.getElementById("ab");
let count = 0;
console.log(cha);
const changecha = () => {
  cha.textContent = arr[count];
  count = (count + 1) % arr.length;
};
cha.addEventListener("click", changecha);
