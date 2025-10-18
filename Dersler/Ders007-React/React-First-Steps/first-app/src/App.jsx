import Deneme from "./components/Deneme";
import DenemeClass from "./components/DenemeClass";
import "./App.css";

function App() {
  return (
    <>
      <h1>React İlk Uygulamam</h1>
      <div className="card">Merhaba React</div>
      <Deneme isim={"Varol"} yas={30} />
      <DenemeClass isim={"Class Bileşeni"} />
    </>
  );
}

export default App;
