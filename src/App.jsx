import { BrowserRouter } from "react-router-dom";
import DashboardApp from "./components/DashboardApp";

const App = () => {
  return (
    <BrowserRouter>
      <DashboardApp />
    </BrowserRouter>
  );
};

export default App;
