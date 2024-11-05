import "./App.css";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import DataProvider from "./context/DataContext.jsx";

function App() {



  return (
    <>
      <DataProvider>
        <Navbar />
        <Users />
        <Button />
      </DataProvider>
    </>
  );
}

export default App;
