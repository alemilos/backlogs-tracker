import Input from "components/ui/input/Input";
import InputLabel from "components/ui/input/InputLabel";
import { useAuth } from "providers/AuthProvider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackgroundImage from "assets/background.png";
import Logo from "assets/logo.png";
import TaskImage from "assets/images/task.png";
import TextImage from "assets/images/text.png";
import FormsImage from "assets/images/forms.png";
import SpheresImage from "assets/images/spheres.png";
import WavesImage from "assets/images/waves.png";

const Register = () => {
  return (
    <div
      className="w-screen h-screen flex p-6"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "repeat",
        backgroundSize: "120px 120px",
      }}
    >
      {/* Left panel: full width and centered when < 800px */}
      <div className="flex-1 h-full flex justify-center items-center md:justify-start">
        <LeftPanel />
      </div>

      {/* Right panel: hidden on small screens (< md = 768px) */}
      <div className="hidden md:flex flex-col pl-16 w-full justify-around">
        <div className="flex items-center justify-between">
          <img src={TaskImage} className="w-64 h-64" />
          <img src={FormsImage} className="w-64 h-64" />
        </div>
        <div className="flex items-center justify-center">
          <img src={SpheresImage} className="w-64 h-56" />
        </div>
        <div className="flex items-center justify-between">
          <img src={WavesImage} className="w-64 h-64 " />
          <img src={TextImage} className="w-64 h-64" />
        </div>
      </div>
    </div>
  );
};

const LeftPanel = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  function redirectToLogin() {
    navigate("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      toast.error("Le password non coincidono");
      return;
    }

    const res = await register(username, email, password);
    if (res.ok) {
      toast.success("Ti sei registrato con successo");
      redirectToLogin();
    } else {
      toast.error(res.err);
    }
  }

  return (
    <div className="bg-white md:w-[400px] px-12 flex flex-col justify-center w-[600px] border-[.5px] h-full">
      <div className="flex flex-col items-center justify-center mb-16">
        <img src={Logo} className="w-32" />
        <h1 className="text-2xl text-[#3E2F5D] font-medium">Registrati</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        <InputLabel text="Username" />
        <Input onChange={(e) => setUsername(e.target.value)} />
        <InputLabel text="Email" />
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
        <InputLabel text="Password" />
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
        <InputLabel text="Conferma Password" />
        <Input
          type="password"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <button className="bg-[#b57ce8] py-2 w-full text-white cursor-pointer mb-2 mt-4">
          Registrati
        </button>

        <p>
          Hai già un'account?{" "}
          <span
            className="text-[#b57ce8] font-bold cursor-pointer"
            onClick={redirectToLogin}
          >
            Accedi
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
