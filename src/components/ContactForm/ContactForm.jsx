import { Component } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';

export class Form extends Component {
  state = {
    id: nanoid(),
    name: '',
    number: '',   
  };

  handleInput = inputName => e => {
    this.setState({
      [inputName]: e.target.value,
    });
  };

  handleSubmit = event => {
    const { id,name, number } = this.state;
    event.preventDefault();
    this.props.onSubmit({ id, name, number });
    localStorage.setItem('contacts',JSON.stringify(this.state));
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '', id: nanoid() });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label>
          <p className={css.paragraph}>Name</p>
          <input
            className={css.input}
            id="name"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleInput('name')}
          />
        </label>
        <label>
          <p className={css.paragraph}>Number</p>
          <input
            className={css.input}
            id="number"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleInput('number')}
          />
        </label>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
