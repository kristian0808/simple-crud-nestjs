import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'sapiens',
        database: 'crud_DB',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
    }), UserModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// DAY 1.
// Te behet setup nestjs. v
// Instaloni postgres ne kompjuter me ane te dockerit. v
// Integroni typeorm ne projekti. v
// Ndertoni tabelen user me te dhenat(Tabela duhet te krijohet me fajl migrimi)
// id
// firstname
// lastname
// birthday
// email(unik)
// username
// password(bcrypt)
// created_at
// deleted_at
// Ndertoni nje entitet per tabelen user v
// Ndertoni CRUD per tabelen User(Create, Read, Update, Delete).
// Ndertoni nje endpoint te ri per te bere softdelete te userit.
