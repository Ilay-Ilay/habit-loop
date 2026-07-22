import AuthProvider from "./providers/AuthProivider";
import QueryProvider from "./providers/QueryProvider";
import Router from "./providers/RouterProvider";
import UIProvider from "./providers/UIProvider";

function App() {
  return (
    <AuthProvider>
      <QueryProvider>
        <UIProvider>
          <Router />
        </UIProvider>
      </QueryProvider>
    </AuthProvider>
  );
}

export default App;
