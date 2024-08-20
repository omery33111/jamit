import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';



const GenFooter = () => {
  return (
    <div className="wrapper">
    <div className="content">

    </div>

    <footer className="footer">

      <a href="https://github.com/omery33111" className = "footer-text">
        <FontAwesomeIcon icon={faGithub} size="2x" className = "footer-icons"/>
      </a>

      <a href="https://www.linkedin.com/in/omer-yanai/" className = "footer-text">
        <FontAwesomeIcon icon={faLinkedin} size="2x" className = "footer-icons"/>
      </a>

      <p>
        Copyright &copy; {new Date().getFullYear()} Omer Yanai
      </p>

    </footer>
  </div>
  );
};

export default GenFooter;