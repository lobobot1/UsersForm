const ErrorAlert = ({ children, className, props }) => {
  return (
    <div
      role='alert'
      className={className + ' p-2 bg-red-200 text-red-500'}
      {...props}
    >
      {children}
    </div>
  )
}

export default ErrorAlert
