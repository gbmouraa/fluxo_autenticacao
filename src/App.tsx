import { AppRouter } from "./routes/app-router";
import { AuthProvider } from "./contexts/auth-context-provider";

function App() {
  return (
    <AuthProvider>
      <div className="h-screen w-full bg-gray-50">
        <AppRouter />
      </div>
    </AuthProvider>
  );
}

export default App;
