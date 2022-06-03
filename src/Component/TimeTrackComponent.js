import React, {useEffect, useState} from 'react';
import data from "../data.json";
import TimeTrackActivityCard from "./TimeTrackActivityCard";
import userImg from "../images/image-jeremy.png";
const TimeTrackComponent = () => {

    const [selectedDateType, setSelectedDateType] = useState("Daily");
    const [activityList,setActivityList] = useState([]);

    useEffect(()=>{
        let timeTrackInfoList = [];
        for(let i=0 ; i < data.length; i++){
            const activityInfo = {
                title: data[i].title,
                CurrentHrs: data[i]["timeframes"][selectedDateType.toLowerCase()]["current"],
                DayType: selectedDateType === 'Daily' ? "Yesterday" : selectedDateType === "Weekly" ? "Last Week" : "Last Month",
                PreviousHrs: data[i]["timeframes"]["daily"]["previous"]
            };
            timeTrackInfoList.push(activityInfo);
        }
        setActivityList(timeTrackInfoList);

    },[selectedDateType])

    return (
        <div className="time-track-component-main-container">
            <div className="time-track-component--profile-card">
                <div className="time-track-component--profile-user-info">
                    <div className="time-track-component--profile-user-img">
                        <img src={userImg} alt={'Jeremy Robson'}/>
                    </div>
                    <div className="time-track-component--profile-user-name">
                        <span>Report for</span>
                        <label>Jeremy Robson</label>
                    </div>
                </div>
                <div className="time-track-component--profile-data-type-list">
                    {
                        ['Daily','Weekly','Monthly'].map((dataType,dataIndex)=>
                            <button className={dataType === selectedDateType ? "button active": "button"} onClick={()=>{setSelectedDateType(dataType)}}>
                                {dataType}
                            </button>
                        )
                    }
                </div>
            </div>
            <div className="time-track-component--activity-card-list">
                {
                    activityList.map((info,index)=>
                        <TimeTrackActivityCard CardInfo={info} />
                    )
                }
            </div>
        </div>
    );
};

export default TimeTrackComponent;