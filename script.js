
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function generateKey(keyText){
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

    console.log(graph);
    return graph;
}

function encryptText(plainText, key){

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
    return encryptedText.join("");
}

function decryptText(cipherText, key){

    cipherText = cipherText.toLowerCase();
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
    console.log(decryptedText);
    console.log(decryptedText.join('').toUpperCase());
}



key = generateKey("swimming");

secret = encryptText("Meet the most amazing way to highlight differences in your text! It is undoubtedly an easy to use online tool to compare text in the most efficient manner. It allows every user a hassle free experience to compare some content online. This incredible tool allows everyone to simply make an online text comparison and find out the differences amidst two texts. The super easy procedure involves just a single step; paste the two texts in separate boxes and click on the compare button to unfold the differences. The two texts will be shown on the screen side by side along with the differences highlighted. This awesome tool not only highlights the words within the cluster of lines that entail a difference. If your text is lengthy, it also offers links that will help you to jump from on difference to the other.", key)

decryptText(secret, key)

// decryptText("ICHIOEHIRY", key)
