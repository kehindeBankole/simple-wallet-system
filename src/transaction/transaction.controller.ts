import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { confirmTransactionDTO } from './dto/ConfirmTransaction.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/auth/entity/user.entity';

@Controller('transaction')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('confirm-transaction')
  async confirmTransaction(
    @Body() ref: confirmTransactionDTO,
    @GetUser() user: UserEntity,
  ) {
    const data = await this.transactionService.confirmTransaction(ref, user);

    return data;
  }
}
