import { Module } from '@nestjs/common';
import {EnvConfigModule} from "@config/enviroments/envConfigModule";
import { ConfigDatabaseModule } from '@config/typeOrm';

@Module({
  imports: [
    EnvConfigModule,
    ConfigDatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
