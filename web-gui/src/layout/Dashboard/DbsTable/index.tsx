import { Box, Typography} from "@mui/material";

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams
} from '@mui/x-data-grid';

import { ActionsComponent } from './ActionsComponent';
import { CheckboxMedium } from "./CheckboxComponent";
import { DbTypeComponent, MetricsConfigComponent, PasswordEncryptionComponent, SslModeComponent, StandbyConfigComponent } from './SelectComponents';
import { MultilineTextField, SimpleTextField } from "./TextFieldComponents";

const mockRows = [
  {
    id: 1,
    uniqueName: 'test',
    dbType: 'patroni',
    dbPort: 5433,
    dbName: 'diploma',
    dbUser: 'cybertec-admin',
    dbPassword: 'cybertec-admin',
    lastModified: new Date().toUTCString(),
    passwordEncryption: 'plain-text',
    helpers: true,
    sslMode: 'verify-ca',
    presetMetricsConf: 'exhaustive',
    standbyPresetConf: 'standard'
  },
  {
    id: 2,
    uniqueName: 'test2',
    dbType: 'pgpool',
    dbPort: 6214,
    dbName: 'cybertec-pgwatch2',
    dbUser: 'qwertyui12345',
    dbPassword: 'qwertyui12345',
    lastModified: new Date('2021-08-10T03:24:00').toUTCString(),
    passwordEncryption: 'aes-gcm-256',
    sslMode: 'verify-full',
    presetMetricsConf: 'superuser_no_python',
    standbyPresetConf: 'rds'
  }
];

export const DbsTable = () => {

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            type: 'number',
            width: 75
        },
        {
            field: "uniqueName",
            headerName: 'Unique name',
            type: "string",
            // renderCell: (params: GridRenderCellParams<string>) => (
            //     <SimpleTextField param={params.value} placeholder="Type unique name here" id={`unique-name-${params.row.id}`} type="text" />
            // ),
            width: 200,
            description: 'NB! Choose a good name as this shouldn\'t be changed later (cannot easily update InfluxDB data). Will be used as prefix during DB discovery mode',
        },
        {
            field: 'dbType',
            headerName: 'DB type',
            renderCell: (params: GridRenderCellParams<string>) => (
                <DbTypeComponent id={params.row.id} value={params.value} />
            ),
            width: 200,
            description: '! For \'pgbouncer\' insert the \'to be monitored\' pool name to \'dbname\' field or leave it empty to monitor all pools distinguished by the \'database\' tag. For \'discovery\' DB types one can also specify regex inclusion/exclusion patterns. For \'patroni\' host/port are not used as it\'s read from DCS (specify DCS info under \'Host config\')'
        },
        {
            field: 'dbHost',
            headerName: 'DB host',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} placeholder="Type host here" id={`db-host-${params.row.id}`} type="text" />
            ),
            width: 150
        },
        {
            field: 'dbPort',
            headerName: 'DB port',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} type="number" id={`db-port-${params.row.id}`} defaultValue="5432" />
            ),
            width: 150
        },
        {
            field: 'dbName',
            headerName: 'DB dbname',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} placeholder="Type DB name here" id={`db-name-${params.row.id}`} type="text" />
            ),
            width: 200,
            description: 'If left empty, all non-template DBs found from the cluster will be added to monitoring (if not already monitored), prefixed with the \'Unique name\'. For \'pgbouncer\' DB type insert the \'pool\' name. Not relevant for \'postgres-continuous-discovery\''
        },
        {
            field: 'dbNameInclPattern',
            headerName: 'DB name inclusion pattern',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} placeholder="Type DB name inclusion pattern here" id={`db-name-incl-patt-${params.row.id}`} type="text" />
            ),
            width: 200,
            description: 'POSIX regex input. Relevant only for \'discovery\' DB types'
        },
        {
            field: 'dbNameExclPattern',
            headerName: 'DB name exclusion pattern',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} placeholder="Type DB name exclusion pattern here" id={`db-name-excl-patt-${params.row.id}`} type="text" />
            ),
            width: 200,
            description: 'POSIX regex input. Relevant only for \'discovery\' DB types'
        },
        {
            field: 'dbUser',
            headerName: 'DB user',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} placeholder="Type DB user here" id={`db-user-${params.row.id}`} type="text" />
            ),
            width: 200,
            description: 'The login role for actual metrics fetching from the specified host'
        },
        {
            field: 'dbPassword',
            headerName: 'DB password',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} placeholder="Type DB password here" id={`db-password-${params.row.id}`} type="password" />
            ),
            width: 200,
            description: 'NB! By default password is stored in plain-text in the database'
        },
        {
            field: 'passwordEncryption',
            headerName: 'Password encryption',
            renderCell: (params: GridRenderCellParams<string>) => (
                <PasswordEncryptionComponent id={params.row.id} value={params.value} />
            ),
            width: 200,
            description: 'NB! To use, an identical cipher key(file) must be used to launch the Web UI and the Gatherer'
        },
        {
            field: 'helpers',
            headerName: 'Auto-create helpers?',
            width: 120,
            renderCell: (params: GridRenderCellParams<boolean>) => (
                <CheckboxMedium id={`helpers-check-${params.row.id}`} param={params.value!} />
            ),
            description: 'NB! If checked the gatherer will automatically try to create the metric fetching helpers (CPU load monitoring, stat_statements, etc) - requires SUPERUSER to succeed'
        },
        {
            field: 'sslMode',
            headerName: 'SSL Mode',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SslModeComponent id={params.row.id} value={params.value} />
            ),
            width: 150,
            description: 'libpq \'sslmode\' parameter. If \'require\' or \'verify-ca\' or \'verify-full\' then no metrics will be gathered if safe connection cannot be established'
        },
        {
            field: 'rootCa',
            headerName: 'Root CA',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} placeholder="Type root CA here" id={`root-ca-${params.row.id}`} type="text" />
            ),
            width: 150,
            description: 'Path to Root CA file on the gatherer. Relevant for sslmode-s \'verify-ca\' and \'verify-full\''
        },
        {
            field: 'clientCert',
            headerName: 'Client cert',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} placeholder="Type client cert here" id={`client-certificate-${params.row.id}`} type="text" />
            ),
            width: 200,
            description: 'Path to Client certificate. Relevant for \'sslmode=verify-full\''
        },
        {
            field: 'clientKey',
            headerName: 'Client key',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} placeholder="Type client key here" id={`client-key-${params.row.id}`} type="text" />
            ),
            width: 200,
            description: 'Path to Client key file. Relevant for \'sslmode=verify-full\''
        },
        {
            field: 'group',
            headerName: 'Group',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} defaultValue="default" placeholder="Type group here" id={`group-${params.row.id}`} type="text" />
            ),
            width: 120,
            description: 'Group name (e.g. \'prod\') for logical distinction of monitored databases. Can be used also to run multiple gatherers (sharding), one for each (or multiple) group(s). Required'
        },
        {
            field: 'presetMetricsConf',
            headerName: 'Preset metrics config',
            renderCell: (params: GridRenderCellParams<string>) => (
                <MetricsConfigComponent id={params.row.id} value={params.value} />
            ),
            width: 200,
            description: 'Preset config OR custom config needs to be specified'
        },
        {
            field: 'customMetricsConf',
            headerName: 'Custom metrics config',
            renderCell: (params: GridRenderCellParams<string>) => (
                <MultilineTextField param={params.value} placeholder="Type custom metris config here"
                    id={`custom-metrics-config-${params.row.id}`} type="text"
                />
            ),
            width: 175,
            description: '{"metric":interval_seconds,...}'
        },
        {
            field: 'standbyPresetConf',
            headerName: 'Standby preset config',
            renderCell: (params: GridRenderCellParams<string>) => (
                <StandbyConfigComponent id={params.row.id} value={params.value} />
            ),
            width: 200,
            description: 'Optional alternate preset config for standby state to reduce the amount of gathered data for example'
        },
        {
            field: 'customStandbyConf',
            headerName: 'Standby custom config',
            renderCell: (params: GridRenderCellParams<string>) => (
                <MultilineTextField param={params.value} placeholder="Type custom standby config here"
                    id={`custom-standby-config-${params.row.id}`} type="text"
                />
            ),
            width: 175,
            description: 'Optional: {"metric":interval_seconds,...}'
        },
        {
            field: 'hostConf',
            headerName: 'Host config',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} placeholder="Type host config here" id={`host-config-${params.row.id}`} type="text" />
            ),
            width: 190,
            description: 'Used for Patroni only currently. e.g.: {"dcs_type": "etcd|zookeeper|consul", "dcs_endpoints": ["http://127.0.0.1:2379/"], "namespace": "/service/", "scope": "batman"}'
        },
        {
            field: 'customTags',
            headerName: 'Custom tags',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} placeholder="Type custom tags here" id={`custom-tags-${params.row.id}`} type="text" />
            ),
            width: 190,
            description: 'User defined tags for extra meaning in InfluxDB e.g. {"env": "prod", "app": "xyz"}'
        },
        {
            field: 'statementTimeout',
            headerName: 'Statement timeout [seconds]',
            renderCell: (params: GridRenderCellParams<string>) => (
                <SimpleTextField param={params.value} id={`statement-timeout-${params.row.id}`} defaultValue="5" type="number" />
            ),
            width: 190,
            description: 'In seconds. Should stay low for critical DBs just in case. NB! For possibly long-running built-in bloat estimation metrics the timeout will be max(30min,$userInput)'
        },
        {
            field: 'masterMode',
            headerName: 'Master mode only?',
            width: 120,
            renderCell: (params: GridRenderCellParams<boolean>) => (
                <CheckboxMedium id={`master-mode-check-${params.row.id}`} param={params.value!} />
            ),
            description: 'Fetch metrics only if master / primary '
        },
        {
            field: 'lastModified',
            headerName: 'Last modified',
            width: 150,
            type: 'dateTime'
        },
        {
            field: 'actions',
            headerName: 'actions',
            type: 'actions',
            width: 160,
            renderCell: (params: GridRenderCellParams<string>) => (
                <ActionsComponent uniqueName={params.row.uniqueName} />
            )
        }
    ];

    const rows = mockRows; // TODO: get this data from the api

  return (
    <Box sx={{ height: 400 }} display="flex" flexDirection="column" gap={1}>
      <Typography variant="h5">
        Databases under monitoring
      </Typography>
      <DataGrid
        columns={columns}
        rows={rows}
        autoHeight
        pageSize={5}
      />
    </Box>
  );
};
