import { useState } from "react";
import { useAuth } from "providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import InputLabel from "components/ui/input/InputLabel";
import Input from "components/ui/input/Input";
import { toast } from "react-toastify";
import BackgroundImage from "assets/background.png";
import Logo from "assets/logo.png";
import TaskImage from "assets/images/task.png";
import TextImage from "assets/images/text.png";
import FormsImage from "assets/images/forms.png";
import SpheresImage from "assets/images/spheres.png";
import WavesImage from "assets/images/waves.png";

const Login = () => {
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
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  function redirectToRegister() {
    navigate("/register");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await login(username, password);

    if (res.ok) {
      navigate("/");
    } else {
      toast.error(res.err);
    }
  }

  return (
    <div className="bg-white md:w-[400px] min-w-[400px] px-12 flex flex-col justify-center h-full w-[600px] border-[.5px] rounded-sm">
      <div className="flex flex-col items-center justify-center mb-16">
        <img src={Logo} className="w-32" />
        <h1 className="text-2xl text-[#3E2F5D] font-medium">Accedi</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2.5 text-[#3E2F5D]"
      >
        <InputLabel text="Username" />
        <Input onChange={(e) => setUsername(e.target.value)} />
        <InputLabel text="Password" />
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />

        <button className="bg-[#b57ce8] py-2 w-full text-white mb-2 mt-4 cursor-pointer">
          Accedi
        </button>

        <p>
          Ancora non hai un'account?{" "}
          <span
            className="text-[#b57ce8] font-bold cursor-pointer"
            onClick={redirectToRegister}
          >
            Registrati
          </span>
        </p>
      </form>
    </div>
  );
};
export default Login;
