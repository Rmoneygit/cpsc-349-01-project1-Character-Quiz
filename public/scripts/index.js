$(document).on('click', '#create-quiz', function (event) {
    if (!isUserSignedIn()) {
        alert("please sign in first")
        return false;
    }
    // window.location.href = "create.html";
});