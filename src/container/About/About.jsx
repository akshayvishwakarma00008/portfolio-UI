import "./About.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { urlFor, client } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";

// eslint-disable-next-line react-refresh/only-export-components
const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        {/* I Know that <span>Good Design</span> <br />
        means <span>Good Business</span> */}
        About <span>Me</span>
      </h2>
      <motion.div
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5, type: "tween" }}
        //className="app__profile-item"
      >
        <h3 className="app__description">
          I’m a Software Developer with a passion for building scalable and
          high-performance applications that deliver exceptional user
          experiences. With expertise in <strong>React.js</strong>, <strong>Node.js</strong>, and <strong>Django Rest
          Framework</strong>, I specialize in developing B2B e-commerce platforms,
          crafting intuitive UI/UX components, and designing robust APIs that
          drive seamless data flow and real-time communication. I have hands-on
          experience working with <strong>MongoDB</strong> and <strong>MySQL</strong>, efficiently managing and
          optimizing databases for performance and scalability. On the backend,
          I architect <strong>RESTful APIs</strong>, implement real-time WebSocket features, and
          ensure smooth integration between frontend and backend services. I
          thrive in agile development environments, leading sprints, managing
          tasks with <strong>Jira</strong> and <strong>Monday</strong>, and ensuring on-time project delivery. I
          also enjoy mentoring junior developers, conducting thorough code
          reviews, and implementing best practices for maintainability and
          performance optimization. As a technology enthusiast, I constantly
          explore new tools and frameworks to push the boundaries of innovation
          and deliver cutting-edge solutions.
        </h3>
      </motion.div>
      {/* <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imageurl).url()} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div> */}
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
