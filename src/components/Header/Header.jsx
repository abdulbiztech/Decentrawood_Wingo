import React from 'react'
import styles from './Header.module.css'
import GameVerseHub from "../../assets/Images/GameVerseHub.png"
const Header = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light  ${styles.cus_navbar}`}>
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
            src={GameVerseHub}
            className={`img-fluid ${styles.GameLogo}`}
            alt="GameVerseHub Logo"
          />
        </a>
        <button
          className="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#fff"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>

        <div className="collapse  navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className={`nav-item ${styles.cus_navitem}`}>
              <a className={`nav-link active ${styles.cus_navlink}`} href="/">About</a>
            </li>
            <li className={`nav-item ${styles.cus_navitem}`}>
              <a className={`nav-link ${styles.cus_navlink}`} href="/">Game</a>
            </li>
            <li className={`nav-item ${styles.cus_navitem}`}>
              <a className={`nav-link ${styles.cus_navlink}`} href="/">News</a>
            </li>
          </ul>

          {/* Connect Button */}


          {/* {userId ? ( */}
            {/* <div className={`form-inline my-2 my-lg-0 ${styles.user_box}`}> */}
              {/* <p>UserId: {userId.substring(0, 20) + "..."}</p> */}
              {/* <button className={`btn ${styles.connect_btn}`} type="button">Logout</button> */}
            {/* </div> */}
          {/* ) : ( */}
            <form className={`form-inline my-2 my-lg-0 ${styles.connect_form}`}>
              <button className={`btn ${styles.connect_btn}`} type="button">Connect</button>
            </form>
          {/* )} */}
        </div>
      </div>
    </nav>

  )
}

export default Header