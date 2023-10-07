// const fs = require('fs/promises')
import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactPath = path.resolve('models', 'contacts.json');

const listContacts = async () => {
  const buffer = await fs.readFile(contactPath);
  return JSON.parse(buffer);
};

const getContactById = async (id) => {
  const contactsList = await listContacts();
  const contact = contactsList.find((contact) => contact.id === id);
  return contact || null;
}

const removeContact = async (id) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null
  }

  const [deletedContact] = contactsList.splice(index, 1);

  await fs.writeFile(contactPath, JSON.stringify(contactsList, null, 2));

  return deletedContact;
}

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const contactsList = await listContacts();
  contactsList.push(newContact);

  await fs.writeFile(contactPath, JSON.stringify(contactsList, null, 2));

  return newContact;
}

const updateContact = async (id, { name, email, phone }) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === id);

  if(index === -1) {
    return null;
  }

  contactsList[index] = {id, name, email, phone };

  await fs.writeFile(contactPath, JSON.stringify(contactsList, null, 2));

  return contactsList[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
