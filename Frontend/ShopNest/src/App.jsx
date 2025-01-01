import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthProvider } from "./pages/Dashboard/AuthContext";
function App() {
  return <div>
    <AuthProvider>
      <Dashboard />
    </AuthProvider>,
  </div>;
}

export default App;
