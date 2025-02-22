import { useEffect, useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [list, setList] = useState([]);
  const [start, setStart] = useState(0);
  const conatinerRef = useRef();
  const lastItemRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const res = fetch(
        `https://dummyjson.com/products?limit=10&skip=${Number(
          start
        )}&select=title,price`
      )
        .then((res) => res.json())
        .then((res) => {
          setIsLoading(false);
          setList((prev) => [...prev, ...res.products]);
        });
    };
    !isLoading && fetchProducts();
  }, [start]);

  const handleScrollchanges = async (e) => {
    const { bottom: bottomContainer } =
      conatinerRef.current.getBoundingClientRect();
    const { top: topLastItem } = lastItemRef.current.getBoundingClientRect();

    if (topLastItem - bottomContainer < 10 && !isLoading) {
      setStart(start + 10);
    }
  };

  return (
    <div className="App">
      <div
        className="container"
        ref={conatinerRef}
        onScroll={handleScrollchanges}
      >
        {list.map((each) => {
          return (
            <div className="eachRow" key={each.id}>
              <div>{each.title} </div>
              <div> {each.price}</div>
            </div>
          );
        })}
        <div className="loader" ref={lastItemRef}>
          {isLoading ? "Loading..." : ""}
        </div>
      </div>
    </div>
  );
}
