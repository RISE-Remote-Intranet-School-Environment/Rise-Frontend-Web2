import React from 'react';
import Nav from './components/Nav';
import StickyFooter from './components/StickyFooter';
import HomePage from './pages/Home';
import CalendarPage from './pages/Calendar';
import SyllabusPage from './pages/Syllabus';
import NotesPage from './pages/Notes';
import ForumPage from './pages/Forum';
import LoginPage from './pages/Login';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <div className='container'>
        <Routes>
          <Route path= '/' element={<HomePage/>}/>
          <Route path= '/home' element={<HomePage/>}/>
          <Route path= '/calendar' element={<CalendarPage/>}/>
          <Route path= '/syllabus' element={<SyllabusPage/>}/>
          <Route path= '/notes' element={<NotesPage/>}/>
          <Route path= '/forum' element={<ForumPage/>}/>
          <Route path= '/login' element={<LoginPage/>}/>
        </Routes>

      </div>
    </>
  );
}

export default App;