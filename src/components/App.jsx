import { useDispatch, useSelector } from 'react-redux';
import { addContactToState, deleteContactFromState} from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';
import FormAddContact from './FormAddContact';
import SectionWrap from './SectionWrap';
import ContactsList from './ContactsList';
import FilterByName from './FilterByName';
import { MainTitle, ContactTitle } from './App.styled';

export default function App() {
  const contacts = useSelector(state => state.contacts)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch();

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isExist = contacts.find(contact => contact.name === name);

    isExist
    ? alert(`${name} is already in the contacts`)
    : dispatch(addContactToState(contact))
};

  const deleteContact = contactId => {
    dispatch(deleteContactFromState(contactId))
  };

  const changeFilter = e => {
    dispatch(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const sortedContacts = filteredContacts.sort((x, y) =>
    x.name.localeCompare(y.name)
  );

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
