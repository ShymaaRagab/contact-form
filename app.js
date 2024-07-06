const form = document.getElementById("form");

function styleingError(valid, idName, message) {
  const targetInput = document.getElementById(idName).previousElementSibling;
  if (idName == "queryType-error" || idName == "checkbox-error") {
    if (valid) {
      document.getElementById(idName).innerHTML = "";
    } else {
      document.getElementById(idName).innerHTML = message;
      document.getElementById(idName).style.color = "hsl(0, 66%, 54%)";
    }
  } else {
    if (valid) {
      document.getElementById(idName).innerHTML = "";
      targetInput.style.border = "2px solid hsl(186, 15%, 59%)";
    } else {
      document.getElementById(idName).innerHTML = message;
      document.getElementById(idName).style.color = "hsl(0, 66%, 54%)";
      targetInput.style.border = "2px solid hsl(0, 66%, 54%)";
    }
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  console.log(data);
  const checkFirstName =
    data["firstName"] != "" || data["firstName"].length >= 35;
  const checkLastName = data["lastName"] != "" || data["lastName"].length >= 35;
  const checkEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      data["email"]
    );
  const checkMessage = data["feedback"] != "";
  const checkQuery = data.hasOwnProperty("queryType");
  const checkbox = data.hasOwnProperty("checkbox");

  styleingError(checkFirstName, "firstName-error", "This field is required");
  styleingError(checkLastName, "lastName-error", "This field is required");
  styleingError(checkMessage, "message-error", "This field is required");
  styleingError(
    checkEmail,
    "email-error",
    "Please enter a valid email address"
  );
  styleingError(checkQuery, "queryType-error", "Please select a query type");
  styleingError(
    checkbox,
    "checkbox-error",
    "To submit this form, please consent to being contacted"
  );
  if (
    checkEmail &&
    checkFirstName &&
    checkLastName &&
    checkMessage &&
    checkQuery &&
    checkbox
  ) {
    document.getElementById("showMessage").classList.add("show");
  } else {
    document.getElementById("showMessage").classList.remove("show");
  }
}

form.addEventListener("submit", handleSubmit);
