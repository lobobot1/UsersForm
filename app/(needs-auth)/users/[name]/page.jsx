
const User = ({ params }) => {
  const { name } = params
  return (
    <div className="flex min-h-screen flex-col p-11 bg-slate-500">
      <h1 className='text-5xl font-semibold'>{name}</h1>
    </div>
  )
}

export default User
