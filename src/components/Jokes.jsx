export default function Jokes({data}) {
    const jokes = data.map(joke => {
        return (
            <div className="joke" key={joke.id}>
                <span>{joke.value}</span>
                <span>😂🤣🤪😁</span>
            </div>
        )
    })

    return (
        <div className="joke--container">
            {jokes}
        </div>
    )
}