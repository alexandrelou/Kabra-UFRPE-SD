import { BrowserRouter, Route, Routes } from "react-router-dom";

//paginas
import SignSide from "./pages/SignSide";
import SignIn from "./pages/Login";
import SignUp from "./pages/Registrar";
import ForgotPassword from "./pages/EsqueceuSenha";

import Menu from "./pages/Menu";
import Home from "./pages/Home";
import Processo from "./pages/Processo";
import AfastamentoDeCurtaDuracao from "./pages/AfastamentoDeCurtaDuracao";
import Perfil from "./pages/Perfil";
import CustomizedAccordions from "./pages/Ajuda";


function App() {
  return (
    <div className="App flex flex-col min-h-screen bg-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route
              path="processo/Afastamento_Integral_de_Curta_Duração"
              element={<AfastamentoDeCurtaDuracao />}
            />
            <Route path="perfil" element={<Perfil />} />
            <Route path="ajuda" element={<CustomizedAccordions />} />
          </Route>
          <Route path="login" element={<SignSide />}>
            <Route index element={<SignIn />} />
          </Route>
          <Route path="registrar" element={<SignSide />}>
            <Route index element={<SignUp />} />
          </Route>
          <Route path="esqueceusenha" element={<SignSide />}>
            <Route index element={<ForgotPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
