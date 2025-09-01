document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const passwordDisplay = document.getElementById('passwordDisplay');
    const copyBtn = document.getElementById('copyBtn');
    const generateBtn = document.getElementById('generateBtn');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const notification = document.getElementById('notification');

    // Character sets
    const characterSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]\\:;?>,<./-='
    };

    // Update length display
    lengthSlider.addEventListener('input', updateLengthDisplay);
    updateLengthDisplay();

    // Generate password on button click
    generateBtn.addEventListener('click', generatePassword);

    // Copy to clipboard functionality
    copyBtn.addEventListener('click', copyToClipboard);

    // Generate initial password
    generatePassword();

    function updateLengthDisplay() {
        lengthValue.textContent = lengthSlider.value;
    }

    function generatePassword() {
        let characters = '';
        let password = '';

        // Build character set based on selected options
        if (includeUppercase.checked) characters += characterSets.uppercase;
        if (includeLowercase.checked) characters += characterSets.lowercase;
        if (includeNumbers.checked) characters += characterSets.numbers;
        if (includeSymbols.checked) characters += characterSets.symbols;

        // Check if at least one character set is selected
        if (characters.length === 0) {
            showNotification('Please select at least one character type');
            return;
        }

        // Generate password
        for (let i = 0; i < lengthSlider.value; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        passwordDisplay.textContent = password;
    }

    function copyToClipboard() {
        if (!passwordDisplay.textContent) {
            showNotification('No password to copy');
            return;
        }

        navigator.clipboard.writeText(passwordDisplay.textContent)
            .then(() => {
                showNotification('Password copied to clipboard!');
                // Visual feedback
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="far fa-copy"></i>';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                showNotification('Failed to copy password');
            });
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});
