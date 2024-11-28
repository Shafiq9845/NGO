import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Componentes/User/Home.js";
import About from "./Componentes/User/About.js";
import Contact from "./Componentes/User/Contact.js";
import NContact from "./Componentes/Ngo/Contact.js";
import Donate from "./Componentes/User/Donate.js";
import Login from "./Componentes/User/Login.js";
import Fpassword from "./Componentes/User/ForgotPassword.js";
import Rpassword from "./Componentes/User/ResetPassword.js";
import Signup from "./Componentes/User/Signup.js";
import Nhome from "./Componentes/Ngo/Home.js";
import Pending from "./Componentes/User/pending.js";
import Blocked from "./Componentes/User/Blocked.js";
import Reject from "./Componentes/User/Reject.js";
import Ahome from "./Componentes/Admin/Home.js";
import PApl from "./Componentes/Admin/Pe_apl.js";
import AApl from "./Componentes/Admin/Acp_apl.js";
import RApl from "./Componentes/Admin/Rej_apl.js";
import BApl from "./Componentes/Admin/Blc_apl.js";
import Nwork from "./Componentes/Admin/N_work.js";
import ABank from "./Componentes/Admin/bank.js";
import Volunteer from "./Componentes/Admin/Volunteer.js";
import Doners from "./Componentes/Admin/Doners.js";
import Wallet from "./Componentes/Ngo/Wallet.js";
import Bank from './Componentes/Ngo/Bank.js';
import NWork from './Componentes/Ngo/work.js';
import NProfile from './Componentes/Ngo/profile.js';
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/authContext.js";
import Gallery from "./Componentes/Ngo/Gallery.js";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Donate" element={<Donate />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Fpassword />} />
        <Route path="/reset-password/:token" element={<Rpassword />} />

        <Route
          path="/Ngo/home"
          element={
            <ProtectedRoute>
              <Nhome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Ngo/bank"
          element={
            <ProtectedRoute>
              <Bank />
            </ProtectedRoute>
          }
        >
        </Route>
        <Route
          path="Ngo/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="Ngo/contact"
          element={
            <ProtectedRoute>
              <NContact />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="Ngo/work"
          element={
            <ProtectedRoute>
              <NWork />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="Ngo/profile"
          element={
            <ProtectedRoute>
              <NProfile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/pending"
          element={
            <ProtectedRoute>
              <Pending />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blocked"
          element={
            <ProtectedRoute>
              <Blocked />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reject"
          element={
            <ProtectedRoute>
              <Reject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/home"
          element={
            <ProtectedRoute>
              <Ahome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/Pending_Applications"
          element={
            <ProtectedRoute>
              <PApl />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/Bank"
          element={
            <ProtectedRoute>
              <ABank />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/Accepted_Applications"
          element={
            <ProtectedRoute>
              <AApl />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/Rejected_Applications"
          element={
            <ProtectedRoute>
              <RApl />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/Blocked_Applications"
          element={
            <ProtectedRoute>
              <BApl />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/volunteer"
          element={
            <ProtectedRoute>
              <Volunteer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/doners"
          element={
            <ProtectedRoute>
              <Doners />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/doners"
          element={
            <ProtectedRoute>
              <Doners />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/nwork"
          element={
            <ProtectedRoute>
              <Nwork />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Ngo/wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
