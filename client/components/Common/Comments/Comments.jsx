import React from 'react';
//
import Comment from './Comment.jsx';
//
import classes from './Comments.module.scss';

const Comments = (props) => {
    const comments = props.comments;
    const max = props.max;
    //
    const className = props.className;
    const classTitle = props.classTitle;
    const classContent = props.classContent;
    //

    function GenerateComments() {
        const elements = []
        //
        if(comments)
        {
            for(let i = 0; i < comments.length; i++)
            {
                if(max && i >= max)
                    break;
                //
                elements.push(<Comment comment={comments[i]}/>);
            }
        }
        //
        return elements;
    }

    return (
        <div className={classes.comments + ' ' + className}>
            {comments && comments.length > 0 ? 
            <div className={classes.title + ' ' + classTitle}>
                <p>Комментарии</p>
            </div> : ''}
            <div className={classes.content +' ' + classContent}>
                {GenerateComments()}
            </div>
        </div>
    )
}

export default Comments;