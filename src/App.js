import "./App.css";
import Post from "./components/Post";
import Header from "./components/Header";
import AllPosts from "./pages/AllPosts";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost"
import { UserContextProvider } from "./UserContext";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";

function App() {
  
  return (
    <UserContextProvider>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route exact path="/" element={<AllPosts />} />
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/register" element={<RegisterPage/>} />
          <Route exact path="/create" element={<CreatePost/>} />
          <Route exact path="/post/:id" element={<PostPage/>} />
          <Route exact path="/edit/:id" element={<EditPost/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
