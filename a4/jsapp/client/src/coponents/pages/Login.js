import { useState, useContext} from 'react';
import {fetchData} from '../../main';
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../../context/userContext';



function Login() {
  const {_, updateUser} = useContext(UserContext);
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const { username, password } = user;
  const navigate = useNavigate();
  const onChange = (event) => setUser({ ...user, [event.target.name]: event.target.value });
  const onSubmit = (event) => {
    event.preventDefault()
    fetchData('/users/login', { username, password }, 'POST')
      .then((u) => {
        console.log(u);
        sessionStorage.setItem('currentuser',JSON.stringify(u))
        updateUser('username', u.username)
        navigate('/profile');
      })
      .catch((err) => {
        alert(err.error)
        console.error(err);
      });
  };
  return (
    <div className="login-form">
      <form action="" method="post" onSubmit={onSubmit}>
        <h2 className="text-center">Log in to MERN</h2>
        <div className="form-group mt-2">
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            required="required"
            onChange={onChange}
          />
        </div>
        <div className="form-group mt-2">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required="required"
            onChange={onChange}
          />
        </div>
        <div className="form-group mt-4 text-center">
          <button type="submit" className="btn btn-primary btn-block">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}


export default Login