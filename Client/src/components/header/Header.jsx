import { Link } from "react-router-dom"

export const Header = ()=>{
    return(
        <div className="header">
          <Link to="/">
            <h1>Home</h1>
          </Link>
          {/* <Link to="/test">Test</Link> */}
        </div>
    )
    }