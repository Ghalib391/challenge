// Selección de elementos del DOM
const inputText = document.getElementById('input-text');
const encryptButton = document.getElementById('encrypt-btn');
const decryptButton = document.getElementById('decrypt-btn');
const outputText = document.getElementById('output-text');
const copyButton = document.getElementById('copy-btn');
const validationMessage = document.getElementById('validation-message');
const noMessageContainer = document.getElementById('no-message');
const outputContainer = document.getElementById('output-container');

// Función para encriptar el texto
function encrypt(text) {
    const replacements = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };
    return text.replace(/[aeiou]/g, letter => replacements[letter]);
}

// Función para desencriptar el texto
function decrypt(text) {
    const replacements = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };
    return text.replace(/enter|imes|ai|ober|ufat/g, match => replacements[match]);
}

// Función para validar la entrada del usuario
function isValidInput(text) {
    return /^[a-z\s]*$/.test(text);
}

// Función para actualizar la interfaz de usuario
function updateUI(text) {
    if (text) {
        noMessageContainer.classList.add('hidden');
        outputText.classList.remove('hidden');
        copyButton.classList.remove('hidden');
        outputText.value = text;
    } else {
        noMessageContainer.classList.remove('hidden');
        outputText.classList.add('hidden');
        copyButton.classList.add('hidden');
        outputText.value = '';
    }
}

// Manejador del evento de encriptación
encryptButton.addEventListener('click', () => {
    const text = inputText.value;
    if (isValidInput(text)) {
        const encryptedText = encrypt(text);
        updateUI(encryptedText);
        validationMessage.classList.add('hidden');
    } else {
        validationMessage.classList.remove('hidden');
        updateUI('');
    }
});

// Manejador del evento de desencriptación
decryptButton.addEventListener('click', () => {
    const text = inputText.value;
    if (isValidInput(text)) {
        const decryptedText = decrypt(text);
        updateUI(decryptedText);
        validationMessage.classList.add('hidden');
    } else {
        validationMessage.classList.remove('hidden');
        updateUI('');
    }
});

// Manejador del evento de copiado
copyButton.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputText.value);
        const originalText = copyButton.textContent;
        copyButton.textContent = '¡Copiado!';
        copyButton.disabled = true;
        setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.disabled = false;
        }, 2000);
    } catch (err) {
        console.error('Error al copiar texto: ', err);
        alert('No se pudo copiar el texto. Por favor, inténtalo de nuevo.');
    }
});

// Inicializar la interfaz
updateUI('');