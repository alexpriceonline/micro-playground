import "isomorphic-unfetch";

const base = "http://localhost:3000";

const App = ({ success }) => (
  <div>Connected to API: {success ? "True" : "False"}</div>
);

App.getInitialProps = async ({ req }) => {
  const res = await fetch(`${base}/api/auth`);
  const json = await res.json();
  return { success: json.success };
};

export default App;
