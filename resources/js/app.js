document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.querySelector('.todo__dialog');
    const taskButton = document.querySelector('.todo__add-task');
    taskButton.addEventListener('click', () => {
        console.log('clicked');
        dialog.showModal();
    });
});