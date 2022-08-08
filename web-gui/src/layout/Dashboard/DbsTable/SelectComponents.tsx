import { useEffect, useState } from "react";
import { Box, FormControl, Link, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { dbTypeOptions, passwordEncryptionOptions, presetConfigsOptions, sslModeOptions } from "./SelectComponentsOptions";

type Params = {
  id: number,
  value?: string
}

/*
    DbType select component
*/

const DbTypeComponent = ({ id, value }: Params) => {
  const [dbType, setDbType] = useState("postgres");

  const handleChangeDbType = (event: SelectChangeEvent) => {
    setDbType(event.target.value as string);
  };

  useEffect(() => {
    if (value === undefined) {
      return;
    }
    setDbType(value);
  }, []);

  return (
    <Box sx={{ width: 200 }}>
      <FormControl fullWidth size="small">
        <Select
          id={`db-type-${id}`}
          value={dbType}
          onChange={handleChangeDbType}
        >
          {dbTypeOptions.map((option) => {
            return (
              <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

/*
    Password encryption select component
*/

const PasswordEncryptionComponent = ({ id, value }: Params) => {
  const [passType, setPassType] = useState("plain-text");

  const handleChangePassType = (event: SelectChangeEvent) => {
    setPassType(event.target.value as string);
  };

  useEffect(() => {
    if (value === undefined) {
      return;
    }
    setPassType(value);
  }, []);

  return (
    <Box sx={{ width: 200 }}>
      <FormControl fullWidth size="small">
        <Select
          id={`password-encryption-${id}`}
          value={passType}
          onChange={handleChangePassType}
        >
          {passwordEncryptionOptions.map((option) => {
            return (
              <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

/*
    SSL mode select component
*/

const SslModeComponent = ({ id, value }: Params) => {
  const [sslMode, setSslMode] = useState("disable");

  const handleChangeSslMode = (event: SelectChangeEvent) => {
    setSslMode(event.target.value as string);
  };

  useEffect(() => {
    if (value === undefined) {
      return;
    }
    setSslMode(value);
  }, []);

  return (
    <Box sx={{ width: 200 }}>
      <FormControl fullWidth size="small">
        <Select
          id={`ssl-mode-${id}`}
          value={sslMode}
          onChange={handleChangeSslMode}
        >
          {sslModeOptions.map((option) => {
            return (
              <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

/*
    Preset metrics config select component
*/

const MetricsConfigComponent = ({ id, value }: Params) => {
  const [presetConfig, setPresetConfig] = useState('');

  const handleChangeConfig = (event: SelectChangeEvent) => {
    setPresetConfig(event.target.value as string);
  };

  useEffect(() => {
    if (value === undefined) {
      return;
    }
    setPresetConfig(value);
  }, []);

  return (
    <Box sx={{ width: 200 }}>
      <FormControl fullWidth size="small" sx={{ marginTop: "5px", marginBottom: "5px", maxWidth: 180 }}>
        <Select
          id={`preset-metrics-config-${id}`}
          value={presetConfig}
          onChange={handleChangeConfig}
        >
          {presetConfigsOptions.map((option) => {
            return (
              <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
            );
          })}
        </Select>
        <Box sx={{ display: "inline" }}>
          <Link href="#" underline="hover" sx={{ marginRight: "10px" }}>
            show
          </Link>
          <Link onClick={() => {
            (document.getElementById(`custom-metrics-config-${id}`) as HTMLInputElement).value = presetConfig;
          }} href="#" underline="hover"
          >
            copy
          </Link>
        </Box>
      </FormControl>
    </Box>
  );
};

/*
    Standby preset config select component
*/

const StandbyConfigComponent = ({ id, value }: Params) => {
  const [presetConfig, setPresetConfig] = useState('');

  const handleChangeConfig = (event: SelectChangeEvent) => {
    setPresetConfig(event.target.value as string);
  };

  useEffect(() => {
    if (value === undefined) {
      return;
    }
    setPresetConfig(value);
  }, []);

  return (
    <Box sx={{ width: 200 }}>
      <FormControl fullWidth size="small" sx={{ marginTop: "5px", marginBottom: "5px", maxWidth: 180 }}>
        <Select
          id={`standby-preset-config-${id}`}
          value={presetConfig}
          onChange={handleChangeConfig}
        >
          {presetConfigsOptions.map((option) => {
            return (
              <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
            );
          })}
        </Select>
        <Box sx={{ display: "inline" }}>
          <Link href="#" underline="hover" sx={{ marginRight: "10px" }}>
            show
          </Link>
          <Link onClick={() => {
            (document.getElementById(`custom-standby-config-${id}`) as HTMLInputElement).value = presetConfig;
          }} href="#" underline="hover"
          >
            copy
          </Link>
        </Box>
      </FormControl>
    </Box>
  );
};

export { DbTypeComponent, PasswordEncryptionComponent, SslModeComponent, MetricsConfigComponent, StandbyConfigComponent };
