
const Input_label = ({value, setUser}) => {
    
  return (
    <div  className="flex flex-col">
          <label htmlFor={value} className="mb-2 text-lg font-normal">
            {value[0].toUpperCase()+value.slice(1)}
          </label>
          <input
            type={value==='email' ? "email" : value==='password' ? 'password' : 'name'}
            name={value}
            id={value}
            onChange={(e) => setUser(e.target.value)}
            placeholder={value==='email' ? "Example@gmail.com" : value==='password' ? '1234' : 'Luis'}
            className=" focus:outline-none focus:border-cyan-500 py-1 pl-2 rounded-md border-2 border-gray-300 w-full"
          />
      </div>
  )
}

export default Input_label
