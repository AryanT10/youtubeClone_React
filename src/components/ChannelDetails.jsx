import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/FetchFromAPI';

const ChannelDetails = () => {
  const [channelDetails, setChannelDetails] = useState(null);
  const [videos, setVideos] = useState([])
  const { id } = useParams();
  console.log(channelDetails, Videos);

  useEffect(() => {
    fetchFromAPI(`channels?part="snippet&id=${id}`)
      .then((data) => setChannelDetails(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));

  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(285deg, rgba(2,0,36,1) 0%, rgba(0,255,229,0.9094231442577031) 100%)',
          zindex: 10, height: '300px'
        }} />
        <ChannelCard channelDetail={channelDetails} marginTop='-110px' />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{mr:{sm:'100px'}}} /> 
          <Videos videos={videos}/>
      </Box>
    </Box>
  )
}

export default ChannelDetails 
