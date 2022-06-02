import React, {useEffect, useRef, useState} from 'react';
import PostService from '../API/PostService.js';
import PostFilter from '../components/PostFilter.jsx';
import PostForm from '../components/PostForm.jsx';

import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton.jsx';
import Loader from '../components/UI/loader/Loader.jsx';
import MyModal from '../components/UI/modal/MyModal.jsx';
import Pagination from '../components/UI/pagination/Pagination.jsx';
import MySelect from '../components/UI/select/MySelect.jsx';
import { useFetching } from '../hooks/useFetching.js';
import { useObserver } from '../hooks/useObserver.js';
import {usePosts} from '../hooks/usePosts.js';
import {getPageCount} from '../utils/pages.js';



function Posts() {
  const [posts, setPosts] = useState([
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const lastElement = useRef();
  useObserver(lastElement, page < totalPages, isPostsLoading, () =>{
      setPage(page + 1);
  });
  console.log(lastElement);



  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit ]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}></hr>
      <PostFilter 
        filter={filter} 
        setFilter={setFilter}
      />
      <MySelect
          value={limit}
          onChange={value => setLimit(value)}
          defaultValue='Кол-во элементов на странице'
          options={[
            {value: 5, name: '5'},
            {value: 10, name: '10'},
            {value: 25, name: '25'},
            {value: -1, name: 'все'},
          ]}
        >
      </MySelect>
      {postError && 
              <h1>Произошла ошибка ${postError}</h1>
          }

          <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов 1'} />
          <div ref={lastElement} style={{height: '20px', background: 'red'}}>

          </div>


          {isPostsLoading &&
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                  <Loader />
              </div>

          }
      <Pagination 
        totalPages={totalPages} 
        page={page} 
        changePage={changePage}/>
      {/*<Counter/>*/}
    </div>
  );
}

export default Posts;
