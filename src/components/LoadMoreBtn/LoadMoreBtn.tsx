import { Box, Button } from "@mui/material";
import css from "./LoadMoreBtn.module.css";

type Props = {
  onLoadMore: () => void;
};

const LoadMoreBtn: React.FC<Props> = ({ onLoadMore }) => {
  return (
    <Box className={css.container}>
      <Button variant="contained" onClick={onLoadMore} className={css.btn}>
        Load more
      </Button>
    </Box>
  );
};

export default LoadMoreBtn;
