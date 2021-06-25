function Authenticated({clearToken}) {
  return (
    <div className="auth">
      <p>Logged In</p>
      <button onClick={()=>{clearToken()}}>Log Out</button>  
    </div>
  )
}
export default Authenticated;