import React from 'react';
//
import Comment from './Comment.jsx';
//
import classes from './Comments.module.scss';

const Comments = (props) => {
    const comments = props.comments;

    function GenerateComments() {
        const elements = []
        //
        for(let i = 0; i < comments.length; i++)
        {
            const comment = comments[i];
            // console.log(comment);
            elements.push(<Comment comment={comment}/>);
        }
        return elements;
    }

    return (
        <div className={classes.comments + ' ' + props.className}>
            {comments.length > 0 ? <h1>Комментарии</h1> : ''}
            {GenerateComments()}
        </div>
    )
}

export default Comments;