import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  // ReadingListBook,
  searchBooks,
  removeFromReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { Observable, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  books$ = this.store.select(getAllBooks);  
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.books$ = this.store.select(getAllBooks);
    this.onChanges();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  onChanges(): void {
    this.searchForm.valueChanges
    .pipe(debounce(() => interval(500)))
    .subscribe(val => {
      console.log(val);
      this.store.dispatch(searchBooks({ term: val.term }));
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  removeFromReadingListById(id: string) {
    const item = { bookId : id } as ReadingListItem;
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackBar('Successfully removed', 'OK');
  }
  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    this.openSnackBar('Successfully Added', 'OK')
  }

  removeFromReadingList(item : ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.store.dispatch(searchBooks({ term: 'javascript' }));
  }

}
