import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();

type QueryProviderProps = {
  children: React.ReactNode;
};

function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default QueryProvider;
