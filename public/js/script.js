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
function showError(){
    var errorDisplay=document.querySelector('#errorDisplay')
    errorDisplay.style.display='block'
    setTimeout(function(){
        errorDisplay.style.display='none'
    },3000)
}