import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import Altbar from "../components/Altbar";

function Login() {

  return (
    <div>
      <LoginForm/>

    </div>
  );
}

export default Login;
