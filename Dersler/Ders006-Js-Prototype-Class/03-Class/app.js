// Class
class Person {
  constructor(name, age, langs) {
    this.name = name;
    this.age = age;
    this.langs = langs;
    // this.bilgileriGoster = function () {
    //   console.log(this.name, this.age, this.langs);
    // };
  }
  bilgileriGoster = function () {
    console.log(this.name, this.age, this.langs);
  };
}

const person1 = new Person("Ayşe", 22, ["C#", "Java"]);
const person2 = new Person("Fatma", 28, ["Go", "Rust"]);

// console.log(person1);
// console.log(person2);
// person1.bilgileriGoster();

// class Matematik {
//   static cube(x) {
//     return x * x * x;
//   }
// }

// console.log(Matematik.cube(3));

// Inheritance
class Employee extends Person {
  constructor(name, age, langs, salary) {
    super(name, age, langs);
    this.salary = salary;
  }
}

const emp = new Employee("Zeynep", 30, ["Python", "Dart"], 8000);
console.log(emp);
emp.bilgileriGoster();
