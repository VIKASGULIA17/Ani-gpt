import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extend, setExtend] = useState(false);
    const { onSent, prevPrompt, setRecentPrompt } = useContext(Context); // Default to empty array
    return (
        <div className='sidebar inline-flex w-auto flex-col justify-between bg-slate-100 h-screen py-6 px-4 text-lg font-medium'>
            <div className='top'>
                <img onClick={() => setExtend(prev => !prev)} src={assets.menu_icon} className='menu w-5 block cursor-pointer' alt="" />
                <div className='new-chat mt-10 inline-flex items-center gap-3 px-4 py-3 bg-slate-200 text-sm text-gray-600 cursor-pointer rounded-[50px]'>
                    <img src={assets.plus_icon} className='w-5' alt="" />
                    {extend ? <p>New Chat</p> : null}
                </div>

                {extend ? (
                    <div className="recent flex flex-col">
                        <p className="recent-title mt-8 mb-5">Recent</p>
                        {prevPrompt.map((item, index) => (
                            <div
                                key={index} 
                                className="recent-entry flex items-start gap-3 p-3 pr-10 rounded-[50px] text-[#282828] cursor-pointer hover:bg-slate-200"
                            >
                                <img src={assets.message_icon} className="w-5" alt="" />
                                <p>{item}...</p> 
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className='bottom flex flex-col'>
                <div className="bottom-item recent-entry flex items-start gap-3 p-3 pr-10 rounded-[50px] text-[#282828] cursor-pointer hover:bg-slate-200">
                    <img src={assets.question_icon} className='w-5' alt="" />
                    {extend ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry flex items-start gap-3 p-3 pr-10 rounded-[50px] text-[#282828] cursor-pointer hover:bg-slate-200">
                    <img src={assets.history_icon} className='w-5' alt="" />
                    {extend ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry flex items-start gap-3 p-3 pr-10 rounded-[50px] text-[#282828] cursor-pointer hover:bg-slate-200">
                    <img src={assets.setting_icon} className='w-5' alt="" />
                    {extend ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
