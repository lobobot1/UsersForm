'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input_label from '../../components/input_label';
import { AuthProvider } from '../../context/AuthContext';
//import { useAuth } from '../../hooks/useAuth';
const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const {auth} = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    //const { login } = useAuth();
    //login(email, password);
  }

  return (
    <AuthProvider >
      <h1 className=" text-6xl font-bold text-white mb-10 ">Login</h1>

      <form
        //onSubmit={handleSubmit}
        className="mx-auto rounded-lg bg-white shadow-sm shadow-slate-200 py-5 px-8 text-gray-800 max-w-lg grid gap-4 container"
      >
        <Input_label  value="email" setUser={setEmail} />

        <Input_label value="password" setUser={setPassword} />

        <div className="flex justify-between text-lg mt-2">
          <button className=" bg-blue-600 rounded-lg text-white font-semibold px-3 py-2 hover:bg-blue-800 transition-colors ease-in-out">
            Log in
          </button>

          <button
            type="button"
            onClick={() => {
              router.push("/register");
            }}
            className=" hover:text-white hover:bg-teal-600 transition-colors ease-in-out hover:border-teal-600 text-blue-600 font-semibold rounded-lg border-2 border-slate-500 px-3 py-2"
          >
            Log up
          </button>
        </div>
      </form>
    </AuthProvider>
  );
}

export default Page
