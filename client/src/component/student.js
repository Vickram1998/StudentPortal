import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Student = (props) => {
  const [filter, setFilter] = useState('');
  
  const [data, setData] = useState([]);
  const [postStudentData, setPostStudentData] = useState({
    name: '',
    email: '',
    rollnumber: '',
    age: '',
    gender: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [clientError,setClientError]= useState('');
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  
  const filteredData = data.filter(student =>
    student.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    fetch("http://localhost:8080/students/student")
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
        console.log(value)
           setClientError("Age Should Contain  Number Only ")
      }else{
       setClientError('')
      }
    }
    setPostStudentData({ ...postStudentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   if(!clientError)  {

     fetch('http://localhost:8080/students/add', {
       method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postStudentData)
      })
      .then(res => res.json())
      .then(response => {
        if (response.status) {
            setPostStudentData({
                name: '',
                email: '',
                rollnumber: '',
                age: '',
                gender: '',
            })} else {
              setError("Email or RollNumber Already Registerd")
        }
      
      });
    }
  };

  return (<div>

      <Link to ='/professor' className="link-btn">Professor's Corner</Link>
    <div className="student-main">
      <div className="students">
        <button className="register-btn" onClick={() => setShowForm(!showForm)}>
          Register Student
        </button>
      </div>
      {showForm && (
        <div className="student-form">
          {error && <div className="err-msg"><i class="fa-solid fa-exclamation fa-shake" style={{color: "#ec0909"}}></i>{error }</div>}
          {clientError && <div className="err-msg"><i class="fa-solid fa-exclamation fa-shake" style={{color: "#ec0909"}}></i>{clientError}</div>}
          <form onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="text"
              name="name"
              placeholder="Name"
              value={postStudentData.name}
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="Email"
              value={postStudentData.email}
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="text"
              name="rollnumber"
              placeholder="Roll Number"
              value={postStudentData.rollnumber}
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="text"
              name="age"
              placeholder="Age"
              value={postStudentData.age}
              onChange={handleChange}
              maxLength="2"
              required
            />
            <select
             className="input-field"
              id="gender"
              name="gender"
              value={postStudentData.gender}
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
            <button   className="input-btn" type="submit">Add Student</button>
          </form>
        </div>
      )}
      <div className="student-info">
     <div >
      <input className="find-input" type="text" placeholder="Find" onChange={handleFilterChange}/>
     </div>
    
        <table style={props.style}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((student) => (
            <tr key={student._id} >
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.rollnumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="home-btn"><Link to='/'><i class="fa-solid fa-house fa-bounce fa-2xl" style={{color: "#B197FC"}}></i></Link></div>
    </div>
  </div>
  );
};

export default Student;
