import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from "react-redux";
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './work.scss';

// eslint-disable-next-line react-refresh/only-export-components
const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const theme = useSelector((state) => state.theme.theme);
  const textColor = theme === 'dark' ? '#ffffff' : '#000000';
  const subtleColor = theme === 'dark' ? '#b0b0b0' : '#666666';
  const accentColor = theme === 'dark' ? '#ffffff' : '#3137a2';

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  const filterTags = ['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="work__header"
      >
        <h2 className="head-text" style={{ color: textColor }}>
          My Creative <span style={{ color: accentColor }}>Portfolio</span>
        </h2>
        <p className="work__tagline" style={{ color: subtleColor }}>
          Showcasing my best projects and work samples
        </p>
      </motion.div>

      <motion.div
        className="app__work-filter"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filterTags.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleWorkFilter(item)}
            className={`work__filter-item ${activeFilter === item ? 'item-active' : ''}`}
            style={{
              backgroundColor: activeFilter === item ? accentColor : (theme === 'dark' ? '#1a1a2e' : '#ffffff'),
              color: activeFilter === item ? '#ffffff' : textColor,
              borderColor: accentColor,
            }}
          >
            {item}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.1, staggerChildren: 0.1 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <motion.div 
            key={index}
            whileInView={{ opacity: [0, 1], y: [50, 0] }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}
            className="work__item"
            style={{
              backgroundColor: theme === 'dark' ? '#1a1a2e' : '#ffffff',
              borderColor: accentColor,
            }}
          >
            <div className="work__img-wrapper">
              <img src={urlFor(work?.imgUrl)} alt={work?.name} />
              {/* <div className="work__overlay">
                <motion.div 
                  className="work__tag"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: accentColor,
                    color: '#ffffff',
                  }}
                >
                  {work?.tags ? work?.tags[0] : ''}
                </motion.div>
              </div> */}
            </div>

            <div className="work__content">
              <h4 className="work__title" style={{ color: textColor }}>{work?.title}</h4>
              <p className="work__description" style={{ color: subtleColor }}>
                {work?.description || 'Creative project showcasing design and functionality'}
              </p>
              
              <div className="work__tags-list">
                {work?.tags?.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="tag"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(244, 123, 37, 0.1)',
                      color: accentColor,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);