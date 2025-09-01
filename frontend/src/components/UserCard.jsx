const UserCard = ({ name, image, onRemove, onLogin }) => {
  const handleCardClick = () => {
    if (onLogin) onLogin()
  }

  const handleRemoveClick = (e) => {
    e.stopPropagation() 
    if (onRemove) onRemove()
  }

  return (
    <div
      onClick={handleCardClick}
      className="flex items-center justify-between bg-white rounded-lg p-4 shadow-md mt-4 cursor-pointer hover:bg-gray-100 transition"
    >
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-10 h-10 rounded-full" />
        <span className="text-gray-800 font-semibold">{name}</span>
      </div>
      <button
        onClick={handleRemoveClick}
        className="text-red-600 font-semibold"
      >
        Remover
      </button>
    </div>
  )
}

export default UserCard