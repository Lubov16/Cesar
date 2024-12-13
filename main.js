const arr1 = [
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я',
    'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'
];


//шифрование
function encryptText(text, shift) {
    let encryptedMessage = '';
    for (let symbol of text) {
        const index = arr1.indexOf(symbol);
        if (index !== -1) {
            const newIndex = (index + shift) % arr1.length;
            encryptedMessage += arr1[newIndex];
        } else {
            encryptedMessage += symbol; // Символ остается без изменения, если не был найден
        }
    }
    return encryptedMessage;
}

//дешифрование
function decryptText(text, shift) {
    let decryptedMessage = '';
    for (let symbol of text) {
        const index = arr1.indexOf(symbol);
        if (index !== -1) {
            const newIndex = (index - shift + arr1.length) % arr1.length;
            decryptedMessage += arr1[newIndex];
        } else {
            decryptedMessage += symbol; // Символ остается без изменения, если не был найден
        }
    }
    return decryptedMessage;
}

//Взлом
function hackText(encryptedText) {
    const letterFrequency = {
        'е': 0.0809, 'н': 0.0670, 'о': 0.0597, 'а': 0.0591, 'и': 0.0689, 'т': 0.0626,
        'р': 0.0473, 'с': 0.0547, 'в': 0.0468, 'л': 0.0443, 'к': 0.0345, 'м': 0.0321,
        'д': 0.0298, 'п': 0.0281, 'у': 0.0262, 'я': 0.0201, 'ы': 0.0184, 'ь': 0.0174,
        'г': 0.0169, 'з': 0.0165, 'б': 0.0160, 'ч': 0.0144, 'й': 0.0121, 'х': 0.0092,
        'ж': 0.0087, 'ш': 0.0073, 'ц': 0.0055, 'щ': 0.0034, 'э': 0.0033, 'ю': 0.0032,
        'ф': 0.0026, 'ъ': 0.0004
    };

    let bestShift = 0;  //
    let bestResult = 0;


    for (let shift = 1; shift < arr1.length; shift++) {
        let decryptedMessage = '';
        for (let symbol of encryptedText) {
            const index = arr1.indexOf(symbol);
            if (index !== -1) {
                const newIndex = (index - shift + arr1.length) % arr1.length;
                decryptedMessage += arr1[newIndex];
            } else {
                decryptedMessage += symbol; // Символ остается без изменения, если не был найден
            }
        }

        // Сравнение букв по частоте и поиск наилучшего совпадения
        let result = 0;
        for (let symbol of decryptedMessage) {
            const symbolFrequency = letterFrequency[symbol.toLowerCase()] || 0;
            result += symbolFrequency;
        }

        if (result > bestResult) {
            bestShift = shift;
            bestResult = result;
        }
    }

    // Расшифровываем текст с использованием лучшего сдвига
    let hackedText = '';
    for (let symbol of encryptedText) {
        const index = arr1.indexOf(symbol);
        if (index !== -1) {
            const newIndex = (index - bestShift + arr1.length) % arr1.length;
            hackedText += arr1[newIndex];
        } else {
            hackedText += symbol; // Символ остается без изменения, если не был найден
        }
    }

    return hackedText;
}

//Вывод зашифрованного текста 
document.getElementById('encryptButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shift').value);
    if (!isNaN(shift)) {
        const encryptedText = encryptText(inputText, shift);
        document.getElementById('outputText').innerText = `Зашифрованный текст: ${encryptedText}`;
    } else {
        alert('Пожалуйста, введите корректное значение сдвига от 0 до 66.');
    }
});

//Вывод дешифрованного текста 
document.getElementById('decryptButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shift').value);
    if (!isNaN(shift)) {
        const decryptedText = decryptText(inputText, shift);
        document.getElementById('outputText').innerText = `Дешифрованный текст: ${decryptedText}`;
    } else {
        alert('Пожалуйста, введите корректное значение сдвига от 0 до 66.');
    }
});

//Вывод взломанного текста
document.getElementById('hackButton').addEventListener('click', () => {
    const encryptedText = document.getElementById('outputText').innerText.replace('Зашифрованный текст: ', '');
    const hackedText = hackText(encryptedText);
    document.getElementById('outputText').innerText = `Взломанный текст: ${hackedText}`;
});