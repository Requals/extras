const reader = new FileReader();
const container = document.getElementById("container");
function setupLinks(lists,amount,parent) {
  for(let i = 0;i < amount;i++){
    lists.sort(function(a,b){
      return a[1].localeCompare(b[1]);   
    })
    const link = document.createElement("a");
    const linkText = document.createTextNode(lists[i][1]);
    link.href = lists[i][0];
    link.target = "_blank"
    const description = document.createElement("p");
    const descriptionText = document.createTextNode(lists[i][2]);
    const hrBreak = document.createElement("hr");
    description.style.fontStyle = "italic";
    link.appendChild(linkText);
    parent.appendChild(link);
    description.appendChild(descriptionText);
    parent.appendChild(description);
    if(amount > i+1) {
      parent.appendChild(hrBreak);
    }
  }
  }  
  fetch("links.json").then(response => response.json()).then(data => setupLinks(data["links"],data["links"].length,container));
