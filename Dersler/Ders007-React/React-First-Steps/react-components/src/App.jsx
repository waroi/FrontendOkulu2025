import ListItem from "./components/ListItem";
import "./App.css";
import styles from "./CustomStyle.module.css";

function App() {
  const students = ["Ali", "Ayşe", "Mehmet"];
  return (
    <>
      <ul>
        {students.map((item, index) => (
          <ListItem key={index} student={item} />
        ))}
      </ul>
      <button className="Button">Deneme Buton 1</button>
      <button className={styles.customButton}>Deneme Buton 2</button>
    </>
  );
}

export default App;
