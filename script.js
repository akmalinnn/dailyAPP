const addForm = document.querySelector('.add-input');
const list = document.querySelector('.list-group');

const generateTemplate = todo => {
    const html = `
    <li class="list-item">
        <span>${todo}</span>
        <i class="far fa-trash-alt delet"></i>
    </li>
    `;
    list.innerHTML += html;
};

addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();

    if (todo.length) {
        generateTemplate(todo);
        addForm.reset();
    }
});
