import React, { useEffect, useState } from 'react';
import Posts from './components/admin/Posts';
import PostLoadingComponent from './components/posts/LoadPosts';
import axiosInstance from './Axios';

function Admin() {
	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);

	return (
		<div style = {{ marginTop:40,}}>
			<h1 style = {{ marginLeft:210,}}>Admin Panel</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default Admin;
