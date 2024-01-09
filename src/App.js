import { Routes, Route } from 'react-router-dom' 
import Home from './pages/client/Home'
import FindFriends from './pages/client/FindFriends'
import StudyRoom from './pages/client/StudyRoom'
import Timetable from './pages/client/Timetable'
import Courses from './pages/client/Courses'
import Posts from './pages/client/Posts'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import InfoBarWithBell from './components/InfoBarWithBell'

function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <InfoBarWithBell />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/tim-ban-hoc" element={<FindFriends />}/>
        <Route path="/phong-hoc-online" element={<StudyRoom />}/>
        <Route path="/thoi-gian-bieu" element={<Timetable />}/>
        <Route path="/khoa-hoc" element={<Courses />}/>
        <Route path="/bai-dang" element={<Posts />}/>
      </Routes>
    </div>
  );
}

export default App;
