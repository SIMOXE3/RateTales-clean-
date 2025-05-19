document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const displayName = document.querySelector('.profile-text h2');
    const username = document.querySelector('.username');
    const aboutContent = document.querySelector('.about-content');
    const editIcon = document.querySelector('.edit-icon');

    // Get modals
    const nameModal = document.getElementById('nameModal');
    const usernameModal = document.getElementById('usernameModal');
    const aboutModal = document.getElementById('aboutModal');

    // Get inputs
    const displayNameInput = document.getElementById('displayNameInput');
    const usernameInput = document.getElementById('usernameInput');
    const aboutInput = document.getElementById('aboutInput');

    // Initialize about content if empty
    if (!aboutContent.textContent.trim()) {
        aboutContent.textContent = 'Click to add your bio...';
    }

    // Function to show modal
    function showModal(modal, input, currentValue) {
        input.value = currentValue;
        modal.classList.add('active');
        input.focus();
    }

    // Function to hide modal
    function hideModal(modal) {
        modal.classList.remove('active');
    }

    // Handle display name edit
    editIcon.addEventListener('click', () => {
        const currentName = displayName.childNodes[0].textContent.trim();
        showModal(nameModal, displayNameInput, currentName);
    });

    // Handle username edit
    username.addEventListener('click', () => {
        const currentUsername = username.textContent.trim();
        showModal(usernameModal, usernameInput, currentUsername);
    });

    // Handle about content edit
    aboutContent.addEventListener('click', () => {
        const currentAbout = aboutContent.textContent.trim();
        const defaultText = 'Click to add your bio...';
        showModal(aboutModal, aboutInput, currentAbout === defaultText ? '' : currentAbout);
    });

    // Handle modal buttons
    document.querySelectorAll('.modal').forEach(modal => {
        const saveBtn = modal.querySelector('.save-btn');
        const cancelBtn = modal.querySelector('.cancel-btn');

        saveBtn.addEventListener('click', () => {
            let newValue = '';
            switch(modal.id) {
                case 'nameModal':
                    newValue = displayNameInput.value.trim();
                    if (newValue) {
                        displayName.innerHTML = newValue + ' <span class="edit-icon">✏️</span>';
                    }
                    break;
                case 'usernameModal':
                    newValue = usernameInput.value.trim();
                    if (newValue) {
                        username.textContent = newValue;
                    }
                    break;
                case 'aboutModal':
                    newValue = aboutInput.value.trim();
                    aboutContent.textContent = newValue || 'Click to add your bio...';
                    break;
            }
            hideModal(modal);
        });

        cancelBtn.addEventListener('click', () => {
            hideModal(modal);
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });
});