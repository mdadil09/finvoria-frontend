import { ThemeProvider } from "./components/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/sonner";
import AllRoutes from "./Routes/Routes";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SidebarProvider className="z-50 max-w-8xl flex flex-col">
        <AllRoutes />
      </SidebarProvider>
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}

export default App;
