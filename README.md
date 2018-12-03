# BulkEdit branch of pivotal-legacy/whiteboard

Whiteboard is the app that Pivotal uses to run standup.  It is a Ruby
app that is not actively maintained any more, and it lacks an API because
we never needed one.

See the original README at [README_MASTER.md](./README_MASTER.md)

## Adding a message to many/all boards at once
The `bulkedit` branch is a simple and slow [testcafe](https://devexpress.github.io/testcafe) application to enter a message 
under helps in all the whiteboards specified.  

All configuration is done in the `main.ts` file, specifically in:
- `boards` a list of all names of boards to modify
- `announcement` a structure with the announcement to add

Please run as follows:
```bash
git checkout bulkedit
cd testcafe
npx testcafe firefox main.ts
```
(or use `./run.sh` in the testcafe dir)

The script will pause at every whiteboard to make sure you agree with what it is about to do.
