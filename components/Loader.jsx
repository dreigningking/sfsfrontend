const Loader = ({ height = 50, text = '...' }) =>
  <div className='loader' style={{
    height: `${height}vh`
  }}>
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
    <p>{text}</p>
  </div>

export default Loader