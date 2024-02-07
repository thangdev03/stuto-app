import { Routes, Route, Link, useLocation, Redirect } from 'react-router-dom' 
import Home from './pages/client/Home'
import FindFriends from './pages/client/FindFriends'
import StudyRoom from './pages/client/StudyRoom'
import Timetable from './pages/client/Timetable'
import Courses from './pages/client/Courses'
import Posts from './pages/client/Posts'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import InfoBarWithBell from './components/InfoBarWithBell'
import Profile from './pages/client/Profile'
import Login from './pages/client/Login'
import SignUp from './pages/client/SignUp'
import PrivateRoutes from './utils/PrivateRoutes'
import Meeting from './pages/client/Meeting'

function App() {
  let auth = true;
  const { pathname } = useLocation();

  return (
    <div className="App">
      {auth && pathname !== '/meeting' && (
        <>
          <div className="sticky top-0 h-16 bg-[#cbe0ff] shadow-md border-b border-b-white flex items-center py-2 overflow-hidden">
            <Link to="/" className="block ml-16">
                <img src="./img/logo.webp" className="w-[100px]" alt=""/>
            </Link>
            <div className="ml-28 pr-7 flex justify-between grow">
              <SearchBar />
              <InfoBarWithBell />
            </div>
          </div>
          <Navbar />
        </>
      )}
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />}/>
          <Route path="/tim-ban-hoc" element={<FindFriends />}/>
          <Route path="/phong-hoc-online" element={<StudyRoom />}/>
          <Route path="/thoi-gian-bieu" element={<Timetable />}/>
          <Route path="/khoa-hoc" element={<Courses />}/>
          <Route path="/bai-dang" element={<Posts />}/>
          <Route path="/user-profile" element={<Profile />}/>
          <Route path="/meeting" element={<Meeting />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
