import { Controller } from '@nestjs/common';

import { TimeBlockService } from './time-block.service';

@Controller('user/time-block')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}
}
