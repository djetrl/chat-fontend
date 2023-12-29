import { useEffect, useState, useRef } from 'react';
import { convertCurrentTime } from '../../utils/helpers';
import './Video.scss';
const Video = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoElem = useRef(null);
  const toggleModal = (e) => {
    if (!modal) {
      videoElem.current.pause();
      videoElem.current.currentTime = 0;
      setModal(true)
    } else {
      if (e.target.localName !== 'video') {
        setModal(false)
        videoElem.current.play();
      }
    }
  }
  const onHoverVideo = () => {
    if (!isPlaying) {
      setIsPlaying(true)
      videoElem.current.play();
    } else {
      setIsPlaying(false)
      videoElem.current.pause();
      videoElem.current.currentTime = 0;
    }
  }
  useEffect(() => {
    videoElem.current.volume = '0.1';
    videoElem.current.addEventListener('ended', () => {
      setCurrentTime(0);
    }, false)
    videoElem.current.addEventListener('timeupdate', () => {
      setCurrentTime(videoElem.current && videoElem.current.currentTime);
    })
  }, [])

  return (
    <>
      <div className='video'>
        <p className='video-duration'>{convertCurrentTime(currentTime)}</p>
        <video data-testid="video" width={'100%'} ref={videoElem} height="100%" loop muted
          onClick={toggleModal}
          onMouseEnter={onHoverVideo}
          onMouseLeave={onHoverVideo}>
          <source src={data.url} type={data.ext} />
          <source src={data.url} type="video/mov" />
          <source src={data.url} type="video/webm" />
          Тег video не поддерживается вашим браузером.
        </video>
      </div>

      {modal && (
        <div className="modal-video" onClick={toggleModal}>
          <video width={'100%'} height="100%" controls >
            <source src={data.url} type={data.ext} />
            <source src={data.url} type="video/mov" />
            <source src={data.url} type="video/webm" />
            Тег video не поддерживается вашим браузером.
          </video>
        </div>
      )}
    </>
  )
}

export default Video;