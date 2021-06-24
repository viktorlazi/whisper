function Authenticated() {
  return (
    <div className="auth">
      <p>logged in</p>
      <button onClick={()=>{sessionStorage.clear()}}>log out</button>  
    </div>
  )
}
export default Authenticated;