// @flow
import React from 'react';
import "./videoplayer.scss";
const md5 = require('md5');
export interface VideoProps {
    poster: string;
    src: string;
    boundaryColor?:string;
    duration?:number;
    size?:number;
  }
export interface MediaElement{
    vid:HTMLMediaElement,
    myInterval:any
}
const VideoPlayer = (props:VideoProps) => {
    const id=md5(props.src);
    let y=0;
    let factor=0;
    let duration=0;
    let cas=id;
    let poster
    if(props.poster){
      poster=props.poster
    }else{
      poster=undefined
    }
    const checkAllVideoStatus=()=>{
      let videos:HTMLMediaElement[]=Array.from(document.getElementsByClassName("react-app-circular-vid")) as HTMLMediaElement[]
     
      for(const video of videos){
        if(video && video.paused == false){
          video.pause();
        }
      }
      let playStatus=Array.from(document.getElementsByClassName("fa-pause"))
      for(const playStat of playStatus){
        playStat.classList.remove('fa-pause');
        playStat.classList.add('fa-play');
      }

    }
    const play=() =>{
        let videos:MediaElement={
            vid:document.getElementById(cas) as HTMLMediaElement,
            myInterval:null

        }
      if (videos.vid) {
        let myInterval
        if (videos.vid.paused == true) {
          checkAllVideoStatus()
          videos.vid.play();
          document.getElementById(cas+"c")?.classList.add('fa-pause');
          document.getElementById(cas+"c")?.classList.remove('fa-play');
          duration=videos.vid.duration;
          //interval
          videos.myInterval=setInterval(function () {
            y=videos.vid.currentTime;
            if(y>=duration || videos.vid.paused){
              if(y>=duration){
                y=0;
                videos.vid.pause()
                document.getElementById(cas+"c")?.classList.remove('fa-pause');
                document.getElementById(cas+"c")?.classList.add('fa-play');
                videos.vid.currentTime =0
              }
              
              clearInterval(videos.myInterval)
            }else{
                let a:HTMLMediaElement=document.getElementById(cas+"h") as HTMLMediaElement
                a.setAttribute('style',`--p:${(y/duration)*100};--c:${props.boundaryColor||'#bfd8f3'};--b:15px;--w:100%`)
            }
            
          }, props?.duration || 10);
        } else {
            videos.vid.pause();
          document.getElementById(cas+"c")?.classList.remove('fa-pause');
          document.getElementById(cas+"c")?.classList.add('fa-play');
         
        }
      }else{
        console.log("error playing")
      }
      
    }
    return <div className='react-basic-vid-skill' style={{width:props.size || 600,height:props.size || 600}}>
    <div className="outer"  onClick={()=>{play()}}>
    <div className="circular-loader no-round" id={id+"h"} style={{}}>
      
    </div>
      <div className="inner">
        
        <div className="rc"  onClick={()=>{play()}}>
        <div className="playPause"  onClick={()=>{play()}} style={{}}>
          <i className='fa fa-play'  onClick={()=>{play()}} id={id + "c"}></i>
        </div>
          <video poster={poster} src={props.src} id={id}  className="videoCircle react-app-circular-vid" playsInline={true}>
            
          </video>
        </div>
      </div>
    </div>
 
  </div>;
  };
  
export default VideoPlayer;