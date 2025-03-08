import { useState } from "react";
import "./Navbar.scss";

import { HiMenuAlt4, HiX } from "react-icons/hi";

import { motion } from "framer-motion";
import DownloadResume from "./DownloadResume";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../../redux/slices/AppTheme/AppTheme";
import { FaSun, FaMoon } from "react-icons/fa";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  // console.log("theme",theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="app__navbar" style={{backgroundColor:theme === 'dark' ? '#20171f':""}}>
      <div className="app__navbar-logo">
        <span
          style={{ fontSize: "2rem", fontWeight: "bold", color:theme === 'dark' ? '#ffffff' :"#293aa2"}}
        >
          PORTFOLIO
        </span>
      </div>
      <ul className="app__navbar-links">
        {["home", "about", "work", "skills", "contact"].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div>
              <a href={`#${item}`} style={{color:theme === 'dark' ? '#ffffff' :"#293aa2"}}>{item}</a>
            </div>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {["home", "about", "work", "skills", "contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      <div className="theme-toggle" onClick={handleToggle} style={{ marginRight: "15px", cursor:"pointer" }}>
        {theme === "dark" ? <FaSun size={18} color="#ffffff" /> : <FaMoon size={18} color="#293aa2" />}
      </div>

      <div>
        <DownloadResume />
      </div>
    </nav>
  );
};

export default Navbar;
