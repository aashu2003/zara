const d = document;
const tablehead = document.getElementById('table_head');
console.log(tablehead);
var thnum = 1;
var trnum = 1;
// var theads = [];

const th_p = d.getElementById("th_p");
const th_m = d.getElementById("th_m");
console.log(th_p);
th_p.addEventListener(("click") , ()=>{
    // creating a th elem
    let th_node =  d.createElement('th');

    // giving id to th
    th_node.setAttribute('id' , `th_${thnum}`);

    // creating a min elem
    let min = d.createElement("b");
    min.setAttribute('id' , `th_m${thnum}`);
    min.setAttribute('class' , `th_m`);
    min.setAttribute("onclick" , `rmoveelem("th_${thnum}")`)
    min.innerText = "-";
    th_node.setAttribute("ondblclick" , `showminelem("th_m${thnum}")`);
  document.querySelector('h1').setAttribute("onmousemove" , `unshowminelem("th_m${thnum}")`);
    let inp_text = d.createElement('input');
    inp_text.setAttribute("type" , "text");
   th_node.appendChild(inp_text);
   
   th_node.appendChild(min);
   tablehead.appendChild(th_node);
   thnum++;
});



function showminelem(id){
    d.getElementById(id).style.display = "inline-block";
}
function unshowminelem(id){
    d.getElementById(id).style.display = "none";
}

var rmoveelem = (id)=>{
    d.getElementById('table_head').removeChild(document.getElementById(id));
}

