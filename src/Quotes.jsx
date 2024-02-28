export default function Quote(props) {
  return (
    <>
      <div className="border-4 border-black p-5 text-center">
        <div>{props.quote.content}</div>
        <div>
          <strong>{props.quote.author}</strong>
        </div>
      </div>
    </>
  );
}
