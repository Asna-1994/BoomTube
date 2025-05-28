import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/DashBoard/Home"
import RegisterPage from "./Pages/Auth/RegisterPage"
import Login from "./Pages/Auth/Login"
import Dashboard from "./Pages/DashBoard/Dashboard"
import Settings from "./Pages/Settings/Settings"

import UpdatePassword from "./Pages/Settings/UpdatePassword"
import NotFound from "./Pages/NotFound"
import VideoRoutes from "./routes/VideoRoutes"
import RestrictLogin from "./Pages/Auth/RestrictLogin"
import ProtectedRoute from "./Pages/Auth/ProtectRoutes"



const App = () => {

  return (
    <BrowserRouter>

    <Toaster position="top-right" reverseOrder={false} />
<Routes>
  <Route path="*" element={<NotFound/>}/>
  <Route element={<RestrictLogin/>}>
<Route path="/" element={<Home/>}/>
<Route  path="/register" element={<RegisterPage/>}/>
<Route path="/login" element={<Login/>}/>
</Route>

<Route element={<ProtectedRoute/>}>
<Route path="/dashboard"  element={<Dashboard/>}/>
<Route path="/settings" element={<Settings/>} />

<Route path="/update-password" element={<UpdatePassword/>} />
<Route path="/videos/*" element={<VideoRoutes/>}/>
</Route>
</Routes>
</BrowserRouter>
  )
}

export default App
