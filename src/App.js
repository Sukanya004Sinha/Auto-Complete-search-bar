import {useEffect, useState} from "react"
import './App.css';

export default function App() {
  const [input,setInput] = useState("");
  const [results,setResults] = useState([]);
  const [showResults  ,setShowResults] = useState(false);
  const fetchData = async () => {
      const data = await fetch("https://dummyjson.com/recipes/search?q="+ input);
      const json = await data.json();
      setResults(json?.recipes);
    };
    useEffect(() => {
      const timer = setTimeout(fetchData,300);
      return () => {
        clearTimeout(timer);
      };
    },[input] );

  return (
    <div className="App">
        <h1>Autocomplete Search Bar</h1>
        <div>
        <input type = "text"
         className="search-input" 
         value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={() => setShowResults(false)}
          onFocus={() => setShowResults(true)}
           />
           {showResults && (
           <div className="result-container">
           {results.map((r) =>
            <span className= "result" key ={r.id }>{r.name}</span>
  )}

           </div>
           )}
            </div>
      </div>


  );
}