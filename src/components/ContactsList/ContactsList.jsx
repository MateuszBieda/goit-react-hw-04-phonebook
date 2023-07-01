import { nanoid } from 'nanoid';
import css from './ContactsList.module.css'
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={css.list}>
    {contacts.map(({ id = nanoid(), name, number }) => (
      <li className={css.list_item} key={id}>
        <p>
          {name}:<span> </span>
          {number}
        </p>
        <button className={css.button_delete} type="submit" onClick={() => onDeleteContact(id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);


ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    onDeleteContact: PropTypes.func.isRequired,
  };