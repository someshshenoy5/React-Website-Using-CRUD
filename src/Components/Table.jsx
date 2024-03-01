import axios, { AxiosHeaders } from "axios";
import React, { useEffect, useState } from "react";
const Table = () => {
  const [data, setData] = useState([]);
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [uname,usetName] = useState("")
  const [uemail,usetEmail] = useState("")
  const [uphone,usetPhone] = useState("")
  const [editId,setEditId] = useState(-1)

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/Students")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if data array is empty
    if (data.length === 0) {
      // If it's empty, set id to 1
      const id = 1;
      axios.post("/api/Student", { id: id, name: name, email: email, phone: phone })
        .then((res) => location.reload())
        .catch((err) => console.log(err));
    } else {
      // If it's not empty, calculate id based on the last element's id
      const id = data[data.length - 1].id + 1;
      axios.post("/api/Student", { id: id, name: name, email: email, phone: phone })
        .then((res) => location.reload())
        .catch((err) => console.log(err));
    }
  }
  
const handleEdit = (id) => {
    axios
      .get(`http://localhost:8080/api/Student/${id}`)
      .then((res) => {usetName(res.data[0].name) 
        usetEmail(res.data[0].email) 
        usetPhone(res.data[0].phone)})
      .catch((err) => console.log(err));
  setEditId(id)
    
}
const handleUpdate=() =>{
  axios.put(`http://localhost:8080/api/Student/${editId}`,{id: editId , name: uname, email: uemail, phone: uphone})
   .then((res)=>{location.reload()
setEditId(-1)})
.catch(err=>console.log(err))
}
const handleDelete =(id)=>{
    axios.delete(`http://localhost:8080/api/Student/${id}`)
 .then(res => {location.reload()})
 .catch(err=>console.log(err))
}
  return (
    <div className="container">
      <div className="form-div">
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Your Name"  onChange={e => setName(e.target.value)}/><br />
            <input type="text" placeholder="Enter Your Email" onChange={e => setEmail(e.target.value)}/><br/>
            <input type="text" placeholder="Enter Your Phone" onChange={e => setPhone(e.target.value)}/><br/>
            <button type="submit">Add </button>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
                
                  user.id === editId ? 
                <tr>
                    <td>{user.id}</td>
                   <td> <input type="text"  value={uname} onChange={e => usetName(e.target.value)}/></td>
                   <td>
                     <input type='email' value={uemail} onChange={e => usetEmail(e.target.value)}/>
                   </td>
                   <td>
                     <input type="Number" value={uphone} onChange={e => usetPhone(e.target.value)}/>
                    </td>
                    <td><button onClick={handleUpdate}>Update</button></td>
                </tr> :
                <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={()=> handleEdit(user.id)}>Edit</button>
                  <button onClick={()=>handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
