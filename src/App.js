import React, {useState} from 'react';
import ClassCounter from './components/ClassCounter.jsx';
import Counter from './components/Counter.jsx';

import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton.jsx';
import MyInput from './components/UI/input/MyInput.jsx';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'Decription'},
    {id: 2, title: 'Java', body: 'Decription'},
    {id: 3, title: 'C#', body: 'Decription'}
  ]);
  const [title, setTitle] = useState('');
  const addNewPost = (e) => {
    e.preventDefault();
    console.log(title);
  }

  return (
    <div className="App">
      <form>
        <MyInput 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          type='text' 
          placeholder='Название'></MyInput>
        <MyInput type='text' placeholder='Описание'></MyInput>
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title={'Список постов 1'}/>
      <Counter/>
    </div>
  );
}

export default App;
