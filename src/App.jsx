import { useEffect, useState } from "react";
import Quote from "./Quotes.jsx";
import { Badge } from "@/components/ui/badge";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [tags, setTags] = useState(["tag1", "tag2", "tag3", "tag4"]);

  async function getData() {
    const response = await fetch("/quotes.json");
    const data = await response.json();

    setQuotes(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="p-4">
        <div>
          {tags.map((tag) => (
            <Badge>{tag}</Badge>
          ))}
        </div>
      </div>
      <div class="grid grid-cols-3 grid-rows-3 gap-3 ">
        {quotes.map((quote) => (
          <Quote quote={quote}></Quote>
        ))}
      </div>
    </>
  );
}
