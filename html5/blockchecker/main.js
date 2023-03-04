/* eslint-disable no-unused-vars */
const re =
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/;
const iframe = document.querySelector("iframe");
const input = document.getElementById("url");
function seturl(value) {
  if (re.test(value)) {
    iframe.src = value;
    input.placeholder = "Input link here...";
    input.classList.remove("error");
    console.log(iframe.contentWindow.document.querySelector("html"));
  } else {
    input.value = "";
    input.placeholder = "Error loading link: Incorrect format!";
    input.classList.add("error");
  }
}

function getlist() {
  fetch("LOLOL.json")
    .then((result) => result.json())
    .then((data) => list(data));
}

function list(data) {
  for (link of data.links) {
    try {
      fetch(link)
        .then((result) => result.status)
        .then((data) => console.log(`${link} gave status of ${data}`));
    } catch {
      console.log(`${link} is blocked!`);
    }
  }
}
