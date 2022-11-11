import { useState } from 'react';
import classes from './contact-form.module.css';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'message':
        setMessage(value);
        break;

      default:
        break;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      return alert('Invalid input');
    }

    fetch('api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmail('');
        setName('');
        setMessage('');
        console.log(data);
      });
  };

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              value={email}
              type='email'
              id='email'
              name='email'
              required
              onChange={onChangeHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              onChange={onChangeHandler}
              value={name}
              type='text'
              id='name'
              name='name'
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            onChange={onChangeHandler}
            value={message}
            name='message'
            id='message'
            rows='5'
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
