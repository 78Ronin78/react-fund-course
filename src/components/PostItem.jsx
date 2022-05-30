import React from 'react';
import '../styles/App.css';

const PostItem = function (props) {
    console.log(props);
    return (
    <div className='post'>
        <div className='post_content'>
          <strong>{props.post.id}. {props.post.title}</strong>
          <div>
          {props.post.body}
          </div>
        </div>
        <div className='post_btns'>
          <button>Delete post</button>
        </div>
    </div>
    );
}

export default PostItem;