import { useNavigate } from 'react-router-dom';
import { useState , useContext} from 'react';
import { fetchData } from '../../main';
import { UserContext } from '../../context/userContext';

function Register() {
  const {_, updateUser} = useContext(UserContext);
  const [user, setUser] = useState({
    username: '',
    password: '',
    password2: '',
  });
  const navigate = useNavigate();
  const { username, password, password2 } = user;
  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const register = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('password and confirm password does not match');
      return;
    }

    fetchData('/users/register', { username, password }, 'POST')
      .then((newUser) => {
        console.log(newUser);
        sessionStorage.setItem('currentuser', JSON.stringify(newUser))
        updateUser('username', newUser.username)
        navigate('/profile');
      })
      .catch((error) => {
        alert(error.error)
        console.error(error);
      });
  };
  return (
    <div className="login-form">
      <form action="" method="post" onSubmit={register}>
        <h2 className="text-center">Register in to MERN</h2>
        <div className="form-group mt-2">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
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
        <div className="form-group mt-2">
          <input
            type="password"
            name="password2"
            className="form-control"
            placeholder=" Confirm Password"
            required="required"
            onChange={onChange}
          />
        </div>
        <div className="form-group mt-4 text-center">
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </div>

      </form>
    </div>
  );
}

export default Register;
