import React from 'react'
import './ProfileManager.css'
import AdminDataList from './sub_part/AdminDataList';
import OwnerManager from './sub_part/OwnerManager.js'


function ProfileManager({admin_email}) {
  return (
    <div className='ProfileManager'>
      <OwnerManager admin_email={admin_email}/>
      <AdminDataList/>
    
    </div>
  )
}

export default ProfileManager;
