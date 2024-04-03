import { useState, useRef, useEffect } from "react";
import "./App.css";
import Jokes from "./components/Jokes";
import Loader from "./components/Loader";

function App() {
	const [selected, setSelected] = useState("categories");
	const [categories, setCategories] = useState([]);
	const [isDataLoading, setIsDataLoading] = useState(false);
	const [jokeQuery, setJokeQuery] = useState("animal");
	const [jokes, setJokes] = useState([]);
	const inputRef = useRef("");

	const FreeText = () => {
		return (
			<div className="options--freetext">
				<label>
					Free Text:
					<input ref={inputRef} type="text" placeholder="Enter Text" required />
				</label>
				<button type="button" onClick={handleInput}>
					Search
				</button>
			</div>
		);
	};

	const Categories = () => {
		return (
			<div className="options--categories">
				{isDataLoading ? (
					<Loader />
				) : (
					<div className="categories">
						<label>
							Category:
							<select
								value={jokeQuery}
								onChange={(e) => setJokeQuery(e.target.value)}
							>
								{categories.map((index) => (
									<option key={index}>{index}</option>
								))}
							</select>
						</label>
					</div>
				)}
				<button type="button" onClick={handleSelection}>
					Search
				</button>
			</div>
		);
	};

	const handleInput = () => {
		if (inputRef.current.value) {
			fetchJoke(inputRef.current.value);
		}
	};

	const handleSelection = () => {
		fetchJoke(jokeQuery);
	};

	const fetchJoke = (query) => {
		setIsDataLoading(true);

		fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
			.then((res) => res.json())
			.then((data) => {
				setJokes(data.result);
				setIsDataLoading(false);
			})
			.catch((err) => {
				setIsDataLoading(false);
				console.log(err);
			});
	};

	useEffect(() => {
		setIsDataLoading(true);
		const url = "https://api.chucknorris.io/jokes/categories";

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setIsDataLoading(false);
				setCategories(data);
			})
			.catch((err) => {
				setIsDataLoading(false);
				console.log(err);
			});
	}, []);

	return (
		<>
			<h1>Chuck Norris Jokes 🤡</h1>
			<div className="options">
				<span
					className={
						selected === "categories"
							? "options--selected"
							: "options--unselected"
					}
					onClick={() => setSelected("categories")}
				>
					Categories
				</span>
				<span
					className={
						selected === "freetext"
							? "options--selected"
							: "options--unselected"
					}
					onClick={() => setSelected("freetext")}
				>
					Free Text
				</span>
			</div>
			{selected === "categories" ? <Categories /> : <FreeText />}
			{jokes.length ? (
				<Jokes data={jokes} />
			) : (
				<div className="joke">
					<span>No joke found.</span>
				</div>
			)}
		</>
	);
}

export default App;
