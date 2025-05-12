
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function generateKey(e, keyText){
    e.preventDefault();

    keyText = keyInput.value;
    keyText = keyText.toLowerCase();
    keyText = keyText.replace(/j/g, 'i');
    letterSet = new Set();
    graph = [];

    // use key to generate graph
    for(i = 0; i < keyText.length; i++){
        if(!letterSet.has(keyText[i]) && alphabet.includes(keyText[i])){
            letterSet.add(keyText[i]);
            graph.push(keyText[i]);
        }
    }

    // add missing letters
    for(i = 0; i < alphabet.length; i++){
        if(!letterSet.has(alphabet[i])){
            graph.push(alphabet[i]);
        }
    }

    
    if(graph.join() == alphabet.join()){
        alert("The string you have entered dose not contain valid letters");
    }
    else{
        key = graph;
        displayKey(key);
    }
    
}

function encryptText(){

    plainText = encryptDecryptInput.value;
    plainText = plainText.toLowerCase();
    plainText = plainText.replace(/j/g, 'i');
    plainText = plainText.split('');

    i = 0;
    while(i < plainText.length){
        if(!alphabet.includes(plainText[i])){
            plainText.splice(i, 1);
        }
        else{
            i++;
        }
    }

    console.log(plainText);

    encryptedText = [];
    character = 0;

    while(true){
        if(plainText.length <= character){
            break;
        }
        firstLetter = key.indexOf(plainText[character]);
        secondLetter = (character + 1 == plainText.length) ? key.indexOf('x') : key.indexOf(plainText[character + 1]);
        

        if(firstLetter === secondLetter){
            secondLetter = key.indexOf('x');
            character -= 1;
        }

        if(Math.floor(firstLetter / 5) == Math.floor(secondLetter / 5)){
            // console.log(key[firstLetter] + key[secondLetter]);

            firstLetter % 5 == 4 ? encryptedText.push(key[firstLetter - 4]) : encryptedText.push(key[firstLetter + 1]);
            secondLetter % 5 == 4 ? encryptedText.push(key[secondLetter - 4]) : encryptedText.push(key[secondLetter + 1]);
        }
        else if(firstLetter % 5 === secondLetter % 5){
            // console.log(key[firstLetter] + key[secondLetter]);

            Math.floor(firstLetter / 20) == 1 ? encryptedText.push(key[firstLetter - 20]) : encryptedText.push(key[firstLetter + 5]);
            Math.floor(secondLetter / 20) == 1 ? encryptedText.push(key[secondLetter - 20]) : encryptedText.push(key[secondLetter + 5]);
        }
        else{
            // console.log(key[firstLetter], key[secondLetter]);
            difference = Math.abs((firstLetter % 5) - (secondLetter % 5));

            if((firstLetter % 5) < (secondLetter % 5)){
                encryptedText.push(key[firstLetter + difference]);
                encryptedText.push(key[secondLetter - difference]);
            }
            else{
                encryptedText.push(key[firstLetter - difference]);
                encryptedText.push(key[secondLetter + difference]);
            }
        }
        character += 2;
    }

    console.log(encryptedText);
    console.log(encryptedText.join("").toUpperCase());
    encryptDecryptOutput.value = encryptedText.join("");
}

function decryptText(){

    cipherText = encryptDecryptInput.value;
    cipherText = cipherText.toLowerCase().split('');
    i = 0;
    while(i < cipherText.length){
        if(!alphabet.includes(cipherText[i])){
            cipherText.splice(i, 1);
        }
        else{
            i++;
        }
    }

    decryptedText = [];
    character = 0;

    while(cipherText.length > character){
        firstLetter = key.indexOf(cipherText[character]);
        secondLetter = key.indexOf(cipherText[character + 1]);
        
        // same row
        if(Math.floor(firstLetter / 5) == Math.floor(secondLetter / 5)){
            // console.log(key[firstLetter], key[secondLetter]);

            firstLetter % 5 == 0 ? decryptedText.push(key[firstLetter + 4]) : decryptedText.push(key[firstLetter - 1]);
            secondLetter % 5 == 0 ? decryptedText.push(key[secondLetter + 4]) : decryptedText.push(key[secondLetter - 1]);
        }
        // same column
        else if(firstLetter % 5 === secondLetter % 5){
            // console.log(key[firstLetter] + key[secondLetter]);

            Math.floor(firstLetter / 5) == 0 ? decryptedText.push(key[firstLetter + 20]) : decryptedText.push(key[firstLetter - 5]);
            Math.floor(secondLetter / 5) == 0 ? decryptedText.push(key[secondLetter + 20]) : decryptedText.push(key[secondLetter - 5]);
        }
        else{
            difference = Math.abs((firstLetter % 5) - (secondLetter % 5));

            if((firstLetter % 5) < (secondLetter % 5)){
                decryptedText.push(key[firstLetter + difference]);
                decryptedText.push(key[secondLetter - difference]);
            }
            else{
                decryptedText.push(key[firstLetter - difference]);
                decryptedText.push(key[secondLetter + difference]);
            }
        }
        character += 2;
    }

    encryptDecryptOutput.value = decryptedText.join("");
    console.log(decryptedText.join("").toUpperCase());
}

function displayKey(key){
    table.textContent = '';
    row = document.createElement('tr');
    for(i = 0; i < key.length; i++){
        column = document.createElement("td");
        if(key[i] == 'i'){
            column.textContent = 'I/J';
        }
        else{
            column.textContent = key[i].toUpperCase();
        }

        row.appendChild(column);
        if(i % 5 == 4){
            table.appendChild(row);
            row = document.createElement("tr");
        }
    }
}

const table = document.querySelector(".key-table");

const encryptDecryptInput = document.querySelector("#encryptDecryptInput");
const encryptDecryptOutput = document.querySelector("#encryptDecryptOutput");
const keyInput = document.querySelector(".key-input");
const keyButton = document.querySelector("#generate-key");
const replaceButton = document.querySelector("#replaceText");
key = ['s', 'w', 'i', 'm', 'n', 'g', 'a', 'b', 'c', 'd', 'e', 'f', 'h', 'k', 'l', 'o', 'p', 'q', 'r', 't', 'u', 'v', 'x', 'y', 'z'];
displayKey(key);

keyButton.addEventListener('click', generateKey);

const button = document.querySelector("#calculate");
const option = document.querySelector("#option");

button.addEventListener("click", (e) => {
    e.preventDefault();
    if (option.value == 'encrypt'){
        encryptText();
    }
    else{
        decryptText();
    }
});

replaceButton.addEventListener('click', (e) => {
    e.preventDefault()
    encryptDecryptInput.value = encryptDecryptOutput.value;
});
