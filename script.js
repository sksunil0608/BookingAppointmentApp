//Save This Form Data when user click on Submit.

const { use } = require("express/lib/application");

var form = document.querySelector('#form');

form.addEventListener('submit',Onsubmit)
var fname = document.querySelector('#fname');
var email = document.querySelector('#email');
var phone = document.querySelector('#phone');
var date = document.querySelector('#date');
var time = document.querySelector('#time');
function Onsubmit(e){
    e.preventDefault();

    if (fname.value ==='' || email.value ===''){
        let showMSG = document.createElement('p')
        showMSG.style.border ="4px solid yellow";
        showMSG.style.backgroundColor ="red";
        showMSG.style.color ="white";
        showMSG.style.padding ="10px";
        
        showMSG.textContent = "Please insert Important Fields"
        showMSG.style.textAlign ="left";
        form.insertBefore(showMSG,document.getElementById('fname-label'))
        setTimeout(() => {
            showMSG.remove();
        }, 5000);
    }
    else{
        let items = {
            "name":fname.value,
            "email":email.value,
            "phone":phone.value,
            "date":date.value,
            "time":time.value
        };
        
        // Check if the username is already there
        userStatus = localStorage.getItem(email.value);
        console.log(userStatus)
        // If user is not present Store in the Local Storage
        if(userStatus===''){ 
        items_Serialized = JSON.stringify(items)
        localStorage.setItem(email.value,items_Serialized)
        }
        

        // Get back them in the accessible format
        items_Deserialized = JSON.parse(localStorage.getItem(email.value))
        console.log(items_Deserialized)
        
        // Show the Success Message
        let successMSG = document.createElement('p')
        successMSG.style.border ="4px solid yellow";
        successMSG.style.backgroundColor ="green";
        successMSG.style.color ="white";
        successMSG.style.padding ="10px";
        
        successMSG.textContent = "Booking Done Successfully"
        successMSG.style.textAlign ="left";
        form.appendChild(successMSG)

        //Clear the log after submiting
        setTimeout(()=>{
            successMSG.remove();
            fname.value='';
            email.value='';
            phone.value='';
            date.value='';
            time.value='';
        },2000)
    }
    
}