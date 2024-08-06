let imageElement = document.getElementById("image");
let imageWidthElement = document.getElementById("imageWidth");
let warningMessage = document.getElementById("warningMessage");

let maxImageWidth = 300;
let minImageWidth = 100;
let defaultImageSize = 200;

let maxWarningMessage = "Too big.decrease the size of the Image.";
let minWarningMessage = "Can't visible.Increase the size of the Image.";

imageElement.style.width = defaultImageSize + "px";
imageWidthElement.textContent = defaultImageSize + "px";


function increaseSize(){
    if (defaultImageSize >= maxImageWidth){
        warningMessage.textContent = maxWarningMessage;
    }

    else{
        defaultImageSize = defaultImageSize + 5;
        let updatedSize = defaultImageSize + "px";
        
        warningMessage.textContent = "";
        imageElement.style.width = updatedSize;
        imageWidthElement.textContent = updatedSize;
    }

}

function deacreseSize(){
    if (defaultImageSize <= minImageWidth){
        warningMessage.textContent = minWarningMessage;
    }

    else{
        defaultImageSize = defaultImageSize - 5;
        let updatedSize = defaultImageSize + "px";
        
        warningMessage.textContent = "";
        imageElement.style.width = updatedSize;
        imageWidthElement.textContent = updatedSize;
    }
}



