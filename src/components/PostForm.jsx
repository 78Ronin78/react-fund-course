import React, {useState} from 'react';
import MyButton from './UI/button/MyButton.jsx';
import MyInput from './UI/input/MyInput.jsx';

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost);
        setPost({title: '', body: ''});
    }


    return(
        <form>
        {/*Управляемый компонент*/}
        <MyInput 
          value={post.title} 
          onChange={e => setPost({...post, title: e.target.value})}
          type='text' 
          placeholder='Название'></MyInput>
        {/*Неуправляемый компонент*/}
        <MyInput 
          value={post.body} 
          onChange={e => setPost({...post, body: e.target.value})}
          type='text' 
          placeholder='Описание'>

        </MyInput>
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
    );
};
export default PostForm