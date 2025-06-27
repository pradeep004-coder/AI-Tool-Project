import { checkHeading } from "../Helper";

function Answers({ans, isHeader}) {
  return (
    <div className="bg-zinc-900">
        {
        checkHeading(ans) ? 
            <div className="block pt-5 pb-2 font-bold">{ans}</div> 
            : <div className={`block ${isHeader? '' : 'pl-4'}`}>{ans}</div>
        }
    </div> 
  )
}

export default Answers