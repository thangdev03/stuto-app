import { Routes, Route, Link, useLocation } from 'react-router-dom' 
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
import Messenger from './pages/client/Messenger'
import { useAuthContext } from './hooks/useAuthContext'
import UpdateInfo from './components/UpdateInfo'
import FriendRequests from './pages/client/FriendRequests'

function App() {
  const { pathname } = useLocation();
  const [state, dispatch] = useAuthContext();
  const { user } = state;

  return (
    <div className="App">
      {user && (pathname !== '/meeting') && (pathname !== '/login') && (pathname !== '/signup') && (
        <>
          <div className="sticky z-10 top-0 h-16 bg-[#cbe0ff] shadow-md border-b border-b-white flex items-center py-2">
            <Link to="/" className="block ml-16">
                <img src="/img/logo.webp" className="w-[100px]" alt=""/>
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
          <Route path="/" element={<Home />} exact/>
          <Route path="/tim-ban-hoc" element={<FindFriends />}/>
          <Route path="/phong-hoc-online" element={<StudyRoom />}/>
          <Route path="/thoi-gian-bieu" element={<Timetable />}/>
          <Route path="/khoa-hoc" element={<Courses />}/>
          <Route path="/bai-dang" element={<Posts />}/>
          <Route path="/user/:userId" element={<Profile />}/>
          <Route path="/update-info" element={<UpdateInfo />}/>
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/friend">
            <Route path="requests" element={<FriendRequests />}/>
          </Route>
        </Route> 
      </Routes>
    </div>
  );
}

export default App;
