import UserMenu from "./UserMenu"
export default function NavBar () {
return (
<nav className="navbar sticky-top position-absolute">
  <div className="container-fluid">
    <span className="navbar-brand" ><UserMenu></UserMenu></span>
  </div>
</nav>

)

}