import { useState } from "react";
import Deneme from "./components/Deneme";
import DenemeClass from "./components/DenemeClass";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>React İlk Uygulamam</h1>
      <div className="card">Merhaba React</div>
      <Deneme isim={"Varol"} yas={30} />
      <DenemeClass isim={"Class Bileşeni"} />
      <h1>Sayaç</h1>
      <div style={{ padding: "2rem" }}>{count}</div>
      <button onClick={() => setCount(count + 1)}>Artır</button>
      <button onClick={() => setCount(count - 1)}>Azalt</button>
    </>
  );
}

export default App;
