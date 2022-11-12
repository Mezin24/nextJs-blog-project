import { useState, useEffect } from 'react';
import Notification from '../../components/ui/notification';
import classes from './contact-form.module.css';

const sendMessage = async (newMessage) => {
  fetch('api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMessage),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.message || 'Something went wrong');
    }
    return res.json();
  });
};

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (
      notification !== null &&
      (notification.status === 'success' || notification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

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

  const submitHandler = async (e) => {
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

    setNotification({
      status: 'pending',
      title: 'Pending',
      message: 'Your message sending...',
    });
    try {
      await sendMessage({
        name,
        email,
        message,
      });
      setNotification({
        status: 'success',
        title: 'Success',
        message: 'Your message was sent successfuly!',
      });
      setEmail('');
      setName('');
      setMessage('');
    } catch (error) {
      setErrorMsg(error.message);
      setNotification({
        status: 'error',
        title: 'Error',
        message: errorMsg,
      });
    }
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
      {notification && <Notification {...notification} />}
    </section>
  );
};

export default ContactForm;
