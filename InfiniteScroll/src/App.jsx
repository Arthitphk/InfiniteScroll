import { useState, useEffect } from "react"
import Card from "./Components/Card"

function App() {
  const[cardcontent, setCardContent] = useState([]);
  const[pages, setPages] = useState(1);
  const fetchData = async () => {
    const ApiData = `https://api.sampleapis.com/codingresources/codingResources`
    const res = await fetch(ApiData);
    const data = await res.json();
    setCardContent((lastPage) => {
      return [...lastPage, ...data];
    });
  };

  useEffect(() => {
    fetchData();
  },[pages]);

  useEffect (() => {
    const handScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPages((lastPage) => lastPage + 1);
      }
    }; 
      window.addEventListener("scroll", handScroll);
  },[]);


  return (
    <div className="container mx-auto">
        <h1 className="text-7xl m-10 text-center">Infinite Scroll</h1>
        <main className="grid grid-cols-4 gap-10">
            {cardcontent.map((cardcontent, index) => 
              <Card key={index} {...cardcontent}/>
          )}
        </main>
    </div>
  )
}

export default App
