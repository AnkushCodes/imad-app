var button =document.getElementById("counter");




button.onclick=function(){
    
    
    
    var request=new XMLHttpRequest.DONE;
    
    request.onreadystatechange = function(){
        if(request.readyState===XMLHttepRequest.DONE){
            if(request.status===200){
                var counter = request.responseText;
                var span=document.getElementById("counter");
                span.innerHTML=counter.toString();
};
            }
        }
        
    }
        
 request.open('GET',"http://ankushkanchar07.imad.hasura-app.io/counter",true);
 request.send(null);

};
