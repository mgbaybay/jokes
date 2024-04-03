import { useState } from "react";

import Pagination from "./Pagination";

export default function Jokes({ data }) {
	const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastPost = currentPage * 2;
    const indexOfFirstPost = indexOfLastPost - 2;
    const jokesArr = data.slice(indexOfFirstPost, indexOfLastPost);

	const jokes = jokesArr.map((joke) => {
		return (
			<div className="joke" key={joke.id}>
				<span>{joke.value}</span>
				<span>😂🤣🤪😁</span>
			</div>
		);
	});

	const handlePagination = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className="joke--container">
			{jokes}
			<Pagination
				postsPerPage={2}
				length={data.length}
				handlePagination={handlePagination}
				currentPage={currentPage}
			/>
		</div>
	);
}
