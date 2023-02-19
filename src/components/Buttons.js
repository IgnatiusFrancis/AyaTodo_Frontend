import Button from "react-bootstrap/Button";
import cookie from "cookiejs";
import { useNavigate } from "react-router-dom";
function Buttons() {
  const navigate = useNavigate();
  function logout() {
    console.log("Yes");
    cookie.remove("token");
    navigate("/login");
  }

  return (
    <>
      <Button
        style={{ width: "10%", padding: "10px", marginRight: "10px" }}
        variant="outline-primary"
      >
        Login
      </Button>{" "}
      <Button
        style={{ width: "10%", padding: "10px" }}
        variant="outline-danger"
        onClick={logout}
      >
        Logout
      </Button>{" "}
    </>
  );
}

export default Buttons;
