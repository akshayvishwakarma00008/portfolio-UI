
// eslint-disable-next-line react/prop-types
const NavigationDots = ({ active }) => (
  <div className="app__navigation">
    {/* removing testimonial */}
    {['home', 'about', 'work', 'skills', 'contact'].map((item, index) => (
      <a
        href={`#${item}`}
        key={item + index}
        className="app__navigation-dot"
        style={active === item ? { backgroundColor: '#313BAC' } : {}}
      />
    ))}
  </div>
);

export default NavigationDots;