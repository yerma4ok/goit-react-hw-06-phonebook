import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import FormAddContact from './FormAddContact';
import SectionWrap from './SectionWrap';
import ContactsList from './ContactsList';
import FilterByName from './FilterByName';
import { MainTitle, ContactTitle } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isExist = contacts.find(contact => contact.name === name);

    isExist
      ? alert(`${name} is already in the contacts`)
      : setContacts([contact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const sortedContacts = filteredContacts.sort((x, y) =>
    x.name.localeCompare(y.name)
  );

  useEffect(() => {
    const contactsList = localStorage.getItem('contactsList');
    const parsedContactsList = JSON.parse(contactsList);
    if (!parsedContactsList) {
      return;
    }
    setContacts(parsedContactsList);
  }, []);

  useEffect(() => {
    if (contacts.length === 0) {
      return;
    }
    localStorage.setItem('contactsList', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <SectionWrap>
        <MainTitle>Phonebook</MainTitle>
        <FormAddContact onAddFormSubmit={addContact} />
      </SectionWrap>
      <SectionWrap>
        <ContactTitle>Contacts</ContactTitle>
        <FilterByName value={filter} onChange={changeFilter} />
        <ContactsList contacts={sortedContacts} deleteContact={deleteContact} />
      </SectionWrap>
    </>
  );
}
