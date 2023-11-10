const form = document.getElementById("form");
form.addEventListener("submit", createUser);
getAllUsers();
//Show all Users Data on the Page
function showAllUsers(response) {
  const form_border = document.getElementById("form-border");
  let user_data = document.createElement("div");

  user_data.innerHTML = `<table id="table" style="width: 90%; padding: 6px; margin: 30px;">
                      <tr class="border-1">
                        <th class="border-1 text-primary">NAME</th>
                        <th class="border-1 text-primary">EMAIL</th>
                        <th class="border-1 text-primary">PHONE</th>
                        <th class="border-1 text-primary">DELETE</th>
                        <th class="border-1 text-primary">UPDATE</th>
                      </tr>
                   </table>`;
form_border.appendChild(user_data);
  response.data.forEach((i) => {
    const table = document.getElementById("table");
    // Create a new row
    var newRow = table.insertRow(table.rows.length);
    newRow.id = i.id;

    // Insert cells into the row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    cell1.innerHTML = i.name;
    cell2.innerHTML = i.email;
    cell3.innerHTML = i.phone;
    cell4.innerHTML = ` <button class="btn btn-danger btn-sm input-group-text m-1" onclick="deleteUser('${i.id}')">
                                Delete
                            </button>`;
    cell5.innerHTML = `<button class="btn btn-warning btn-sm input-group-text m-1" onclick="updateUser('${i.id}')">
                                Edit
                            </button>`;
  });
  
}
// Show the Added User Data on the Page
function showAddedUser(response) {
    const data = response.data.newUserDetails;

    const table = document.getElementById("table");
    // Create a new row
    var newRow = table.insertRow(table.rows.length);
    newRow.id = data.id;
    // Insert cells into the row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    cell1.innerHTML = data.name;
    cell2.innerHTML = data.email;
    cell3.innerHTML = data.phone;
    cell4.innerHTML = ` <button class="btn btn-danger btn-sm input-group-text m-1" onclick="deleteUser('${data.id}')">
                                Delete
                            </button>`;
    cell5.innerHTML = `<button class="btn btn-warning btn-sm input-group-text m-1" onclick="updateUser('${data.id}')">
                                Edit
                           </button>`;
}
//show edit user
function showEditedUser(response) {
  document.getElementById(`${response.data.newUserDetails.id}`).remove();
  showAddedUser(response);
}
//Clear the Input Box
function clearInputBox() {

    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#time").value = "";
    document.querySelector("#date").value = "";

    if (document.querySelector("#update-button")) {
      document.querySelector("#update-button").remove();
    }
}

// Function to add user to the Database
async function createUser(event,) {
  event.preventDefault();

  if (name.value === "" || email.value === "") {
    console.log("Please Fill all the important fields");
  } else {
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const date = event.target.date.value;
    const time = event.target.time.value;
    const editMode = false;

    const obj = {
      name,
      email,
      phone,
      date,
      time,
      editMode
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/user/add-user",
        obj
      );
      showAddedUser(response);
      clearInputBox();
    } catch (err) {
      console.log(err);
    }
  }
}

async function getAllUsers() {
  try {
    const response = await axios.get("http://localhost:3000/user/all-users");
    showAllUsers(response);
  } catch (err) {
    console.log(err);
  }
}
function removeDeletedUserUI(id){
    document.getElementById(id).remove()
}
async function deleteUser(id){
    try{
        await axios.delete(`http://localhost:3000/user/delete-user/${id}`);
        removeDeletedUserUI(id);

    }catch(err){
        console.log(err)
    }
}

// I will handle edit functionality later it is not completed as it was not said in task.
async function updateUser(id){

    const name =document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const date =document.querySelector("#date").value;
    const time =document.querySelector("#time").value;
    const editMode= true;

    const obj = {
      name,
      email,
      phone,
      date,
      time,
      editMode,
    };

    try{
        // const response = await axios.post(`http://localhost:3000/user/edit-user/${id}`,obj);
        // showEditedUser(response)
        console.log("INput Called")
        clearInputBox()
    }catch(err){
        console.log(err)
    }
}
