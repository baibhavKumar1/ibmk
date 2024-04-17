import { useState } from 'react'
import './App.css'
import axios from 'axios';
function App() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: ''
  });
  const [avatar, setAvatar] = useState(null)

  const handleChange = (e) => {
    const { type, name, value } = e.target;
    if (type === "file") {
      setAvatar(e.target.files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const Register = async (userData) => {
    await axios.post(`http://localhost:3000/users/register`, userData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then((res) => {
        localStorage.setItem('trackster', (res.data.token))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleSignup = (e) => {
    e.preventDefault()
    const formValue = new FormData();
    formValue.append('name', formData.name)
    formValue.append('email', formData.email)
    formValue.append('pass', formData.pass)
    formValue.append('avatar', avatar)
    console.log(formValue.get('name'));
    Register(formValue)
  };

  return (
    <>
      <div>
        <form onSubmit={handleSignup} style={{display:'flex',flexDirection:'column'}}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input name="pass" type="password" placeholder="Password" value={formData.pass} onChange={handleChange} />
          <input name="avatar" type="file" onChange={handleChange} />
          <button fontSize="16" fontWeight="400" onClick={handleSignup} type="submit" > SIGN UP </button>
        </form>
      </div>
    </>
  )
}

export default App
