import { useNavigate } from "react-router-dom"
import { getDate } from "../utils"

const RepoList = (props) => {
    const navigate = useNavigate()

    const handleRepoClick = (repo) => {
        navigate(`/repo/${repo.name}`, { state: repo })
    }

    return (
        <div className="repository-list">
            <h1> Repositories</h1>
            <div className="repository-container">
                <table>
                    <tbody>
                        {props.repos.length > 0 ? props.repos.map((repo) => (
                            // Filter out if repo.name or someother name is not avaiable, do not show in the list.
                            <tr key={repo.node_id}>
                                <th className={"repository-name"} onClick={() => handleRepoClick(repo)}>{repo?.name}</th>
                                <th>{repo?.visibility.charAt(0).toUpperCase() + repo?.visibility.slice(1)} {repo?.archived && "archived"}</th>
                                <th>{repo?.language}</th>
                                <th>{
                                    getDate(repo?.updated_at)
                                }
                                </th>
                            </tr>

                        )) : <>Loading...</>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RepoList