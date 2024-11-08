// src/components/TrackForm.jsx

import { useState } from 'react';

const TrackForm = (props) => {
  // formData state to control the form
  const [formData, setFormData] = useState({
    title: '',
    album: '',
    artist: '',
    release_year: '',
    genre: '',
    cover_art_url: '',
  });

  // handleChange function to update formData state
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    props.handleAddTrack(formData);
    setFormData({
      title: '',
      album: '',
      artist: '',
      release_year: '',
      genre: '',
      cover_art_url: '',
    });
  };

  return (
    <div>
      <form>
        <label htmlFor="title"> Title </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="album"> Album </label>
        <input
          id="album"
          name="album"
          value={formData.album}
          onChange={handleChange}
        />
        <label htmlFor="artist"> Artist </label>
        <input
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
        />
        <label htmlFor="release_year"> Release_year </label>
        <input
          id="release_year"
          name="release_year"
          value={formData.release_year}
          onChange={handleChange}
        />
        <label htmlFor="genre"> Genre </label>
        <input
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
        <label htmlFor="cover_art_url"> Cover_art_url </label>
        <input
          id="cover_art_url"
          name="cover_art_url"
          value={formData.cover_art_url}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmitForm}>Add New Track</button>
      </form>
    </div>
  );
};

export default TrackForm;
