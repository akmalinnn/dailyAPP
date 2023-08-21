const addForm = document.querySelector('.add-input');
const list = document.querySelector('.list-group');
const search = document.querySelector('.custom-input');
const noItemsMessage = document.querySelector('.no-items-message');

const generateTemplate = todo => {
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.innerHTML = `
        <span>${todo}</span>
        <i class="far fa-trash-alt delet"></i>
    `;
    list.insertBefore(listItem, list.firstChild); // Insert at the beginning
};

addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();

    if (todo.length) {
        generateTemplate(todo);
        addForm.reset();
        updateNoItemsMessage();
    }
});

list.addEventListener('click', e => {
    if (e.target.classList.contains('delet')) {
        e.target.parentElement.remove();
        updateNoItemsMessage(); // Call the function after removing an item
    } else if (e.target.tagName === 'SPAN') {
        e.target.classList.toggle('completed');

        const completedItems = list.querySelectorAll('.completed');
        const notCompletedItems = list.querySelectorAll(':not(.completed)');
            
        completedItems.forEach(item => list.appendChild(item.parentNode));
        notCompletedItems.forEach(item => list.appendChild(item.parentNode));
        

    }
});

const updateNoItemsMessage = () => {
    const listItems = list.querySelectorAll('.list-item');
    
    if (listItems.length === 0) {
        noItemsMessage.style.display = 'block';
        search.style.display = 'none';
    } else {
        noItemsMessage.style.display = 'none';
        search.style.display = 'block';
    }
};

const filterTodos = term => {
    const listItems = Array.from(list.children);
    
    listItems.forEach(item => {
        const todoText = item.querySelector('span').textContent.toLowerCase();
        if (todoText.includes(term)) {
            item.classList.remove('hidden'); // Remove 'hidden' class
        } else {
            item.classList.add('hidden'); // Add 'hidden' class
        }

        
    });

     // Update the message after filtering
};

search.addEventListener('keyup', e => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);

    if (term === '') {
        Array.from(list.children).forEach(item => {
            item.classList.remove('hidden');
        });
    }
});






