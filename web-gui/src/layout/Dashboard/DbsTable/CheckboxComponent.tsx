import { useEffect, useState } from "react";
import { Box, Checkbox } from "@mui/material";

type Params = {
    id: string,
    param: boolean
}

export const CheckboxMedium = ({ id, param }: Params) => {
  const [value, setValue] = useState(false);

    useEffect(() => {
      if (param) {
        setValue(param);
      }
    });

    return (
      <Box>
        <Checkbox onChange={() => setValue(!value)} id={id} checked={value} size="medium" sx={{ marginLeft: "70%" }} />
      </Box>
    );
};
