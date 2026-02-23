// const { use } = require("react");

let prompt = document.querySelector("#prompt");
let chatContainer = document.querySelector(".chat-container");

const API_KEY = "AIzaSyAWy7ZuDa4WkkiG4bPx9QT2hDQRaUuFrzE";

const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`


let user = {
    data:null,
}

async function generateResponse(aiChatBox){

    let text = aiChatBox.querySelector(".ai-chat-area");

    let RequestOption = {
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            "contents": [
                {"parts": [{"text": user.data}]
            }]
        })
    }
    try{
        let response = await fetch(apiUrl,RequestOption);
        let data = await response.json();
        console.log(data);
        
        let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
        text.innerHTML=apiResponse;
    }
    catch(error){
        console.log(error);
    }
    finally{
        chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})

    }
}

function createChatBox(html,classes){
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}




function handleChatResponse(message){
    user.data = message;
    let html= `
    <img src="./assets/boy logo.png" alt="USER" id="user-image" width="50">
    <div class="user-chat-area">
        ${user.data}
    </div>`
    prompt.value = "";
    let userChatBox = createChatBox(html,"user-chat-box");
    chatContainer.appendChild(userChatBox);

    chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})

    setTimeout(() => {
        let html = ` <img src="./assets/AI logo.png" alt="AI"  id="ai-image" width="50">
            <div class="ai-chat-area">
            <img src="./assets/typing.svg" alt="typing" class="load">

            </div>`

        let aiChatBox = createChatBox(html,"ai-chat-box");
        chatContainer.appendChild(aiChatBox);

        generateResponse(aiChatBox);

    }, 1000);

}

prompt.addEventListener("keydown", (e)=>{
    if(e.key=="Enter"){
        handleChatResponse(prompt.value);
    }
})