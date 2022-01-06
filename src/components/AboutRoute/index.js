import Header from "../Header";
import "./index.css";

const About = () => (
  <div className="about-bg-container">
    <Header className="about-header-element" />
    <h1 className="about-heading">About This Web Application</h1>
    <h3 className="sub-heading">Tools</h3>
    <h5 className="micro-heading">
      This web application is built using the following technologies...
    </h5>
    <ol className="about-tools-list">
      <li>Front End With ReactJs Framework.</li>
      <li>BackEnd With the NodeJs and ExpressJs Frameworks.</li>
      <li>Backend is integrated with sqlite3 database.</li>
      <li>Front End Deployment with the Github pages.</li>
      <li>Backend Deployment with the Heroku.</li>
    </ol>
    <h3 className="sub-heading">Functionalities</h3>
    <h5 className="micro-heading">
      This web app performs following functionalities...
    </h5>
    <ol className="about-functionality-list">
      <li>A new user can register with the unique username and password.</li>
      <li>
        Registered users can login with their unique usernames and passwords.
      </li>
      <li>
        li>Every user after registration/login can access home route, about
        route and logout button at the header section.
      </li>
      <li>
        Every registered user can select and upload the file using input below
        the header section. Then user can display the data, add new item, update
        the existing item and view the same data.
      </li>
      <li>
        This app automatically deletes all the rows of the database here by
        making the database empty when a new file is uploaded through the upload
        api call.
      </li>
      <li>
        All the new entries which are added to the list of entries and the
        updated entries are not uploaded into the database and only done in the
        local storage, so will be deleted when page is reloaded or when
        navigated between the routes or even when a new file is uploaded.
      </li>
    </ol>
  </div>
);

export default About;
