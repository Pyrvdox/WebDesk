import React, { useState } from "react";

const LoginComponent = () => {

    const [formData, setFormData] = useState({
        email:"",
        password:""
    })

    return(
        <>Login</>
    )
};

export default LoginComponent;