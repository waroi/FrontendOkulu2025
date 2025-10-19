import "./App.css";

function App() {
  const userName: string = "Varol";
  const userAge: number = 30;
  const user: { name: string; age: number } = {
    name: userName,
    age: userAge,
  };
  const userNames: string[] = ["Ali", "Veli", "Ayşe"];

  function merhaba(name: string): string {
    return `Merhaba, ${name}!`;
  }

  console.log(merhaba(user.name));

  return (
    <>
      <h1>User Information</h1>
      <p>Name: {user.name}</p>
      {userName} {userAge}
      <p>Age: {user.age}</p>
      <h2>User Names</h2>
      <ul>
        {userNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
