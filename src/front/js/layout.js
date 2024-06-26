import React, { useContext } from "react"
import { Context } from "./store/appContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";
import { Landing } from "./pages/Landing/landing";
import { Trainer } from "./pages/Trainer/trainer";
import { User } from "./pages/User/user";
import UserForm from "./pages/User/userForm"

import { EditForm } from "./pages/User/editForm";

import ScrollToTop from "./component/scrollToTop.jsx";
import ExerciseDetail from "./pages/User/exerciseDetail.js";
import ProtectedRoute from "./component/protectedRoute.jsx";
import TrainerUserDetail from "./pages/Trainer/trainerUserDetail.js";
import Services from "./pages/Landing/servicesPage.js";
import ForgotPassword from "./component/Landing/ForgotPassword.jsx"
import ResetPassword from "./component/Landing/ResetPassword.jsx"
import ContactPage from "./pages/Landing/contactPage.js";

const Layout = () => {

    const { store } = useContext(Context);
    const basename = process.env.BASENAME || "";

    const userToken = store.token;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/forgotPassword" element={<ForgotPassword />} />
                        <Route path="/reset_password/:token" element={<ResetPassword />} />

                        <Route element={userToken ? <UserForm /> : <Navigate to="/" />} path="/user-form" />

                        <Route element={<ProtectedRoute roles={['user']} />}>

                            <Route path="/user/:id" element={<User />} />
                            <Route path="/user/edit_form" element={<EditForm />} />
                        </Route>
                        <Route element={<ProtectedRoute roles={['user', 'trainer']} />}>
                            <Route path="/exercise/:id" element={<ExerciseDetail />} />
                        </Route>
                        <Route element={<ProtectedRoute roles={['trainer']} />}>

                            <Route path="/trainer/:id" element={<Trainer />} />
                            <Route path="/trainer/:trainerId/user/:userId" element={<TrainerUserDetail />} />
                        </Route>
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);