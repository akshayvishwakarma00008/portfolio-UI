import "./Header.scss";
import { motion } from "framer-motion";
import { AppWrap } from "../../wrapper";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { client, urlFor } from "../../client";


const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};
// eslint-disable-next-line react-refresh/only-export-components
const Header = () => {
  const [data, setData] = useState([]);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const query = '*[_type == "heroSection"]';
    client.fetch(query).then((data) => {
      setData(data);
    });
  }, []);

  console.log(data);

  const textColor = theme === "dark" ? "#ffffff" : "#000000";
  const accentColor = theme === "dark" ? "#c4b5fd" : "#3137a2";
  const cardBg = theme === "dark" ? "#23263e" : "#ffffff";

  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.8 }}
        className="app__header-content"
      >
        <div className="header__intro">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="greeting"
          >
            <span className="greeting-emoji">👋</span>
            <p className="greeting-text" style={{ color: accentColor }}>
              Hello, I'm
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="header__title"
            style={{ color: textColor }}
          >
            <span dangerouslySetInnerHTML={{__html: data.length > 0 ? data[0].name : ''}}/>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="header__subtitle"
            style={{ color: theme === "dark" ? "#b0b0b0" : "#666666" }}
          >
            <span dangerouslySetInnerHTML={{__html: data.length > 0 ? data[0].role : ''}}/>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="header__description"
            style={{ color: theme === "dark" ? "#b0b0b0" : "#666666" }}
          >
            <span dangerouslySetInnerHTML={{__html: data.length > 0 ? data[0].description : ''}}/>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="header__skills"
        >
          <h3 style={{ color: textColor, marginBottom: "1.5rem" }}>
            Tech Stack
          </h3>
          <div className="skills-grid">
            {data.length > 0 && data[0].techStack.map((skill, index) => (
              <motion.div
                key={`skill-${index}`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="skill-card"
                style={{
                  backgroundColor: cardBg,
                }}
              >
                <img className=" skill-icon" src={urlFor(skill.image)} alt={skill.label} />
                <p style={{ color: textColor }}>{skill.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="app__header-visual"
      >
        <div
          className="visual-element"
          style={{ background: accentColor }}
        ></div>
        <div
          className="visual-element-secondary"
          style={{ background: accentColor, opacity: 0.15 }}
        ></div>
      </motion.div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default AppWrap(Header, "home", "app__primarybg");
