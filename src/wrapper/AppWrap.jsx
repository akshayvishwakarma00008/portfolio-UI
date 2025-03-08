import { NavigationDots, SocialMedia } from "../components";
import { useSelector } from "react-redux";

const AppWrap = (Component, idName, classNames) =>
  
  function HOC() {
    const theme = useSelector((state) => state.theme.theme);
    return (
      <div
        id={idName}
        className={`app__container ${classNames}`}
        style={{
          backgroundColor:
            theme === "dark"
              ? idName === "about" || idName === "skills"
                ? "#20171f"
                : "#1a1a2b"
              : "",
        }}
      >
        <SocialMedia />
        <div className="app__wrapper app__flex">
          <Component />

          <div className="copyright">
            <p className="p-text" style={{color:theme === 'dark'?'#ffffff':""}}>@2025 Akshay</p>
            <p className="p-text" style={{color:theme === 'dark'?'#ffffff':""}}>All rights reserved</p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
