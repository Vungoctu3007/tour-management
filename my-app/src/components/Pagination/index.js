import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationComponent({ count, page, onChange, variant="outlined", color,shape="rounded" }) {
  return (
    <div className="d-flex justify-content-center">
      <Stack spacing={2}>
        <Pagination
          count={count}
          page={page}
          onChange={onChange}
          variant={variant}
          color={color}
          sx={{
            "& .MuiPaginationItem-root": {
              fontSize: "1.5rem", 
              padding: "20px", 
              minWidth: "48px", 
              minHeight: "48px", 
            },
            "& .MuiPaginationItem-icon": {
              fontSize: "2rem",
            },
          }}
        />
      </Stack>
    </div>
  );
}

export default PaginationComponent;
