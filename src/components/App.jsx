import { Component } from 'react';
import { Form } from './ContactForm/ContactForm.jsx';
import { Filter } from './Filter/Filter.jsx';
import { ContactList } from './ContactsList/ContactsList.jsx';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'Yurii Soroka', number: '111-11-11' },
    ],
    filter: '',
  };
  // handleDelete = id => {
  //   const contacts = [...this.state.contacts];
  //   const updated = contacts.filter(contact => contact.id !== id);
  //   this.setState({ contacts: updated });
  // };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
    const { contacts } = this.props;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  newContactAudit = newContact => {
    return this.state.contacts.filter(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
  };

  contactFormSubmitHandler = newContact => {
    if (this.newContactAudit(newContact).length > 0) {
      alert(`${newContact.name} is already in contacts.`);
      return false;
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
      return true;
    }
  };

  contactFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState(() => ({ parsedContacts }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const contacts = JSON.stringify(this.state.contacts);
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', contacts);
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filterValueLowerCase = filter.toLowerCase();

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValueLowerCase)
    );

    return (
      <div>
        <h1
          style={{
            marginLeft: '25px',
          }}
        >
          Phonebook
        </h1>
        <Form onSubmit={this.contactFormSubmitHandler} />

        <h2
          style={{
            marginLeft: '25px',
          }}
        >
          Contacts
        </h2>
        <Filter filterValue={filter} onChange={this.contactFilter} />
        <ContactList
          onDeleteContact={this.deleteContact}
          contacts={visibleContacts}
        />
      </div>
    );
  }
}
