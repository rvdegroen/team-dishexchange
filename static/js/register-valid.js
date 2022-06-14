const form = {
  name: document.querySelector(" #register #name"),
  country: document.querySelector(" #register #country"),
  city: document.querySelector(" #register #city"),
  phoneNumber: document.querySelector(" #register #phonenumber"),
  dob: document.querySelector(" #register #dob"),
  email: document.querySelector("#register #email"),
  username: document.querySelector("#register #username"),
  psw: document.querySelector("#register #password"),
  pswRepeat: document.querySelector("#register #psw-repeat"),
  submit: document.querySelector("#register #submit"),
};

const errorMessages = {
  input: document.querySelector("#register .error-input"),
  name: "Entering your name is required ",
  country: "Entering your country name is required ",
  city: "Entering your city name is required ",
  dob: "Entering your date of brith is required ",
  email: "Entering your email is required ",
  username: "Entering your username is required ",
  psw: "Entering your password is required ",
  pswRepeat: "Repeating your password is required ",
};

const registrationResponse = {
  frame: document.querySelector(".form-respond"),
  text: document.getElementById("serverRespond"),
};

const contactFormulier = document.getElementById("register");
const data = {};

const validateField = (input, value) => {
  if (value == "") return false;

  return true;
};

const formInput = contactFormulier.querySelectorAll(" fieldset");

form.submit.addEventListener("click", (e) => {

   

  // e.preventDefault(); //cancel main action

  let error = false;

  // looping through the whole form
  formInput.forEach((field) => {
    const input = field.querySelector("input");
    const name = input.name; //name of the input type
    const value = input.value;

    // if the field has the class required run validation else dont
    // ? = if   : = else. ondition ? true_expression : false_expression
    const valid = field.classList.contains("required")
      ? validateField(input, value)
      : true;
    if (valid) {
      if (field.classList.contains("invalid")) {
        field.classList.remove("invalid");
      }

      // for everything in the form loop as argument = value of the argument
      data[name] = value;
    } else {
      errorResponse();
      field.classList.add("invalid");
      error = true;
    }
  });

  if (error == false) {
 
    registerd();
    console.log("ready to send to the database");
    // submitForm();
  }
});

function submitForm(){
  contactFormulier.submit();
}

function registerd() {
  registrationResponse.text.textContent =
    "Thanks " +
    data.name +
    "! Your account has been made with the username: " +
    data.username;
  registrationResponse.frame.classList.remove("hidden");
  contactFormulier.classList.add("blur");
}

function errorResponse() {
  for (const [key, value] of Object.entries(errorMessages)) {
    if (key == "name") {
      document.getElementsByName("name")[0].placeholder = value;
    } else if (key == "country") {
      document.getElementsByName("country")[0].placeholder = value;
    } else if (key == "city") {
      document.getElementsByName("city")[0].placeholder = value;
    } else if (key == "dob") {
      errorMessages.input.textContent = value;
    } else if (key == "email") {
      document.getElementsByName("email")[0].placeholder = value;
    } else if (key == "username") {
      document.getElementsByName("username")[0].placeholder = value;
    } else if (key == "psw") {
      document.getElementsByName("psw")[0].placeholder = value;
    } else if (key == "pswRepeat") {
      document.getElementsByName("psw-repeat")[0].placeholder = value;
    }
  }
}
