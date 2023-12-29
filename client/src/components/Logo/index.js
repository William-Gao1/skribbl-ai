import './Logo.css'

const Logo = ({fontSize = 100}) => {
  return (
    <p className="logoContainer" style={{fontSize: fontSize}}>
      <span style={{color: "#5c6ecc"}}>s</span>
      <span style={{color: "#7454d6"}}>k</span>
      <span style={{color: "mediumorchid"}}>r</span>
      <span style={{color: "mediumvioletred"}}>i</span>
      <span style={{color: "orange"}}>b</span>
      <span style={{color: "#f5f249"}}>b</span>
      <span style={{color: "#85c961"}}>l</span>
      <span style={{color: "darkgreen"}}>.</span>
      <span>a</span>
      <span>i</span>
    </p>
  )
}

export default Logo