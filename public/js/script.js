(function(){
var checkboxRef=document.querySelector('#termCheck')
checkboxRef.addEventListener('click',function(){
    if(checkboxRef.checked){
        document.querySelector('#submitBtn').disabled=false
    }
    else{
        document.querySelector('#submitBtn').disabled=true
    }
})
})()