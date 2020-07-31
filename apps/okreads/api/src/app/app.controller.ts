import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { ReadingListItem } from '@tmo/shared/models';

@Controller()
export class AppController {
  @Get('/hello')
  getRoot() {
    return 'It Worked!';
  }

  @Put('/reading-list/:id/finished')
  updateReading(@Param('id') id, @Body('item') readingItem: ReadingListItem) {
    const date = new Date();
    readingItem.finishedDate =date.toISOString();
    readingItem.finished = true;
    return readingItem;
  }
}
