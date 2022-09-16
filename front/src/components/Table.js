function Table({ content, select }) {
    return (
        <table className="table text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Select</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        content.map((movie, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{movie.title}</td>
                                <td>{movie.director}</td>
                                <td><button onClick={() => { select(i) }} className="btn btn-success">Select</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    )

}

export default Table;