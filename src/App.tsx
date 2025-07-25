import { AppRouter } from "./routes/app-router";
import { AuthProvider } from "./contexts/auth-context-provider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <div className="h-screen w-full bg-gray-50">
        <AppRouter />
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
