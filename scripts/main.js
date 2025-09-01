const passwordDisplay = document.getElementById('passwordDisplay');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const notification = document.getElementById('notification');
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numbersChars = '0123456789';
const symbolsChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function genPass() {
    const length = lengthSlider.value;
    const useUppercase = includeUppercase.checked;
    const useLowercase = includeLowercase.checked;
    const useNumbers = includeNumbers.checked;
    const useSymbols = includeSymbols.checked;

    let charPool = '';
    if (useUppercase) charPool += uppercaseChars;
    if (useLowercase) charPool += lowercaseChars;
    if (useNumbers) charPool += numbersChars;
    if (useSymbols) charPool += symbolsChars;

    if (charPool === '') {
        passwordDisplay.textContent = 'Choose at least one option';
        return;
    }

    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    passwordDisplay.textContent = password;
}

lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

generateBtn.addEventListener('click', () => {
    genPass();
});

copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.textContent;

    if (!password || password.startsWith('Choose at least one option')) {
        return;
    }

    navigator.clipboard.writeText(password);

    notification.textContent = 'Password copied successfully!';
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
});
