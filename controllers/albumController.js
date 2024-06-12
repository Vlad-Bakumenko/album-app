import Album from "../Model/Album.js";
import createError from "http-errors";

export const getAlbums = async (req, res, next) => {
  const albums = await Album.find();
  res.status(200).json(albums);
};

export const addAlbum = async (req, res, next) => {
  try {
    let newAlbum = new Album(req.body);
    if (req.file) newAlbum.jacket = req.file.filename;
    await newAlbum.save();
    res.status(200).json(newAlbum);
  } catch (error) {
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  const id = req.params.id;
  try {
    const toDelete = await Album.findByIdAndDelete(id);
    res.status(200).json(toDelete);
  } catch (error) {
    next(error);
  }
};

export const changeImage = async (req, res, next) => {
  const id = req.params.id;
  try {
    let toUpdate = await Album.findByIdAndUpdate(
      id,
      { jacket: req.file.filename },
      { new: true }
    );

    res.status(200).json(toUpdate);
  } catch (error) {
    next(error);
  }
};
