import { useState } from 'react';
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

// eslint-disable-next-line react-refresh/only-export-components
const Footer = () => {
  const [formData, setFormData] = useState({ username: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const { username, email, message } = formData;

  const textColor = theme === 'dark' ? '#ffffff' : '#000000';
  const subtleColor = theme === 'dark' ? '#b0b0b0' : '#666666';
  const accentColor = theme === 'dark' ? '#23263d' : '#3137a2';
  const cardBg = theme === 'dark' ? '#23263e' : '#ffffff';
  const inputBg = theme === 'dark' ? '#2a2a3e' : '#f8f8f8';

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    if (!formData.username || !formData.email || !formData.message) {
      setLoading(false);
      return alert("Oops! It looks like you missed some fields. Please complete the form.");
    }
    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
        setTimeout(() => {
          setFormData({ username: '', email: '', message: '' });
          setIsFormSubmitted(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const contactMethods = [
    {
      icon: '✉️',
      label: 'Email',
      value: 'akshayvishwakarma812@gmail.com',
      link: 'mailto:akshayvishwakarma812@gmail.com',
      desc: 'Send me a direct email'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: '@akshay-vishwakarma',
      link: 'https://linkedin.com',
      desc: 'Connect on LinkedIn'
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: '@akshayvishwakarma00008',
      link: 'https://github.com',
      desc: 'Check my projects'
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="footer__header"
      >
        <h2 className="head-text" style={{ color: textColor }}>
          Get In <span style={{ color: accentColor }}>Touch</span>
        </h2>
        <p className="footer__tagline" style={{ color: subtleColor }}>
          Feel free to reach out for collaborations or just a friendly hello
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="app__footer-cards"
      >
        {contactMethods.map((method, index) => (
          <motion.a
            key={index}
            href={method.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -5 }}
            className="app__footer-card"
            style={{
              backgroundColor: cardBg,
            }}
          >
            <span className="contact__icon">{method.icon}</span>
            <div className="contact__info">
              <h4 style={{ color: textColor }}>{method.label}</h4>
              <p style={{ color: subtleColor }}>{method.value}</p>
              <p className="contact__desc" style={{ color: accentColor }}>{method.desc}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {!isFormSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="footer__form-container"
        >
          <div className="form__wrapper">
            <h3 style={{ color: textColor, marginBottom: '2rem', fontSize: '1.3rem', fontWeight: '600' }}>
              Send Me a Message
            </h3>
            <div className="app__footer-form">
              <div className="form__group">
                <input
                  className="form__input"
                  type="text"
                  placeholder="Your Name"
                  name="username"
                  value={username}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="form__group">
                <input
                  className="form__input"
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="form__group">
                <textarea
                  className="form__textarea"
                  placeholder="Your Message"
                  value={message}
                  name="message"
                  onChange={handleChangeInput}
                />
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="form__button"
                onClick={handleSubmit}
                style={{
                  backgroundColor: accentColor,
                  color: '#ffffff',
                }}
              >
                {!loading ? 'Send Message' : 'Sending...'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="form__success"
        >
          <div className="success__content">
            <div className="success__icon">✓</div>
            <h3 style={{ color: textColor }}>
              Message Sent Successfully!
            </h3>
            <p style={{ color: subtleColor }}>
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg',
);