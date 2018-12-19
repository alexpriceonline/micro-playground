import "isomorphic-unfetch";

const prod = process.env.NODE_ENV === "production";
const local = "http://localhost:3000";

const App = ({ success }) => (
  <div>
    <div>Connected to API: {success ? "True" : "False"}</div>
    <div>{process.env.NODE_ENV}</div>
  </div>
);

App.getInitialProps = async ({ req }) => {
  const baseUrl = prod ? `https://${req.headers.host}` : local;

  try {
    const res = await fetch(`${baseUrl}/api/auth.js`);
    const json = await res.json();
    return { success: json.success };
  } catch (err) {
    return { success: false };
  }
};

export default App;
