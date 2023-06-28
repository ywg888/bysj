function Other() {
  return (
    <div className='other'>
      <div className='title'>其它</div>
      {[1, 2, 3, 4, 5, 6].map((item, index) => {
        return (
          <div className='x' key={index}>
            <h1>{item}</h1>
            <h1>{item}</h1>
            <h1>{item}</h1>
            <h1>{item}</h1>
            <h1>{item}</h1>
            <h1>{item}</h1>
          </div>
        )
      })}
    </div>
  )
}

export default Other
