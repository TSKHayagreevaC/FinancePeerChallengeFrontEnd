import { withRouter, Link } from "react-router-dom";
import "./index.css";

const NotFound = () => (
  <div className="not-found-bg-container">
    <div className="not-found-content-container">
      <h1 className="not-found-heading">
        Welcome To FinancePeer Code Challenge
      </h1>
      <Link to="/">
        <button type="button" className="welcome-button">
          Please Click Here To Visit Website
        </button>
      </Link>
    </div>
  </div>
);

export default withRouter(NotFound);
