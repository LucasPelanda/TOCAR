const SocialIcons = () => {
  const icons = ['facebook', 'instagram', 'twitter']
  return (
    <div className="flex justify-center gap-4 mt-6">
      {icons.map((icon) => (
        <img
          key={icon}
          src={`/icons/${icon}.png`}
          alt={icon}
          className="w-6 h-6"
        />
      ))}
    </div>
  )
}

export default SocialIcons