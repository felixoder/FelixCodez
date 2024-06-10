import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Main from "./components/Main"
import Footer from './components/Footer'
import Login from "./auth/Login"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import AdminDash from "./Admin/AdminDash"
import AddProject from "./Admin/AddProject"
import Projects from "./components/Projects"
import EditProject from "./Admin/EditProject"
import ProjectPage from "./components/ProjectPage"
import Skills from "./components/Skills"
import AddSkills from "./Admin/AddSkills"
import Testimonials from "./components/Testimonials"
import Connect from "./components/Connect"


const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
<Route path='/' element={<Main/>}/>
<Route path='/admin-login' element={<Login/>}/>
<Route path='/projects' element={<Projects/>}/>
<Route path='/skills' element={<Skills/>}/>
<Route path='/connect' element={<Connect/>}/>
<Route path='/testimonials' element={<Testimonials/>}/>
<Route path='/projects/:slug' element={<ProjectPage/>}/>
<Route element={<OnlyAdminPrivateRoute/>}>
<Route path='/admin-dash' element={<AdminDash/>}/>
<Route path='/add-projects' element={<AddProject/>}/>
<Route path="/edit-project/:projectId" element={<EditProject />} />
<Route path='/add-skills' element={<AddSkills/>}/>
</Route>



      </Routes>
      <Footer/>

    </>
    
  )
}

export default App