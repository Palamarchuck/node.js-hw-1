const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json")

console.log(contactsPath);

// TODO: задокументировать каждую функцию
const listContacts = async()=>{
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

const getContactById = async(contactId)=>{
  const contacts = await listContacts();
  // const contactId = String(id); // Для Yargs
  const result = contacts.find(item => item.id === contactId);
  return result || null;
}

const removeContact = async(contactId)=>{
  const contacts = await listContacts();
  // const contactId = String(id); // Для Yargs
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  return result;
}

const addContact = async({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}