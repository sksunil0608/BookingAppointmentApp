//Save This Form Data when user click on Submit.






var form = document.querySelector('#form');
var record = document.getElementById('record-button');

window.addEventListener('DOMContentLoaded',()=>{
    record.addEventListener("click",viewAllRecord)
})

form.addEventListener('submit',createUser)


var fname = document.querySelector('#fname');
var email = document.querySelector('#email');
var phone = document.querySelector('#phone');
var date = document.querySelector('#date');
var time = document.querySelector('#time');





function emptyDataErrorMessage(){
    let showMSG = document.createElement('p')
        showMSG.style.border ="4px solid yellow";
        showMSG.style.backgroundColor ="red";
        showMSG.style.color ="white";
        showMSG.style.padding ="10px";
        
        showMSG.textContent = "Please insert Important Fields"
        showMSG.style.textAlign ="left";

        var form_area = document.getElementById('form-area');
        form_area.insertBefore(showMSG,document.getElementById('fname-label'))
        return showMSG;
}

function successMessageOnUserCreation(){
        let successMSG = document.createElement('p')
        successMSG.id = "successMSG"
        successMSG.style.border ="4px solid yellow";
        successMSG.style.backgroundColor ="green";
        successMSG.style.color ="white";
        successMSG.style.padding ="10px";
        
        successMSG.textContent = "Congrats !Booking Done Successfully Here is your Details."
        successMSG.style.textAlign ="left";
        form.appendChild(successMSG)
}

function showDetailsOnPageAndclearLog(data){
        console.log(data,"show detail")
        let showItems = document.createElement('div');
        showItems.style.border ="1px solid blue";
        showItems.id ="show-items";

        

        for (let key in data){
            iList = document.createElement('h5');
            iList.style.marginLeft ="5%";
            let value = data[key];
            iList.textContent = `${key.toUpperCase()} : ${value}`;
            showItems.appendChild(iList);
        }
        //Add this div to form
        form.appendChild(showItems);
        
        
        // clear log button
        let clrBtn = document.createElement('button');
        clrBtn.style.border = "2px solid red";
        clrBtn.style.backgroundColor = "yellow";
        clrBtn.style.marginLeft ="10px";
        // viewRecord Button
        let viewBtn = document.createElement('button');
        viewBtn.style.border = "2px solid red";
        viewBtn.style.backgroundColor = "yellow";

        
        
        // Clear the log after submitting
        var clrAnchorTag = document.createElement('a');
        clrAnchorTag.href = '#';
        clrAnchorTag.style.textDecoration = 'none';
        clrAnchorTag.textContent = 'OK';

        // Add a click event listener to the anchor tag
        clrAnchorTag.addEventListener('click', function () {
            // Reload the page when the anchor tag is clicked
            location.reload();
        });

        // View Anchor
        var viewAnchorTag = document.createElement('a');
        viewAnchorTag.href = '#';
        viewAnchorTag.style.textDecoration = 'none';
        viewAnchorTag.textContent = 'View Records';

        // Add a click event listener to the anchor tag
        viewAnchorTag.addEventListener('click',viewAllRecord);


        // Add anchor tag to clear button and view button paragraph
        clrBtn.appendChild(clrAnchorTag);
        viewBtn.appendChild(viewAnchorTag)
        //Add clear button to the show items div which we show the details
        showItems.appendChild(viewBtn)
        showItems.appendChild(clrBtn);
}

function createUser(event){
    event.preventDefault();

    if (fname.value ==='' || email.value ===''){
        let showMSG = emptyDataErrorMessage();
        setTimeout(() => {
            showMSG.remove();
        }, 2000);
    }
    else{

        const name = event.target.fname.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const date = event.target.date.value;
        const time = event.target.time.value;

        const obj = {
            name,
            email,
            phone,
            date,
            time
        }
        axios.post('https://crudcrud.com/api/3aa48e6b4ed4459ba43d22debce37f62/booking-data',obj)
        .then((response)=>{

            // Show the Form Details in the Page itself.
            showDetailsOnPageAndclearLog(response.data);
        }).catch((err)=>{
            console.log(err)
        })
        // Show the Success Message
        successMessageOnUserCreation();
        // Once Submitted clear the form
        setTimeout(()=>{
            var form_area = document.getElementById("form-area")
            form_area.style.display = "none";
        },1)

    }
    
}



//View all the Record Function form Backend
async function viewAllRecord(e){
    e.preventDefault();

    setTimeout(()=>{
        var form_area = document.getElementById("form-area")
        form_area.style.display = "none";
        var showItems = document.getElementById("show-items")
        if (showItems!=null){showItems.style.display ="none";}
        let successMSG = document.createElement('p')
        successMSG.id = "successMSG"
        successMSG.style.border ="4px solid yellow";
        successMSG.style.backgroundColor ="green";
        successMSG.style.color ="white";
        successMSG.style.padding ="10px";
        successMSG.style.display = "none";
    },1)

    let formBorder = document.getElementById("form-border");
    formBorder.style.width ="90%";
    formBorder.style.marginTop = "2%";

    let showItems = document.createElement('table');
    showItems.style.border ="1px solid blue";
    showItems.style.width = "90%";
    showItems.style.padding = "6px"
    showItems.style.margin ="30px"


    // Show the Success Message

    let MSG = document.createElement('p')
    MSG.style.border ="4px solid yellow";
    MSG.style.backgroundColor ="green";
    MSG.style.color ="white";
    MSG.style.padding ="10px";
    
    MSG.textContent = "All Records"
    MSG.style.textAlign ="left";
    form.appendChild(MSG)


    itemHeadName = document.createElement('tr');
    itemHeadName.style.border ="1px solid black";

    userName = document.createElement('th');
    userName.textContent = "Name";
    userName.style.border ="1px solid black";
    itemHeadName.appendChild(userName)

    userEmail = document.createElement('th');
    userEmail.textContent = "Email";
    userEmail.style.border ="1px solid black";
    itemHeadName.appendChild(userEmail)

    userPhone = document.createElement('th');
    userPhone.textContent = "Phone";
    userPhone.style.border ="1px solid black";
    itemHeadName.appendChild(userPhone)

    userDate = document.createElement('th');
    userDate.textContent = "Date";
    userDate.style.border ="1px solid black";
    itemHeadName.appendChild(userDate)

    userTime = document.createElement('th');
    userTime.textContent = "Time";
    userTime.style.border ="1px solid black";
    itemHeadName.appendChild(userTime)

    //creating delete BUTTON
    userDelete = document.createElement('th');
    userDelete.textContent = "Delete";
    userDelete.style.border ="1px solid black";
    itemHeadName.appendChild(userDelete)

    //CREATING UPDATE BUTTON
    userUpdate = document.createElement('th');
    userUpdate.textContent = "Update";
    userUpdate.style.border ="1px solid black";
    itemHeadName.appendChild(userUpdate)

    // Add heading to table
    showItems.appendChild(itemHeadName);

    // Fetching all Record from Crud
    let get_data = await axios.get('https://crudcrud.com/api/3aa48e6b4ed4459ba43d22debce37f62/booking-data')
        .then((response)=>{
            return response
        }).catch((error)=>{
            console.log(error);
        })

    if (get_data.data.length!=0){
        for (let i=0; i<get_data.data.length;i++){
            var uid =get_data.data[i]._id   
            var records = get_data.data[i]
            

            listItems = document.createElement('tr');
            listItems.style.border ="1px solid black";
            listItems.className = uid
            records_keys = Object.keys(records)

            for(let j = 1;j<records_keys.length;j++){
                value = records[records_keys[j]]
                item = document.createElement('td');
                item.style.border ="1px solid black";
                item.textContent = `${value}`
                item.style.padding ="6px";
                listItems.appendChild(item)

                
            }

            deleteBtnRow = document.createElement('td');
            deleteBtnRow.style.border ="1px solid black"
            deleteBtn = document.createElement('button');
            deleteBtn.id =uid
            deleteBtn.onclick = function(){
                deleteItem(this.id)
            }
            deleteBtn.className = "table-button";
            deleteBtn.textContent="X";
            deleteBtn.style.backgroundColor = "red"
            deleteBtnRow.appendChild(deleteBtn)
            listItems.appendChild(deleteBtnRow)

            //Edit Buteon
            editBtnRow = document.createElement('td');
            editBtn = document.createElement('button');
            editBtn.value =uid
            editBtn.onclick =function(){
                editItem(this.value);
            }
            editBtnRow.style.border = "1px solid black"
            editBtn.className = "table-button";
            editBtn.textContent="Edit";
            editBtn.style.color ="white"
            editBtn.style.backgroundColor = "blue"
            editBtnRow.appendChild(editBtn)
            listItems.appendChild(editBtnRow);
            showItems.appendChild(listItems)

            
        }
    }

    form.appendChild(showItems)

    newReg = document.createElement('button');
    newReg.id = "neReg";
    newReg.textContent="New Registration";
    newReg.style.marginLeft ="48%";
    newReg.style.backgroundColor="yellow"
    newReg.addEventListener('click',reload);
    form.appendChild(newReg)
    function reload(e){
        e.preventDefault();
        location.reload();

    }
    // Delete Item
    async function deleteItem(id){
        e.preventDefault();

        let delete_user = await axios.delete(`https://crudcrud.com/api/3aa48e6b4ed4459ba43d22debce37f62/booking-data/${id}`)
        .then((response)=>{
           console.log(response)
        }).catch((error)=>{
            console.log("Something Went Wrong",error)
        })
        var element = document.getElementsByClassName(id)
        element[0].remove();

        let showMSG = document.createElement('p');
        showMSG.style.border ="4px solid yellow";
        showMSG.style.backgroundColor ="red";
        showMSG.style.color ="white";
        showMSG.style.padding ="10px";
        
        showMSG.textContent = "Record Deleted"
        showMSG.style.textAlign ="left";

        formBorder.insertBefore(showMSG,document.getElementById('newReg'))

        setTimeout(() => {
            showMSG.remove();
        }, 1000);
        



    //Edit Function 
    function editItem(id){
        e.preventDefault();
        element = JSON.parse(localStorage.getItem(id));
        deleteItem(id)
        var form_area = document.getElementById("form-area")
        form_area.style.display = "inline";
        
        values = document.querySelectorAll('input');
        values[0].value = element.name;
        values[1].value = element.email;
        values[2].value = element.phone;
        values[3].value = element.date;
        values[4].value = "UPDATE"

        showItems.style.display ="none";
        MSG.style.display ="none";
        newReg.style.display ="none";
        showMSG.style.display ="none";


        
    }
}
}