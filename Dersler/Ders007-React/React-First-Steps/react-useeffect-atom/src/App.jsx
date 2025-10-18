import { useState, useEffect } from "react";
import Button from "./components/Atoms/Button";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("useEffect çalıştı");
  });
  useEffect(() => {
    console.log("useEffect başlangıçta (mount) çalıştı");
  }, []);
  useEffect(() => {
    console.log("useEffect update aşamasında (count-update) çalıştı");
  }, [count]);
  useEffect(() => {
    return () => {
      console.log("useEffect component unmount aşamasında çalıştı");
    };
  }, []);
  return (
    <>
      <h1 onClick={() => setCount(count + 1)}>
        React useEffect {count} kez tıklandı
      </h1>
      {/* <Button /> */}
    </>
  );
}

export default App;
