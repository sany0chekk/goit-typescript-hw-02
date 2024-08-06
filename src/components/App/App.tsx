import css from "./App.module.css";

import { useState, useEffect } from "react";
import { searchImages } from "../../images-api";

import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ImageDataType, PhotoResponse } from "../../types/Images.types";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [images, setImages] = useState<ImageDataType[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageDataType | null>(
    null
  );
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async (): Promise<void> => {
      if (!searchQuery) return;
      try {
        setIsLoad(true);
        const photos = await searchImages(searchQuery, page);
        if (page === 1) {
          setImages(photos.results);
        } else {
          setImages((prevImages) => [...prevImages, ...photos.results]);
        }
        setTotalPages(photos.total_pages);
        if (photos.total <= 0) {
          setError(true);
        } else {
          setError(false);
        }
      } catch (error: unknown) {
        setError(true);
      } finally {
        setIsLoad(false);
      }
    };
    fetchImages();
  }, [searchQuery, page]);

  const handleSubmit = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (image: ImageDataType): void => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className={css.container}>
        <SearchBar onSubmit={handleSubmit} />
        {error && <ErrorMessage />}
        {images.length > 0 && (
          <ImageGallery images={images} onModalOpen={handleOpenModal} />
        )}
        {images.length > 0 && page < totalPages && !isLoad && (
          <LoadMoreBtn onLoadMore={onLoadMore} />
        )}
        {isLoad && <Loader />}
      </div>

      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      />
    </>
  );
};

export default App;
