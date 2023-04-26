import SettingsNavbar from './SettingsNavbar'

const Layout = ({ children }) => {
  return (
    <>
      <SettingsNavbar />
      <div className='p-2 text-white'>{children}</div>
    </>
  )
}

export default Layout
