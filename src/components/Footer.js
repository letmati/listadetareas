import React from "react";
import Git from '../git.png'

const Footer = () => {
    return(
        <footer className="footer">
            <img className="footer-img" src={Git}></img>
            <a className="footer-link" href="https://github.com/meanwhilematt">Meanwhilematt</a>
        </footer>
    )
}

export default Footer