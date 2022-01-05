import Header from "../Header";
import "./index.css";

const About = () => (
  <div className="about-bg-container">
    <Header />
    <h1 className="about-heading">About This React Web Application</h1>
    <h3>Tools Used</h3>
    <p className="about-description">
      This web application is built using the following technologies.
      <br />
      (1). Front End With ReactJs Framework.
      <br />
      (2). BackEnd With the NodeJs and ExpressJs Frameworks.
      <br />
      (3). Backend is integrated with sqlite3 database.
      <br />
      (4). Front End Deployment with the Github pages.
      <br />
      (5). Backend Deployment with the Heroku.
    </p>
    <h3>Functionality</h3>
    <p className="about-description">
      This web app is built with following functionalities...
      <br />
      (1). A new user can register with the unique username and password.
      <br />
      (2). Registered users can login with their unique usernames and passwords.
      <br />
      (3). Every user after registration/login can access home route, about
      route and logout button at the header section.
      <br />
      (4). Every registered user can select and upload the file using input
      below the header section. Then user can display the data, add new item,
      update the existing item and view the same data.
    </p>
  </div>
);

export default About;
