import { ImageListItem } from "@mui/material";
import css from "./ImageCard.module.css";
import { forwardRef, Ref } from "react";
import { ImageDataType } from "../../types/Images.types";

type Props = {
  image: ImageDataType;
  onModalOpen: (image: ImageDataType) => void;
};

const ImageCard = forwardRef<HTMLDivElement, Props>(
  ({ image, onModalOpen }, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <ImageListItem className={css.card}>
          <img
            src={image.urls.small}
            alt={image.alt_description}
            className={css.img}
            onClick={() => onModalOpen(image)}
          />
        </ImageListItem>
      </div>
    );
  }
);

ImageCard.displayName = "ImageCard";

export default ImageCard;
