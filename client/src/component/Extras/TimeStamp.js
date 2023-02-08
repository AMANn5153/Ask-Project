import { parseISO,formatDistanceToNow } from 'date-fns'

const TimeStamp=({postTime})=>{
    let timeAgo=""
    if(postTime){
        const date=parseISO(postTime)
        const time =formatDistanceToNow(date)
        timeAgo=`${time} Ago`
    }
    return(
        <>
            <i>{timeAgo}</i>
        </>
    )
}

export default TimeStamp