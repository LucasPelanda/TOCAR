const LoginForm = ({ onLogin }) => {
  return (
    <div className="mt-6 w-full">
      <button
        onClick={onLogin}
        className="bg-emerald-900 text-white px-6 py-2 rounded-md w-full text-center"
      >
        Usar outra conta  
      </button>
    </div>
  )
}

export default LoginForm