async function register() {
    let msgDOM = document.getElementById("registermsg");
    msgDOM.textContent = "";
    try {
        let name = document.getElementById("registername").value;
        let pass = document.getElementById("registerpassword").value;
        let res = await requestRegister(name,pass);
        if (res.successful) {
            msgDOM.textContent = "Account created. Go to login page";
        } else {
            msgDOM.textContent = "Was not able to register";
        }      
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";   
    }
}