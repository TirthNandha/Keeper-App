import React from "react"
const d = new Date()
var year = d.getFullYear()
function Footer() {
    return (<footer>
        <p>Copyright © {year}</p>
    </footer>)
        
}
export default Footer;