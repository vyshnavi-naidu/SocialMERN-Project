import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';

export default function Profile(){
  const { id } = useParams();
  const [user,setUser]=useState(null);
  const [posts,setPosts]=useState([]);
  useEffect(()=>{ load(); loadPosts(); },[id]);
  const load = async ()=>{ try{ const res = await api.get('/users/' + id); setUser(res.data); }catch(err){ console.error(err); } };
  const loadPosts = async ()=>{ try{ const res = await api.get('/posts/user/' + id); setPosts(res.data); }catch(err){ console.error(err); } };
  const toggleFollow = async ()=>{ try{ await api.post('/users/' + id + '/follow'); load(); }catch(err){ alert(err.response?.data?.message || err.message); } };
  return (
    <div style={{maxWidth:900, margin:'24px auto'}}>
      <div className="card" style={{display:'flex', gap:12, alignItems:'center'}}>
        <img className="dp" src={(user?.dp? (import.meta.env.VITE_API_URL || 'http://localhost:5000') + user.dp : 'https://via.placeholder.com/80')} />
        <div style={{flex:1}}>
          <h2 className="huge">{user?.name}</h2>
          <div className="meta">{user?.email}</div>
          <div style={{height:8}} />
          <div className="row">
            <div className="badge">Followers: {user?.followers?.length || 0}</div>
            <div className="badge">Following: {user?.following?.length || 0}</div>
            <button className="btn small" onClick={toggleFollow}>Follow / Unfollow</button>
          </div>
        </div>
      </div>

      <h3 style={{marginTop:12}}>Posts</h3>
      {posts.map(p=>(
        <div key={p._id} className="card">
          <p>{p.caption}</p>
          {p.photo && <img className="post-photo" src={(import.meta.env.VITE_API_URL || 'http://localhost:5000') + p.photo} />}
        </div>
      ))}
    </div>
  );
}