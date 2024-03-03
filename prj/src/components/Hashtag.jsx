import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Client from '../services/api'


const Hashtag = ({ user }) => {
  const [hashtags, setHashtags] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    const fetchHashtags = async () => {
      try {
        const response = await Client.get('/post')
        setHashtags(response.data)
      } catch (error) {
        console.error('Error fetching hashtags:', error)
      }
    }

    fetchHashtags()
  }, [])

  const getRandomHashtags = (count) => {
    const shuffled = hashtags.sort(() => 0.2 - Math.random())
    return shuffled.slice(1, count)
  }

  const handleClick = (post) => {
    setSelectedPost(post)
  }

  return user ? (
    <div>
      <h1>Hashtags</h1>
      <span>
        {getRandomHashtags(2).map((post) => (
          <div key={post._id} onClick={() => handleClick(post)}>
            {post.hashtag.map((tag, index) => (
              <span key={index} className="Hashtags">
                #{tag} <br />
              </span>
            ))}
          </div>
        ))}
      </span>

      {selectedPost && (
        <div>
          <h2>Selected Post</h2>
          <div>
            {console.log(selectedPost.image)}
            <img src={selectedPost.image} alt="Post Image" />
            <p>Text: {selectedPost.text}</p>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div></div>
  )
}

export default Hashtag
