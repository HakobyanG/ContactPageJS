let contacts = [
    {   id: 1, 
        name: 'Garnik Hakobyan', 
        phone: '+37493631816', 
        picture: 'https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg',
        data: '00/00/0000',
        location: 'Armenia' },
    {   id: 2, 
        name: 'User ', 
        phone: '+37412345678', 
        picture: 'https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg',
        data: '22/22/2222',
        location: 'Armenia' },
];

let a = 0;
let b = true;

const contactsContainer = document.getElementById('contactsContainer');

function renderContacts() {
    contactsContainer.innerHTML = '';

    contacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.classList.add('contact');
        contactElement.id = 'contact';

        const img = document.createElement('img');
        img.src = contact.picture;
        img.alt = contact.name;
        img.width = 50;

        const contactInfo = document.createElement('div');
        contactInfo.id = 'contactInfo';
        contactInfo.innerHTML = `<p><strong>Name:</strong> ${contact.name}</p><p><strong>Phone:</strong> ${contact.phone}</p>`;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editContact(contact.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteContact(contact.id));

        const moreBtn = document.createElement('button');
        moreBtn.textContent = 'More';
        moreBtn.classList.add('more-btn');
        moreBtn.addEventListener('click', () => moreContact(contact.id));

        contactElement.appendChild(img);
        contactElement.appendChild(contactInfo);
        contactElement.appendChild(editBtn);
        contactElement.appendChild(deleteBtn);
        contactElement.appendChild(moreBtn);

        contactsContainer.appendChild(contactElement);
    });
}

function addContact() {
    const name = prompt('Enter the contact name:');
    const phone = prompt('Enter the contact phone:(only number)');
    const picture = prompt('Enter the URL of the contact picture:');
    const data = prompt('Enter the contact data of birth:dd/mm/yyyy');
    const location = prompt('Enter the contact location:');
    const isValid = /^[0-9+]+$/.test(phone);

    const newContact = {
        id: contacts.length + 1,
        name,
        phone,
        picture,
        data,
        location
    };

    if (name.length == 0 || phone.length == 0 || picture.length == 0 || data.length == 0 || location.length == 0)  {
        alert("Fill in all fields, please")
    }else if(isValid){
        contacts.push(newContact);
        renderContacts();
    }else {
        alert('Please enter a valid phone number (only numbers are allowed).');
    }
}

function editContact(contactId) {
    const contact = contacts.find(c => c.id === contactId);

    if (!contact) {
        alert('Contact not found');
        return;
    }

    const newName = prompt('Enter the new name:', contact.name);
    const newPhone = prompt('Enter the new phone:', contact.phone);
    const newPicture = prompt('Enter the new URL of the picture:', contact.picture);
    const newData = prompt('Enter the new data:', contact.data);
    const newLocation = prompt('Enter the new location:', contact.location);
    const isValid = /^[0-9+]+$/.test(newPhone);

    if (newName.length == 0 || newPhone.length == 0 || newPicture.length == 0 || newData.length == 0 || newLocation.length == 0) {
        alert("Fill in all fields, please")
    } else if(isValid){
        Object.assign(contact, { name: newName, phone: newPhone, picture: newPicture, data: newData, location: newLocation });
        renderContacts();
    } else {
        alert('Please enter a valid phone number (only numbers are allowed).');
    }
}

function deleteContact(contactId) {
    const userResponse = confirm('Are you sure you want to delete this contact?');

    if (userResponse){
        contacts = contacts.filter(c => c.id !== contactId);
        renderContacts();
    } else {
        alert('Deletion canceled.');
    }
    
}

function moreContact(contactId){
    a+=1;
    if (b){
        const contactList = document.getElementById('contactsContainer');
        const contact = contacts.find(c => c.id === contactId);

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${contact.picture}" alt="Profile Picture" width="100"><br>
            <strong>${contact.name}</strong><br>
            Phone: ${contact.phone}<br>
            Date of Birth: ${contact.data}<br>
            Location: ${contact.location}<br>
        `;
        contactList.appendChild(listItem);
        a++;
    } else {
        renderContacts();
        a = 0;
        b = true;
    }
    
    if (a==2){
        b = false;
        a = 0;
    }
}

renderContacts();