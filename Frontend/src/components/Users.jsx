import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
export default function Users(){
  const [users,setUsers]=useState([]);
  const [q,setQ]=useState('');
  const load=async ()=>{ try{ const res = await api.get('/users?q=' + encodeURIComponent(q)); setUsers(res.data); }catch(err){ console.error(err); } };
  useEffect(()=>{ load(); },[q]);
  const toggle = async id=>{
    try{ await api.post('/users/'+id+'/follow'); load(); }catch(err){ alert(err.response?.data?.message || err.message); }
  };
  return (
    <div style={{maxWidth:900, margin:'24px auto'}}>
      <div className="card">
        <h3>People</h3>
        <input className="input" placeholder="Search people" value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      {users.map(u=>(
        <div key={u._id} className="card" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <img className="dp" src={(u.dp? (import.meta.env.VITE_API_URL || 'http://localhost:5000') + u.dp : 'https://via.placeholder.com/52')} />
            <div>
              <Link to={'/profile/'+u._id} className="huge" style={{fontSize:15}}>{u.name}</Link>
              <div className="meta">{u.email}</div>
            </div>
          </div>
          <div>
            <button className="btn small" onClick={()=>toggle(u._id)}>Follow / Unfollow</button>
          </div>
        </div>
      ))}
    </div>
  );
}