import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Professor = (props) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  const [postProfessorData, setPostProfessorData] = useState({
    name: '',
    email: '',
    empID: '',
    age: '',
    gender: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [clientError,setClientError]= useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  
  const filteredData = data.filter(professor =>
    professor.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    fetch("http://localhost:8080/professor")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==="age"){
      if( !(/^\d+$/.test(value))){
           setClientError("Age Should Contain  Number Only ")
      }else{
       setClientError('')
      }
    }
    setPostProfessorData({ ...postProfessorData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   if(!clientError)  {

     fetch('http://localhost:8080/professor/add', {
       method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postProfessorData)
      })
      .then(res => res.json())
      .then(response => {
        if (response.status) {
            setPostProfessorData({
                name: '',
                email: '',
                empID: '',
                age: '',
                gender: '',
            })} else {
              setError("Email or RollNumber Already Registerd")
        }
      
      });
    }
  };

  return (
    <div className="professor-main">
    
      <div className="professors">
        <button className="register-btn" onClick={() => setShowForm(!showForm)}>
          Register Professor
        </button>
      </div>
      {showForm && (
        <div className="professor-form">
          {error && <div className="err-msg"><i class="fa-solid fa-exclamation fa-shake" style={{color: "#ec0909"}}></i>{error }</div>}
          {clientError && <div className="err-msg"><i class="fa-solid fa-exclamation fa-shake" style={{color: "#ec0909"}}></i>{clientError}</div>}
          <form onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="text"
              name="name"
              placeholder="Name"
              value={postProfessorData.name}
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="Email"
              value={postProfessorData.email}
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="text"
              name="empID"
              placeholder="Employee ID"
              value={postProfessorData.empID}
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="text"
              name="age"
              placeholder="Age"
              value={postProfessorData.age}
              onChange={handleChange}
              maxLength="2"
              required
            />
            <select
             className="input-field"
              id="gender"
              name="gender"
              value={postProfessorData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="male" selected>Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <button   className="input-btn" type="submit">Add Professor</button>
          </form>
        </div>
      )}
      <div className="professor-info">
      <div >
      <input className="find-input" type="text" placeholder="Find" onChange={handleFilterChange}/>
     </div>
    
        <table style={props.style}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((professor) => (
            <tr key={professor._id} >
              <td>{professor.name}</td>
              <td>{professor.email}</td>
              <td>{professor.empID}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="home-btn"><Link to='/'><i class="fa-solid fa-house fa-bounce fa-2xl" style={{color: "#B197FC"}}></i></Link></div>
    </div>
  );
};

export default Professor;
