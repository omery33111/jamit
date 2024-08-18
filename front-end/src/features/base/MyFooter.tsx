import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';



const MyFooter = () => {



  return (
    
    <div className="wrapper">
    <div className="content">

    </div>

    <footer className="footer">



      <a href="https://github.com/omery33111" style={{ color: "white" }}>
        <FontAwesomeIcon
          icon={faGithub}
          size="2x"
          style={{ margin: "10px 20px" }}/>
      </a>
      <a href="https://www.linkedin.com/in/omer-yanai/" style={{ color: "white" }}>
        <FontAwesomeIcon
          icon={faLinkedin}
          size="2x"
          style={{ margin: "10px 20px" }}
        />
      </a>
    <br />
    <p className="text-center">
      Copyright &copy; {new Date().getFullYear()} Omer Yanai
    </p>

             


    </footer>

  </div>
  );
};

export default MyFooter;