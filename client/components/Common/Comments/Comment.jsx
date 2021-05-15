import React from 'react';
//
import classes from './Comment.module.scss';

const Comment = (props) => {
    const comment = props.comment;
    const user = comment.user;
    // comment: { user: ..., text: ..., date: ..., rating: 0-5 }
    function GenerateStars() {
        const elements = [];
        //
        for(let i = 0; i < comment.rating; i++)
        {
            elements.push(<i class="fa fa-star" aria-hidden="true"></i>);
        }
        //
        return elements;
    }

    return (
        <div className={classes.comment}>
            <div className={classes.image}>
                <img src={user.image}/>
            </div>
            {/*  */}
            <div className={classes.text}>
                {comment.text}
            </div>  
            {/*  */}
            <div className={classes.info}>
                <div className={classes.name}>
                    {user.name + ' ' + user.surname + ' ' + user.middle_name}
                </div>
                <div className={classes.date}>
                    {new Date(comment.date).toLocaleDateString()}
                </div>
                <div className={classes.rating}>
                    {GenerateStars()}
                </div>
            </div>                    
        </div>
    )
}

export default Comment;