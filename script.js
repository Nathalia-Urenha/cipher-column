let result = '';

function checkText(text) {
    if (text == "") {
        alert("Por favor, insira um texto!");
        return false;
    }
    return true;
}

function checkQuantity(value) {
    if (value == "") {
        alert("Por favor, insira a quantidade de linhas!");
        return false;
    }
    return true;
}


function reset(value) {
    document.getElementById('result').setAttribute('value', value);
    result = '';
}

function exit() {
    window.close();
}


function encryptReplacement() {
    const message = document.getElementById('input-replacement').value;
    const lineQuantity = Number(document.getElementById('line-quantity').value);
    const messageLength = message.length
    let newMessage = [];
    let initial = 0;
    for (let j = 0; j < lineQuantity; j++) {
        let i = initial
        for (initial; i < messageLength; i) {
            newMessage.push(message[i])
            if (i + lineQuantity >= message.length) {
                initial = initial + 1
            }
            i = Number(i) + Number(lineQuantity)
        }
    }

    newMessage = newMessage.join("")
    const criptografada = (newMessage)
    // console.log(criptografada)
    reset(criptografada);
}

function decryptReplacement() {

    const message = document.getElementById('result').value !== ''
        ? document.getElementById('result').value
        : document.getElementById('input-replacement').value;

    const lineQuantity = Number(document.getElementById('line-quantity').value)
    const lineQuantityDescription = Math.ceil(message.length / lineQuantity);

    newMessage2 = [];
    initial = 0;

    for (let j = 0; j < lineQuantityDescription; j++) {
        let i = initial;
        for (initial; i < message.length; i = i + lineQuantityDescription) {
            newMessage2.push(message[i]);
            if (i + lineQuantityDescription >= message.length) {
                initial = initial + 1;
            }
        }
    }

    newMessage2 = newMessage2.join("");
    const descriptografada = (newMessage2);
    reset(descriptografada);
}

function encryptTransposition() {
    const message = document.getElementById('input-transposition').value;
    const key = document.getElementById('input-key').value;

    const splitKey = key.split("");
    const keyLength = key.length;

    const messageWithoutSpaces = message.replace(/\s/g, '');
    const splitMessage = message.split("");

    const newMessage = [];

    for (let i = 0; i < splitMessage.length; i++) {
        if (i % keyLength === 0) {
            newMessage.push([]);
        }
        newMessage[newMessage.length - 1].push(splitMessage[i]);
    }

    // add characteres to complete matrix
    const lastLine = newMessage[newMessage.length - 1];
    const lastLineLength = lastLine.length;
    if (lastLineLength < keyLength) {
        for (let i = 0; i < keyLength - lastLineLength; i++) {
            lastLine.push(" ");
        }
    }

    // temp splitKey in alphabetical order
    const orderedKey = splitKey.slice();
    orderedKey.sort();

    const orderedKeyPosition = [];
    for (let i = 0; i < orderedKey.length; i++) {
        orderedKeyPosition.push(splitKey.indexOf(orderedKey[i]));
    }

    // console.log(orderedKeyPosition);

    // order column by orderedKeyPosition
    const orderedMessage = [];
    for (let i = 0; i < orderedKeyPosition.length; i++) {
        for (let j = 0; j < newMessage.length; j++) {
            orderedMessage.push(newMessage[j][orderedKeyPosition[i]]);
        }
    }
    const criptografada = (orderedMessage.join(""));

    // console.log(criptografada);
    reset(criptografada);


}

function decryptTransposition() {

    const message = document.getElementById('result').value !== ''
        ? document.getElementById('result').value
        : document.getElementById('input-transposition').value;

    const key = document.getElementById('input-key').value;

    const splitKey = key.split("");
    const keyLength = key.length;

    const splitMessage = message.split("");

    const newMessage = [];


    for (let i = 0; i < splitMessage.length; i++) {
        if (i % keyLength === 0) {
            newMessage.push([]);
        }
        newMessage[newMessage.length - 1].push(splitMessage[i]);
    }

    const lines = newMessage.length;
    let auxMatrix2 = []

    const times = splitMessage.length / lines;

    for (let j = 0; j < times; j++) {
        let auxMatrix = []
        for (let i = 0; i < lines; i++) {
            auxMatrix.push(splitMessage.shift())

        }
        auxMatrix2.push(auxMatrix)
    }

    const orderedKey = splitKey.slice();
    orderedKey.sort();

    const storageIndex = []
    splitKey.forEach((letter, index) => {
        storageIndex.push(orderedKey.indexOf(letter))
    })

    const orderedMessage = []
    for (let i = 0; i < storageIndex.length; i++) {
        orderedMessage.push(auxMatrix2[storageIndex[i]])
    }

    const decriptedMessage = []
    for (let i = 0; i < lines; i++) {
        orderedMessage.forEach((line) => {
            decriptedMessage.push(line.shift())
        }
        )
    }
    const descriptografada = (decriptedMessage.join(""))
    reset(descriptografada);

}