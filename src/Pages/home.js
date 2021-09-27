import "./home.css";
import { FaReact, FaBootstrap, FaRoute } from "react-icons/fa";
import { FiDatabase } from "react-icons/fi";
export default function Home() {
  return (
    <>
      <div className="homeContainer">
        <div className="toolImageConatiner">
          <ul>
            <h2>Tools Used</h2>
            <li>
              <h4>
                <FaReact /> ReactJs
              </h4>
            </li>
            <li>
              <h4>
                <FaBootstrap /> React-Bootstrap
              </h4>
            </li>
            <li>
              <h4>
                <FaRoute /> React-Router-Dom
              </h4>
            </li>
            <li>
              <h4>
                <FiDatabase /> Axios
              </h4>
            </li>
          </ul>
        </div>
        <div className="homeImageContainer">
          <img
            className="homeImage"
            src="https://media.istockphoto.com/photos/unique-faces-collage-picture-id1291584234"
            alt="post"
          />
        </div>
      </div>
    </>
  );
}
