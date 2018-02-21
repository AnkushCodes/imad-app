console.log('Loaded!');


var element=document.getElementById('main-text');

element.innerHTML='New Value';

var img=document.getElementById('img');

img.onClick=function(){
    img.marginLeft='100px'
};
