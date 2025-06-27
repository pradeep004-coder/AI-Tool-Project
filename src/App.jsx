import { useEffect, useState } from "react";
import { URL } from "./Constants";
import Answers from "./Components/Answers";
import { checkHeading } from "./Helper";
import Question from "./Components/Question";
function App() {
  const [query, setQuery] = useState('rank best miltitaries in the world also mention usp of each');
  const [response, setResponse] = useState(undefined);
  const [headerRange, setHeaderRange] = useState(0)
  const [ chat, setChat ] = useState([])

  useEffect( () => {  // check the range of head of each response
    if (response) {
      [...response].map( (item, index) => {
          if(!checkHeading(item) && headerRange==index) {
            setHeaderRange(index)
          }
    })
    }
  }, [response])

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const payload = {
     "contents": [
      {
        "parts": [
          {
            "text": query
          }
        ]
      }
    ]
  }
  const askQuestion = async () => {
    let res = await fetch(URL, { // send question and get response from the api
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body : JSON.stringify(payload)
    })
    
    const json = await res.json()   // process the response
    const dataString =  json.candidates[0].content.parts[0].text
    const dataArray = dataString.split("* ").map( item => item.trim())
    setResponse(dataArray)

    const newEntry = { // make record of each query-response pair
      id: chat.length+1,
      question: query,
      answer: dataArray,
      time: getCurrentTime(),
    };
    setChat(prev => [...prev, newEntry])
  }
  
  return (
    <div className='grid grid-col-5  h-screen'>
      <div className='col-span-1 bg-zinc-800 h-full' style={{}}>Sidebar</div>
      <div className='col-span-4 pb-10'>
        <div className="container p-3 h-110 overflow-auto text-zinc-300">
          { chat.length && chat.map((chatItem) => (
            <div>
                <Question question={chatItem.question} time={chatItem.time} />
                <ul className="my-4 mb-8">
                    {chatItem.answer && [...chatItem.answer].map((item, index) => {
                        return <li key={index}>
                          <Answers ans={item} isHeader={headerRange==index}/>
                        </li>
                    })}
                </ul>
                <hr/>
            </div>
            ))}
        </div>
        <div className="bg-zinc-700 w-1/2 text-white m-auto p-1 pr-5 rounded-4xl border border-zinc-400 flex h-16">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full h-full p-3 outline-none" placeholder="ask me anything..."/>
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  )
}

export default App
