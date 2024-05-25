import { Route, Routes } from 'react-router-dom';
import Root from './pages/Root';
import Student from './pages/Student';
import Lecture from './pages/Lecture';
import Class from './pages/Class';
import Login from './pages/Login'
import Register from './pages/Register';

function App() {
  return (
    <main style={{ backgroundColor: '#161925' }}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Root/>}>
          <Route index element={<Student/>}/>
          <Route path="/student" element={<Student />} />
          <Route path="/lecture" element={<Lecture />} />
          <Route path="/class" element={<Class />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
