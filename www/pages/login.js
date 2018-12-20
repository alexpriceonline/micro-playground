import "isomorphic-unfetch";

const Login = () => {
  const authEndPoint = "/api/auth.js";

  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault();
          let { email, password } = e.target;
          email = email.value;
          password = password.value;

          const res = await fetch(authEndPoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
          const json = await res.json(); // get the JSON response
          if (!json.success) {
            alert(json.msg);
          } else {
            console.log(json);
            alert("success");
          }
        }}
      >
        <input id="email" placeholder="email" type="email" />
        <br />
        <input id="password" placeholder="password" type="password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
