import { ErrorBoundary } from "react-error-boundary";
import { Router } from "./Router";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  TokenProvider,
  MapProvider,
  FiltersProvider,
  AuthProvider,
} from "context/index";
import { GooglAPIProvider } from "./components";

function App() {
  const queryClient = new QueryClient();
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        <TokenProvider>
          <GooglAPIProvider>
            <MapProvider>
              <FiltersProvider>
                <AuthProvider>
                  <Router />
                  <ToastContainer />
                </AuthProvider>
              </FiltersProvider>
            </MapProvider>
          </GooglAPIProvider>
        </TokenProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
