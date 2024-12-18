import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar } from "./components";
import { setAuthToken } from "./libs/apiCall";
import { AccountsPage, Dashboard, SettingsPage, Transactions } from "./pages";
import useStore from "./store";
import Signup  from "./pages/auth/sign-up";
import Signin from "./pages/auth/sign-in";
import Hero from "./components/Hero";

const RootLayout = () => {
  const { user } = useStore((state) => state);

  setAuthToken(user?.token || "");

  return !user ? (
    <Navigate to={"/"} replace={true} />
  ) : (
    <>
      <Navbar />
      <div className="min-h-[cal(h-screen-100px)] md:px-20 px-6 relative">
        <Outlet />
      </div>
    </>
  );
};

const App = () => {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <main>
      <div className="w-full min-h-screen bg-gray-100  dark:bg-slate-900">
        <Routes>
        <Route path="/" element={<Hero />} />
          <Route element={<RootLayout />}>
            <Route path="/overview" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/account" element={<AccountsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
        </Routes>
      </div>

      <Toaster richColors position="top-center" />
    </main>
  );
};

export default App;
