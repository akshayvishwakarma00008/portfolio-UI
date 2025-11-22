import React,{ useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { useSelector } from "react-redux";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";

// eslint-disable-next-line react-refresh/only-export-components
const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const theme = useSelector((state) => state.theme.theme);

  const textColor = theme === 'dark' ? '#ffffff' : '#000000';
  const subtleColor = theme === 'dark' ? '#b0b0b0' : '#666666';
  const accentColor = theme === 'dark' ? '#23263e' : '#3137a2';
  const cardBg = theme === 'dark' ? '#23263e' : '#f8f8f8';

  useEffect(() => {
    const query = '*[_type == "experiences"] | order(year desc) ';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="skills__header"
      >
        <h2 className="head-text" style={{ color: textColor }}>
          Skills & <span style={{ color: accentColor }}>Experiences</span>
        </h2>
        <p className="skills__tagline" style={{ color: subtleColor }}>
          Tools, Technologies & Professional Journey
        </p>
      </motion.div>

      <div className="app__skills-container">
        <motion.div 
          className="app__skills-list"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={{ color: textColor, marginBottom: '2rem' }}>Technical Skills</h3>
          <div className="skills__grid">
            {skills?.map((skill, index) => (
              <motion.div
                key={skill._id}
                whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="app__skills-item"
                data-tooltip-id={skill.name}
              >
                <motion.div
                  className="skill__icon-wrapper"
                  style={{ backgroundColor: cardBg }}
                >
                  <img src={urlFor(skill.icon)} alt={skill.name} />
                </motion.div>
                <p className="skill__name" style={{ color: textColor }}>{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="app__skills-exp"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 style={{ color: textColor, marginBottom: '2rem' }}>Professional Experience</h3>
          {experiences?.map((experience, idx) => (
            <div key={experience._id} className="experience__group">
              <motion.div 
                className="experience__year"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="year__badge" style={{ backgroundColor: accentColor }}>
                  <p className="year__text" style={{ color: '#fff' }}>{experience.year}</p>
                </div>
              </motion.div>

              <motion.div 
                className="experience__works"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                {experience.works.map((work) => (
                  <React.Fragment key={work._key}>
                    <motion.div
                      whileHover={{ x: 10, backgroundColor: cardBg }}
                      transition={{ duration: 0.3 }}
                      className="experience__work-item"
                      style={{ 
                        borderLeftColor: accentColor,
                        backgroundColor: theme === 'dark' ? '#23263e' : '#ffffff'
                      }}
                      // data-tooltip-id={work.description}
                    >
                      <div className="work__content">
                        <h4 className="work__title" style={{ color: textColor }}>{work.name}</h4>
                        <p className="work__company" style={{ color: subtleColor }}>@ {work.company}</p>
                        <p className="work__description" style={{ color: subtleColor }}>
                          {work.description}
                        </p>
                      </div>
                    </motion.div>
                    <Tooltip
                      id={work.description}
                      effect="solid"
                      className="skills-tooltip"
                    >
                      {work.description}
                    </Tooltip>
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
