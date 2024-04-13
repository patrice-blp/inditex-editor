import { Alert } from "@mui/material";

type Props = {
  error?: any;
  message?: string;
};

const AlertError = ({ error, message }: Props) => {
  return (
    <>
      {Boolean(error) && (
        <Alert variant="outlined" severity="error" sx={{ marginBottom: 2 }}>
          {message || error?.message || "Ha ocurrido un error"}
        </Alert>
      )}
    </>
  );
};

export default AlertError;
