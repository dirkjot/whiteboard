datestamp=$(date | tr -s ' \t\n' '_')
npx testcafe --debug-mode chrome main.ts -s screenshots -S 2>&1  | tee run-${datestamp}.log
