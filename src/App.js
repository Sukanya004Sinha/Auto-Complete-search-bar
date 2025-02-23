import {useEffect, useState} from "react"
import './index.css';

export default function App() {
  const [input,setInput] = useState("");
  const [results,setResults] = useState([]);
  const [showResults,setShowResults] = useState(false);
  const [cache,setCache] = useState ({});

  const fetchData = async () => {
    if(cache[input]){
      console.log("CACHE RETURNED", input);
      setResults(cache[input]);
      return;
    }
      console.log("API CALL", input);
      const data = await fetch("https://dummyjson.com/recipes/search?q="+ input);
      const json = await data.json();
      setResults(json?.recipes);
      setCache(prev => ({
      ...prev,[input]: json?.recipes
    }));
  };
    useEffect(() => {
      const timer = setTimeout(fetchData,300);
      return () => {
        clearTimeout(timer);
      };
    },[input] );
  
  return (
    <div className="App">
        <h1>Autocomplete Search Bar :-) </h1>
        <div>
        <input 
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={() => setShowResults(false)}
          onFocus={() => setShowResults(true)}
          aria-label="Search for recipes"
          role="combobox"
          aria-expanded={showResults}
          aria-autocomplete="list"
          aria-controls="results-list"
        />
        {showResults && (
          <div 
            className="result-container"
            id="results-list"
            role="listbox"
            aria-live="polite"
          >
            {results.map((r) => (
              <span 
                className="result" 
                key={r.id} 
                role="option"
              >
                {r.name}
              </span>
            ))}
          </div>
        )}
        </div>
    </div>
  );
}