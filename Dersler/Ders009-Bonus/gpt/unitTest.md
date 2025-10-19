# Frontend Unit Test Eğitimi (Yeni Başlayanlar İçin)

> Bu doküman frontend bootcamp'i yeni bitirmiş bir öğrenci için yazıldı. Adım adım gideceğiz, her bölümde küçük örnekler olacak. Önce temel kavramları anlayıp sonra JavaScript fonksiyonları, DOM, async işlemler, mock'lar ve React component testlerine geçeceğiz.

## İçindekiler

1. Neden Unit Test Yazıyoruz?
2. Temel Kavramlar (Test Runner, Assertion, Matchers, Jest vs Vitest)
3. Ortam Kurulumu (Jest, Vitest, React Testing Library)
4. İlk Test: Saf (Pure) Fonksiyon
5. Edge Case ve Parametrik Testler
6. DOM Manipülasyon Testleri (JSDOM)
7. Async / Promise / Fetch Testleri
8. Mock ve Spy Kullanımı
9. React Component Testlerine Giriş
10. State / Context / Redux Slice Testi
11. Coverage (Kapsama) Nedir Nasıl Ölçeriz?
12. En İyi Uygulamalar ve Checklist
13. Sık Yapılan Hatalar (Anti-Patterns)
14. Ek Kaynaklar

---

## 1. Neden Unit Test Yazıyoruz?

Unit test (birim testi) bir fonksiyonun veya küçük bir modülün izole şekilde doğru çalışıp çalışmadığını kontrol eder.

Kazanımlar:

- Güven: Refactor yaparken korkuyu azaltır.
- Belgeleme: Kodun nasıl kullanılacağını örnekler üzerinden gösterir.
- Hız: Hata üretim ortamına gitmeden yerel ortamda yakalanır.
- Regresyonu önler: Önceden çalışan bir şeyin bozulduğunu erken fark ederiz.

## 2. Temel Kavramlar

Terimler:

- Test Runner: Testleri çalıştıran araç (Jest, Vitest). Dosyaları bulur, paralel çalıştırır, raporlar.
- Assertion / Expectation: "Şunu bekliyorum" kısmı. Örn: `expect(sum(2,3)).toBe(5)`.
- Matcher: Beklentiyi kontrol eden yardımcı metot: `toBe`, `toEqual`, `toContain`, `toThrow` ...
- Test Suite: Bir dosya veya describe bloğu.
- Test Case: `test()` veya `it()` içindeki tek senaryo.
- Mock: Gerçek bağımlılığı taklit eden sahte nesne/fonksiyon.
- Spy: Bir fonksiyon çağrıldı mı, kaç kez, hangi argümanlarla? Kaydeden yapı.
- Coverage: Testlerin kodu ne kadar satır, fonksiyon, branch bazında kapsadığı.

Jest vs Vitest:

- Jest: Uzun süredir kullanılan, çok plugin'i olan.
- Vitest: Vite projeleriyle hızlı entegrasyon, Jest API'lerinin çoğunu destekler, daha hızlı hot reload deneyimi.

Ne seçmeli? React + Vite kullanıyorsan Vitest çok pratik. Create React App veya Node ağırlıklıysa Jest de olur.

## 3. Ortam Kurulumu

### Jest Kurulum (Node / React - CRA)

```bash
npm install --save-dev jest @types/jest
```

ESM veya TypeScript varsa ek paketler (babel-jest, ts-jest) eklenebilir.

`package.json` içine script:

```json
"scripts": {
	"test": "jest"
}
```

Basit Jest yapılandırması (`jest.config.js`):

```js
module.exports = {
  testEnvironment: "jsdom", // DOM testleri için
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
```

### Vitest Kurulum (Vite + React)

```bash
npm install --save-dev vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

`package.json` script:

```json
"scripts": {
	"test": "vitest",
	"test:ui": "vitest --ui"
}
```

`vitest.config.js` örneği:

```js
import { defineConfig } from "vitest";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.js"],
  },
});
```

`test/setup.js`:

```js
import "@testing-library/jest-dom";
```

### React Testing Library (RTL)

Amaç: Kullanıcı davranışı odaklı test. `render`, `screen`, `userEvent` ile gerçekçi senaryolar.

## 4. İlk Test: Saf Fonksiyon

`sum.js`:

```js
export function sum(a, b) {
  return a + b;
}
```

`sum.test.js` (Jest veya Vitest):

```js
import { sum } from "./sum";

test("2 + 3 = 5", () => {
  expect(sum(2, 3)).toBe(5);
});
```

Çalıştır: `npm test`

## 5. Edge Case ve Parametrik Testler

Edge Case: Uç senaryolar (0, negatif sayı, boş string, undefined).

Örnek `safeDivide.js`:

```js
export function safeDivide(a, b) {
  if (b === 0) return Infinity;
  return a / b;
}
```

`safeDivide.test.js`:

```js
import { safeDivide } from "./safeDivide";

test("normal bölme", () => {
  expect(safeDivide(6, 3)).toBe(2);
});

test("0 a bölmek Infinity döner", () => {
  expect(safeDivide(5, 0)).toBe(Infinity);
});

describe("parametrik test", () => {
  const cases = [
    [6, 3, 2],
    [9, 3, 3],
    [10, 2, 5],
  ];
  test.each(cases)("%i / %i = %i", (a, b, expected) => {
    expect(safeDivide(a, b)).toBe(expected);
  });
});
```

## 6. DOM Manipülasyon Testleri

Bir fonksiyon düşün: Listeye yeni eleman ekliyor.

`addItem.js`:

```js
export function addItem(listEl, text) {
  const li = document.createElement("li");
  li.textContent = text;
  listEl.appendChild(li);
  return li;
}
```

`addItem.test.js`:

```js
import { addItem } from "./addItem";

test("listeye yeni li ekler", () => {
  document.body.innerHTML = '<ul id="list"></ul>';
  const list = document.getElementById("list");
  addItem(list, "Merhaba");
  expect(list.children.length).toBe(1);
  expect(list.textContent).toContain("Merhaba");
});
```

Not: Jest/Vitest JSDOM kullanınca `document` nesnesi simüle edilir.

## 7. Async / Promise / Fetch Testleri

`fetchUser.js`:

```js
export async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  if (!res.ok) throw new Error("Network");
  return res.json();
}
```

Testte gerçek ağa gitmek istemiyoruz -> fetch'i mocklarız.

`fetchUser.test.js`:

```js
import { fetchUser } from "./fetchUser";

beforeEach(() => {
  global.fetch = vi.fn(); // Vitest ise; Jest'te jest.fn()
});

test("başarılı kullanıcı verisi döner", async () => {
  const fakeUser = { id: 1, name: "Ada" };
  fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(fakeUser),
  });
  const data = await fetchUser(1);
  expect(data).toEqual(fakeUser);
  expect(fetch).toHaveBeenCalledWith("https://api.example.com/users/1");
});

test("hata durumunda throw eder", async () => {
  fetch.mockResolvedValueOnce({ ok: false });
  await expect(fetchUser(1)).rejects.toThrow("Network");
});
```

Timer örneği:

```js
test("setTimeout ile gecikmeli işlem", () => {
  vi.useFakeTimers(); // jest.useFakeTimers()
  const fn = vi.fn();
  setTimeout(fn, 1000);
  vi.advanceTimersByTime(1000);
  expect(fn).toHaveBeenCalled();
});
```

## 8. Mock ve Spy Kullanımı

Senaryo: Logger bağımlılığını izole etmek.

`process.js`:

```js
export function processItem(item, logger) {
  if (!item) {
    logger.error("Boş item");
    return false;
  }
  logger.info("İşlendi");
  return true;
}
```

`process.test.js`:

```js
import { processItem } from "./process";

test("boş item hata loglar", () => {
  const logger = { error: vi.fn(), info: vi.fn() };
  const result = processItem(null, logger);
  expect(result).toBe(false);
  expect(logger.error).toHaveBeenCalledWith("Boş item");
  expect(logger.info).not.toHaveBeenCalled();
});

test("item varsa info loglar", () => {
  const logger = { error: vi.fn(), info: vi.fn() };
  const result = processItem("A", logger);
  expect(result).toBe(true);
  expect(logger.info).toHaveBeenCalledTimes(1);
});
```

Module mock:

```js
// math.js
export function random0to1() {
  return Math.random();
}

// consumer.js
import { random0to1 } from "./math";
export function pick() {
  return random0to1() > 0.5 ? "A" : "B";
}

// consumer.test.js (Vitest)
import { vi, test, expect } from "vitest";
import * as math from "./math";
import { pick } from "./consumer";

test("her zaman A döndürmek için random mockla", () => {
  vi.spyOn(math, "random0to1").mockReturnValue(0.9);
  expect(pick()).toBe("A");
});
```

## 9. React Component Testlerine Giriş

Basit bir sayaç.

`Counter.jsx`:

```jsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p role="status">Sayaç: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Arttır</button>
    </div>
  );
}
```

`Counter.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

test("butona basınca sayaç artar", async () => {
  render(<Counter />);
  const button = screen.getByRole("button", { name: /Arttır/i });
  await userEvent.click(button);
  expect(screen.getByRole("status")).toHaveTextContent("Sayaç: 1");
});
```

Seçiciler: `getByRole`, `getByText` kullanıcı odaklı -> iyi. `getByTestId` -> gerekince.

## 10. State / Context / Redux Slice Testi

Context örneği:

```jsx
// ThemeContext.jsx
import { createContext, useContext } from "react";
export const ThemeContext = createContext("light");
export function useTheme() {
  return useContext(ThemeContext);
}
```

`ShowTheme.jsx`:

```jsx
import { useTheme } from "./ThemeContext";
export function ShowTheme() {
  const theme = useTheme();
  return <span>Aktif tema: {theme}</span>;
}
```

`ShowTheme.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { ThemeContext } from "./ThemeContext";
import { ShowTheme } from "./ShowTheme";

test("context ile tema gösterir", () => {
  render(
    <ThemeContext.Provider value="dark">
      <ShowTheme />
    </ThemeContext.Provider>
  );
  expect(screen.getByText(/Aktif tema:/)).toHaveTextContent("dark");
});
```

Redux Toolkit slice testi (sadece reducer):

```js
// counterSlice.js
export const initialState = { value: 0 };
export function reducer(state = initialState, action) {
  switch (action.type) {
    case "inc":
      return { value: state.value + 1 };
    default:
      return state;
  }
}
```

`counterSlice.test.js`:

```js
import { reducer, initialState } from "./counterSlice";

test("inc action value arttırır", () => {
  const newState = reducer(initialState, { type: "inc" });
  expect(newState.value).toBe(1);
});
```

## 11. Coverage (Kapsama)

Jest: `jest --coverage` veya script ekle.
Vitest: `vitest --coverage`.

Rapor Türleri:

- Lines (Satırlar)
- Functions (Fonksiyonlar)
- Branches (if/else yolları)
- Statements

Threshold örneği (Vitest):

```js
test: {
	coverage: {
		provider: 'v8',
		reportsDirectory: './coverage',
		thresholds: { lines: 80, functions: 80 }
	}
}
```

## 12. En İyi Uygulamalar & Checklist

- Test isimleri açıklayıcı: "butona basınca sayaç artar".
- Her test izole: Ortak state bırakma. `beforeEach` ile sıfırla.
- Mock sadece gerektiğinde: Gerçek davranışı fazla gizleme.
- Kullanıcı odaklı seçiciler: `getByRole` tercih et.
- Küçük fonksiyonları kolayca test et: Pure function basit.
- Yavaş testleri azalt: Büyük ağ isteklerini tamamen mockla.
- Tek sorumluluk: Bir test bir ana davranışı doğrulasın.

Checklist (hızlı):

1. Anlamlı isim? ✅
2. Gerçek kullanıcı davranışı mı? ✅
3. Gereksiz mock yok? ✅
4. Edge case eklendi mi? ✅
5. Okunabilir mi (arrange-act-assert)? ✅

## 13. Sık Yapılan Hatalar (Anti-Patterns)

- Implementation detayına bağımlı test (DOM className'ine aşırı bağımlı).
- Her şeyi mocklamak -> Gerçek akış kaybolur.
- Büyük test: Bir testte 10 farklı assert -> Hata nedeni zor bulunur.
- Sihirli sayılar / stringler -> Sabitleri anlamlı isimlerle kullan.
- Testleri çalıştırmamak / CI entegrasyonu yok.

## 14. Ek Kaynaklar

- Jest Docs: https://jestjs.io
- Vitest Docs: https://vitest.dev
- Testing Library: https://testing-library.com/docs/
- Kent C. Dodds Testing Principles Makaleleri
- "Testing JavaScript" (Video kurs)

---

### Bonus: Arrange - Act - Assert Yapısı

Test içinde 3 bölüm düşün:

1. Arrange (Hazırlık): Değişkenleri, DOM'u kur.
2. Act (Eylem): Fonksiyonu çağır, butona tıkla.
3. Assert (Doğrulama): `expect(...)` ile sonucu doğrula.

Örnek:

```js
test("butona basınca mesaj görünür", async () => {
  // Arrange
  render(<Message />);
  const button = screen.getByRole("button", { name: /Göster/i });
  // Act
  await userEvent.click(button);
  // Assert
  expect(screen.getByText("Mesaj: Merhaba")).toBeInTheDocument();
});
```

---

Yeni başlayan için öneri: Önce pure fonksiyon, sonra DOM, sonra async, en son React componentleri. Her seviyede 2-3 test yazarak ilerle.

Soruların olursa dokümandaki bölüm numarasıyla sorabilirsin ("Bölüm 7 fetch mock kısmı anlaşılmadı" gibi).

İyi testler! 🚀
