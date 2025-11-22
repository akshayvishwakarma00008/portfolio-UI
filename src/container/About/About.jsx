import "./About.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";
import { useSelector } from "react-redux";

// eslint-disable-next-line react-refresh/only-export-components
const About = () => {
  // eslint-disable-next-line no-unused-vars
  const [aboutMe, setAboutMe] = useState([]);
  const theme = useSelector((state) => state.theme.theme);

  const textColor = theme === 'dark' ? '#ffffff' : '#000000';
  const subtleColor = theme === 'dark' ? '#b0b0b0' : '#666666';
  const accentColor = theme === 'dark' ? '#c4b5fd' : '#3137a2';
  const cardBg = theme === 'dark' ? '#1a1a2e' : '#f8f8f8';

  useEffect(() => {
    const query = '*[_type == "aboutMe"]';
    client.fetch(query).then((data) => {
      setAboutMe(data);
    });
  }, []);

  console.log(aboutMe);

  const skills = [
    { category: 'Frontend', items: ['React.js', 'JavaScript', 'SCSS', 'HTML5'] },
    { category: 'Backend', items: ['Node.js', 'Django', 'Python', 'REST APIs'] },
    { category: 'Database', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'] },
    { category: 'Tools', items: ['Jira', 'Monday', 'Git', 'Docker'] },
  ];

  const highlights = [
    { icon: '⚡', label: 'B2B E-commerce', desc: 'Scalable platforms' },
    { icon: '🎨', label: 'UI/UX Design', desc: 'Intuitive components' },
    { icon: '🔌', label: 'Real-time APIs', desc: 'WebSocket integration' },
    { icon: '🚀', label: 'Performance', desc: 'Optimized solutions' },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about__header"
      >
        <h2 className="head-text" style={{ color: textColor }}>
          About <span style={{ color: accentColor }}>Me</span>
        </h2>
        <p className="about__tagline" style={{ color: subtleColor }}>
          Full-Stack Developer | Problem Solver | Tech Enthusiast
        </p>
      </motion.div>

      <motion.div
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, type: "tween" }}
        className="about__content"
      >
        <div className="about__main">
          <div
            className="app__description"
            style={{ color: subtleColor }}
            dangerouslySetInnerHTML={{ __html: aboutMe.length > 0 ? aboutMe[0].description : '' }}
          />
        </div>

        <div className="about__highlights">
          <h3 style={{ color: textColor, marginBottom: '2rem', fontSize: '1.3rem', fontWeight: '600' }}>Key Strengths</h3>
          <div className="highlights__grid">
            {highlights.map((item, index) => (
              <motion.div
                key={`highlight-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="highlight__card"
                style={{ backgroundColor: cardBg }}
              >
                <span className="highlight__icon">{item.icon}</span>
                <h4 style={{ color: textColor }}>{item.label}</h4>
                <p style={{ color: subtleColor }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="about__skills"
      >
        <h3 style={{ color: textColor, marginBottom: '2rem', fontSize: '1.3rem', fontWeight: '600' }}>Technical Stack</h3>
        <div className="skills__container">
          {skills.map((skillGroup, idx) => (
            <div key={`skill-group-${idx}`} className="skill__group">
              <h4 style={{ color: accentColor, marginBottom: '1rem', fontWeight: '600' }}>{skillGroup.category}</h4>
              <div className="skill__items">
                {skillGroup.items.map((skill, index) => (
                  <motion.div
                    key={`skill-${index}`}
                    whileHover={{ scale: 1.05 }}
                    className="skill__item"
                    style={{
                      backgroundColor: cardBg,
                      borderColor: accentColor,
                      color: textColor,
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
