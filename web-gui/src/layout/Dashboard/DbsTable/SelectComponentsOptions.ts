const dbTypeOptions = [
    {
        id: 1,
        label: 'postgres'
    },
    {
        id: 2,
        label: 'postgres-continuous-discovery'
    },
    {
        id: 3,
        label: 'pgbouncer'
    },
    {
        id: 4,
        label: 'pgpool'
    },
    {
        id: 5,
        label: 'patroni'
    },
    {
        id: 6,
        label: 'patroni-continuous-discovery'
    },
    {
        id: 7,
        label: 'patroni-namespace-discovery'
    },
];

const passwordEncryptionOptions = [
    {
        id: 1,
        label: 'plain-text'
    },
    {
        id: 2,
        label: 'aes-gcm-256'
    }
];

const sslModeOptions = [
    {
        id: 1,
        label: 'disable'
    },
    {
        id: 2,
        label: 'require'
    },
    {
        id: 3,
        label: 'verify-ca'
    },
    {
        id: 4,
        label: 'verify-full'
    }
];

const presetConfigsOptions = [
    {
        id: 1,
        label: 'aurora'
    },
    {
        id: 2,
        label: 'azure'
    },
    {
        id: 3,
        label: 'basic'
    },
    {
        id: 4,
        label: 'exhaustive'
    },
    {
        id: 5,
        label: 'full'
    },
    {
        id: 6,
        label: 'full_influx'
    },
    {
        id: 7,
        label: 'gce'
    },
    {
        id: 8,
        label: 'minimal'
    },
    {
        id: 9,
        label: 'pgbouncer'
    },
    {
        id: 10,
        label: 'pgpool'
    },
    {
        id: 11,
        label: 'prometheus'
    },
    {
        id: 12,
        label: 'prometheus-async'
    },
    {
        id: 13,
        label: 'rds'
    },
    {
        id: 14,
        label: 'standard'
    },
    {
        id: 15,
        label: 'superuser_no_python'
    },
    {
        id: 16,
        label: 'unprivileged'
    }
];

export { dbTypeOptions, passwordEncryptionOptions, sslModeOptions, presetConfigsOptions };
