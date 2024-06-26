#!/bin/sh

# Export environment variables with default values
export USER=${DATA_SOURCE_USER:-postgres}
export PASSWORD=${DATA_SOURCE_PASS:-postgres}
export NAME=${DATA_SOURCE_URI:-localhost}
export CLUSTERNAME=${DATA_SOURCE_CLUSTER:-localhost}
export CUSTOMER=${PG_EXPORTER_CONSTANT_LABEL_CUSTOMER:-customer}
export CLUSTER_NAME=${PG_EXPORTER_CONSTANT_LABEL_CLUSTER_NAME:-cluster_name}
export SUPPORT_PLAN=${PG_EXPORTER_CONSTANT_LABEL_SUPPORT_PLAN:-support_plan}

# Use envsubst to substitute the variables in the template
envsubst < /pgwatch2/config/scalefield.template > /pgwatch2/config/scalefield.yaml

/pgwatch2/metrics/00_helpers/rollout_helper.py --mode single-db --host "$CLUSTERNAME" --dbname postgres --user "$USER" --password "$PASSWORD" --monitoring-user "$USER" --confirm --metrics-path /pgwatch2/metrics/00_helpers/ --helpers get_load_average,get_psutil_cpu,get_psutil_disk_io_total,get_psutil_disk,get_psutil_mem --excluded-helpers ""

exec /pgwatch2/pgwatch2 -c /pgwatch2/config/scalefield.yaml --adhoc-create-helpers=true --prometheus-async-mode=true --prometheus-port=9189 --datastore=prometheus
