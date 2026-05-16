import { Route, Routes } from "react-router";
import Signup from "../pages/Signup";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Profile from "../pages/Profile";
import Navbar from "../components/Navbar";

const App = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoutes>
                            <Profile />
                        </ProtectedRoutes>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
