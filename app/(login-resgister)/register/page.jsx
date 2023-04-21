'use client'
import Input_label from "../../components/Input_label";
import { useState } from "react";

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    }
  };
  
    return (
      <main>
        <h1 className=" text-6xl font-bold text-white mb-10" >
          Register
        </h1>
  
        <form onSubmit={handleSubmit} className="mx-auto rounded-lg bg-white shadow-lg shadow-slate-800 py-5 px-8 text-gray-800 max-w-lg grid gap-4 container">
          {/* name */}
          <Input_label value='name' setUser={setName}/>

          {/* Email */}
          <Input_label value='email' setUser={setEmail}/>
        
            {/* password */}
          <Input_label value='password' setUser={setPassword}/>
  
          <div className="flex justify-end text-lg">
            <button type="submit" className=" bg-blue-700 rounded-lg mt-2 text-white font-semibold px-3 py-2">
              Register
            </button>
          </div>
        </form>
      </main>
    );
  }
  
  export default Register
  