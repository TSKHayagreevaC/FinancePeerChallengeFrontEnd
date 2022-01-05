import { withRouter, Link } from "react-router-dom";
import "./index.css";

const NotFound = () => (
  <div className="not-found-bg-container">
    <h1 className="not-found-heading">Welcome To FinancePeer Code Challenge</h1>
    <Link to="/">
      <button type="button">Please Click Here To Visit Website</button>
    </Link>
  </div>
);

export default withRouter(NotFound);
