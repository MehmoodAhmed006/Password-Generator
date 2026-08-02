import { useState, useCallback, useEffect } from "react";

function App() {
  const [char, setCharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [number, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "0123456789";
    }

    if (char) {
      str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);
  }, [length, number, char]);

  const copyPasswordToClipboard = async () => {
    await navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-3xl bg-slate-800 shadow-2xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Password Generator
        </h1>

        {/* Password Field */}
        <div className="flex overflow-hidden rounded-xl border border-slate-700 bg-white mb-8">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            className="w-full px-4 py-3 outline-none text-slate-800"
          />

          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors px-5 text-white font-medium cursor-pointer"
          >
            Copy
          </button>
        </div>

        {/* Length */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-white mb-2">
            <span>Password Length</span>
            <span className="font-semibold text-orange-400">{length}</span>
          </div>

          <input
            id="length"
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full cursor-pointer accent-orange-500"
          />
        </div>

        {/* Options */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <label
            htmlFor="number"
            className="flex items-center gap-2 text-white cursor-pointer select-none"
          >
            <input
              id="number"
              type="checkbox"
              checked={number}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="accent-orange-500"
            />
            Numbers
          </label>

          <label
            htmlFor="char"
            className="flex items-center gap-2 text-white cursor-pointer select-none"
          >
            <input
              id="char"
              type="checkbox"
              checked={char}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="accent-orange-500"
            />
            Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
