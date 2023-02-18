#!/bin/bash
set -m
export VAULT_DEV_ROOT_TOKEN_ID="hvs.PXw9m6Jo6hnlpS5pG0efZht4"
export VAULT_TOKEN_CUSTOM="A9q+N/0n5GcRYEhMsGJ0S+1BSPx2ErRTVMOgDmxT+FM="
vault server -config=/vault/config/vault.hcl &
sleep 20
/setup.bash
fg %1