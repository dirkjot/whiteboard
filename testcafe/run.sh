npx testcafe firefox main.ts -s screenshots -S 2>&1  | tee run-`date --iso-8601=seconds`.log
