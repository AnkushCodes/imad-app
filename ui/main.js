console.log('Loaded!');


var element=document.getElementById('main-text');

element.innerHTML='New Value';

var img=document.getElementById('img');

var marginLeft=0;

function moveRight(){
    marginLeft=marginLeft + 10;
    img.style.marginLeft=marginLeft+'px';
}


img.onclick=function(){
       setInterval(moveRight,100);
};
