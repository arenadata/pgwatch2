import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

type Params = {
  id: string,
  param: string | undefined,
  placeholder?: string,
  defaultValue?: string,
  type: "text" | "number" | "password"
}

export const SimpleTextField = ({ id, param, placeholder, defaultValue, type }: Params) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (param === undefined && defaultValue) {
      return;
    }
    setValue(param);
  }, []);

  return (
    <Box>
      <TextField onChange={(e) => setValue(e.target.value)} value={value} type={type}
        placeholder={placeholder} id={id} variant="standard"
      />
    </Box>
  );
};

export const MultilineTextField = ({ id, param, placeholder, defaultValue, type }: Params) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (param === undefined && defaultValue) {
      return;
    }
    setValue(param);
  }, []);

  return (
    <Box>
      <TextField onChange={(e) => setValue(e.target.value)} value={value} type={type}
        placeholder={placeholder} id={id} variant="standard" multiline maxRows={5}
      />
    </Box>
  );
};
