import { useEffect, useState } from "react";
import Quote from "./Quotes.jsx";
import { Badge } from "@/components/ui/badge";
import { Select } from "@radix-ui/react-select";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [tags, setTags] = useState(["tag1", "tag2", "tag3", "tag4"]);
  const [selectedTag, setSelectedTag] = useState(null);

  async function getData() {
    const response = await fetch("/quotes.json");
    const data = await response.json();

    setQuotes(data);
  }

  function isQuoteSelected(quote) {
    if (!selectedTag) {
      return true;
    }
    return quote.tags.includes(selectedTag);
  }

  useEffect(() => {
    console.log(selectedTag);
  }, [selectedTag]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    //če quotes obstaja in če je kej v njem
    if (!(quotes && quotes.length > 0)) {
      // če ne ustavimo funkcije

      return;
    }

    // če pridemo sem se zgornji if ni izpolnil

    let tags = [];

    quotes.forEach((e) => {
      const quote_tags = e["tags"];

      quote_tags.forEach((tag) => {
        console.log(tag);
        if (tags.includes(tag)) {
          console.log("je ze notri");
        } else {
          tags.push(tag);
        }
      });

      //for loop za vse tage tega quopta (e["tags"])
      //za vsakega preverimo če je v seznamu
      //    tags.includes("FameousQuotes")
      // če tega elementa ni v seznamuga dodamo
      //    tags.push("FameousQuotes")
    });

    setTags(tags);
  }, [quotes]);

  return (
    <>
      <div className="p-4">
        <div>
          {tags.map((tag) => (
            <Badge key={tag} onClick={() => setSelectedTag(tag)}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-3 ">
        {quotes
          .filter((quote) => isQuoteSelected(quote))
          .map((quote) => (
            <Quote quote={quote} key={quote["_id"]}></Quote>
          ))}
      </div>
    </>
  );
}
