Reducers has some missing ations for  failedAddToReadingList, failedRemoveFromReadingList.
Testcases in reading-list.reducer.spec.ts
        - 'failedRemoveFromReadingList should undo book removal from the state' - has the two books A, B in the before each, but it is trying to delete/remove C, which inturn leads a failure action, so the result list will be A,B. As C is never added to the list.
The Books in the books-search is directly used as aync in UI for the changes.
