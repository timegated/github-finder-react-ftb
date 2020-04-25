import React, { useState } from "react";

const Navbar = () => {
    const [title] = useState(['Navbar'])

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className="fab fa-github" /> {title}
            </h1>
        </div>
    )
}

export default Navbar;