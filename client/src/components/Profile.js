import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="profile-container">
      <div className="profile-inner-container">
        <h2>Welcome Back {auth.first_name}</h2>
        <div className="details-container">
          <div className="profile-left">
            <ul>
              <li>Overview</li>
              <li>My Cars</li>
            </ul>
          </div>
          <hr />
          <div className="profile-right">
            <ul>
              <li>
                <div>
                  <i className="far fa-user"></i>{" "}
                  <span className="first-name-profile">{auth.first_name}</span>{" "}
                  <span className="last-name-profile">{auth.last_name}</span>{" "}
                </div>
                <span className="pencil-profile">
                  <CreateOutlinedIcon />
                </span>{" "}
              </li>

              <li>
                <div>
                  <i className="far fa-envelope"></i> {auth.user_email}{" "}
                </div>
                <span className="pencil-profile">
                  <CreateOutlinedIcon />
                </span>{" "}
              </li>
              <li>
                <div>
                  <i className="fas fa-map-marker-alt"></i> {auth.address}{" "}
                </div>
                <span className="pencil-profile">
                  <CreateOutlinedIcon />
                </span>{" "}
              </li>
              <li>
                <div>
                  <i className="fas fa-phone-alt"></i>
                </div>
                {auth.phone_number}{" "}
                <span className="pencil-profile">
                  <CreateOutlinedIcon />
                </span>{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="rating-panel-profile">
          <span>
            <i className="far fa-star"></i>

            {auth.rating}
          </span>
          <span>
            <i className="far fa-thumbs-up"></i> {auth.number_of_votes}
          </span>
        </div>
      </div>
    </div>
  );
}
