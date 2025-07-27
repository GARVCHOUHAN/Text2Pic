// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//     const [user, setUser] = useState(null);
//     const [showLogin, setShowLogin] = useState(false);
//     const [token, setToken] = useState(localStorage.getItem('token'));
//     const backendurl = import.meta.env.VITE_BACKEND_URL;
//     const navigate = useNavigate();

//     // Fetch user and credits
//     const loadCreditData = async () => {
//         try {
//             const storedToken = localStorage.getItem('token');
//             if (storedToken) {
//                 const { data } = await axios.get(`${backendurl}/api/user/credits`, {
//                     headers: { Authorization: `Bearer ${storedToken}` }
//                 });
//                 if (data.success) {
//                     setUser(prev => ({ ...prev, ...data.user, creditBalance: data.creditBalance }));
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching credit data:", error);
//             toast.error("Failed to load credit data. Please try again later.");
//         }
//     };

//     // Generate image and update credits
//     const generateImage = async (prompt) => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.post(`${backendurl}/api/image/generate-image`, { prompt }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             const data = response.data;
//             if (data.success) {
//                 setUser(prev => ({ ...prev, creditBalance: data.creditBalance }));
//                 loadCreditData();
//                 return data;
//             } else {
//                 toast.error(data.message || "Failed to generate image. Please try again.");
//                 loadCreditData();
//                 if (data.creditBalance === 0) {
//                     toast.error("You have no credit balance left. Please recharge to continue.");
//                     navigate('/buy');
//                 }
//             }
//         } catch (error) {
//             console.error("Error generating image:", error);
//             toast.error("Failed to generate image. Please try again later.");
//             throw error;
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//         setToken(null);
//         setShowLogin(false);
//         toast.success("Logged out successfully");
//     };

//     useEffect(() => {
//         if (token) {
//             loadCreditData();
//         }
//     }, [token]);

//     const values = {
//         user, setUser, showLogin, setShowLogin, backendurl, token, setToken, logout, generateImage, loadCreditData
//     };

//     return (
//         <AppContext.Provider value={values}>
//             {props.children}
//         </AppContext.Provider>
//     );
// };

// export default AppContextProvider;

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    // Fetch user and credits
    const loadCreditData = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                const { data } = await axios.get(`${backendurl}/api/user/credits`, {
                    headers: { Authorization: `Bearer ${storedToken}` }
                });
                if (data.success) {
                    setUser(prev => ({ ...prev, ...data.user, creditBalance: data.creditBalance }));
                } else {
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem('token');
                }
            }
        } catch (error) {
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            console.error("Error fetching credit data:", error);
            toast.error("Failed to load credit data. Please login again.");
        }
    };

    // Generate image and update credits
    const generateImage = async (prompt) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${backendurl}/api/image/generate-image`, { prompt }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = response.data;
            if (data.success) {
                setUser(prev => ({ ...prev, creditBalance: data.creditBalance }));
                loadCreditData();
                return data;
            } else {
                toast.error(data.message || "Failed to generate image. Please try again.");
                loadCreditData();
                if (data.creditBalance === 0) {
                    toast.error("You have no credit balance left. Please recharge to continue.");
                    navigate('/buy');
                }
            }
        } catch (error) {
            console.error("Error generating image:", error);
            toast.error("Failed to generate image. Please try again later.");
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        setShowLogin(false);
        toast.success("Logged out successfully");
    };

    useEffect(() => {
        if (token) {
            loadCreditData();
        }
    }, [token]);

    const values = {
        user, setUser, showLogin, setShowLogin, backendurl, token, setToken, logout, generateImage, loadCreditData
    };

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;





