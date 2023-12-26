document.addEventListener('DOMContentLoaded', function () {
    const letterInputs = document.querySelectorAll('.letter-input');

    letterInputs.forEach(input => {
        input.addEventListener('input', function () {
            // Ensure that only uppercase letters are allowed
            this.value = this.value.toUpperCase();

            // Validate that the entered character is a letter
            const isValidLetter = /^[A-Z]$/i.test(this.value);

            const errorMessage = createErrorMessageElement(this); // Create or retrieve the error message element

            if (!isValidLetter) {
                showErrorMessageAboveInput(input, errorMessage, 'Invalid input! Please enter a letter.');
                setTimeout(() => hideErrorMessage(errorMessage), 1500);
            } else {
                hideErrorMessage(errorMessage);
            }

            // Validate that the entered letter is unique among all textboxes
            const currentInputId = this.id;
            letterInputs.forEach(otherInput => {
                if (otherInput.id !== currentInputId && otherInput.value && otherInput.value === this.value) {
                    showErrorMessageAboveInput(input, errorMessage, 'Duplicate letter! Please enter a unique letter for each textbox.');
                    setTimeout(() => hideErrorMessage(errorMessage), 1500);
                }
            });
        });
    });

    function createErrorMessageElement(input) {
        // Check if an error message element already exists for this input
        const existingErrorMessage = input.nextElementSibling;
        if (existingErrorMessage && existingErrorMessage.classList.contains('error-message')) {
            return existingErrorMessage;
        }

        // Create a new error message element
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.style.display = 'none';
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
        return errorMessage;
    }

    function showErrorMessageAboveInput(input, element, message) {
        element.textContent = message;
        element.style.display = 'block';
        const inputRect = input.getBoundingClientRect();
        element.style.top = inputRect.top - element.offsetHeight - 5 + 'px';
        element.style.left = inputRect.left + 'px';
    }

    function hideErrorMessage(element) {
        element.textContent = '';
        element.style.display = 'none';
    }
});
