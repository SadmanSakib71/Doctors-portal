import { RouterProvider } from "react-router-dom";
import { router } from "./Route/Routing";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
