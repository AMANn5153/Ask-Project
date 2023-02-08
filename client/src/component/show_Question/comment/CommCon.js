import {useContext} from 'react'
import { useSelector } from 'react-redux'
import "./comment.css"

const style={
  margin:"15px"
}
const CommCon = () => {
  const details=useSelector(state=>state.questionDetails)
  return (
    <div className='commCon-style'>
        <p style={style}>
            {details.postDetails[0].Post.problem}
        </p>
        {details.codeSnip!==undefined?<img src={details.codeSnip} width="350px" height="200px"/>:null}
        <p style={style}>
          {details.postDetails[0].Post.problemExpec}
        </p>
    </div>
  )
}

export default CommCon