//Save This Form Data when user click on Submit.

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

        var form_area = document.getElementById('form-area');
        form_area.insertBefore(showMSG,document.getElementById('fname-label'))

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


        // If user is not present Store in the Local Storage 
        items_Serialized = JSON.stringify(items)
        localStorage.setItem(email.value,items_Serialized)
        

        // Get back them in the accessible format
        items_Deserialized = JSON.parse(localStorage.getItem(email.value))
        
        // Show the Success Message
        let successMSG = document.createElement('p')
        successMSG.style.border ="4px solid yellow";
        successMSG.style.backgroundColor ="green";
        successMSG.style.color ="white";
        successMSG.style.padding ="10px";
        
        successMSG.textContent = "Congrats !Booking Done Successfully Here is your Details."
        successMSG.style.textAlign ="left";
        form.appendChild(successMSG)
        // Show the Form Details in the Page itself.
        let showItems = document.createElement('div');
        showItems.style.border ="1px solid blue";

        //Add all the form detail in div
        for (let key in items_Deserialized){
            iList = document.createElement('h5');
            iList.style.marginLeft ="5%";
            let value = items_Deserialized[key];
            iList.textContent = `${key.toUpperCase()} : ${value}`;
            showItems.appendChild(iList);
        }
        //Add this div to form
        form.appendChild(showItems);
        
        
        // clear log button
        let clrBtn = document.createElement('p');
        clrBtn.style.border = "2px solid red";
        clrBtn.style.backgroundColor = "yellow";
        
        // Clear the log after submitting
        var anchorTag = document.createElement('a');
        anchorTag.href = '#';
        anchorTag.style.textDecoration = 'none';
        anchorTag.textContent = 'Clear Log';

        // Add a click event listener to the anchor tag
        anchorTag.addEventListener('click', function () {
            // Reload the page when the anchor tag is clicked
            location.reload();
        });

        // Add anchor tag to clear button paragraph
        clrBtn.appendChild(anchorTag);
        //Add clear button to the show items div which we show the details
        showItems.appendChild(clrBtn);


        // Once Submitted clear the form
        setTimeout(()=>{
            var form_area = document.getElementById("form-area")
            form_area.style.display = "none";
        },1)

    }
    
}
