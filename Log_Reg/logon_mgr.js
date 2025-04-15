const { text } = require("express");

function showForm(formId) {
    document.querySelectorAll(".loginControls").forEach(form => form.classList.remove("active"));
    document.getElementById(formId).classList.add("active");
}







//Daniel will do this  :)