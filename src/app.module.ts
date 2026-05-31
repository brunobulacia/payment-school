import { FatherModule } from './feature/father/father.module';
import { Module } from '@nestjs/common';
import {EnvConfigModule} from "@config/enviroments/envConfigModule";
import { ConfigDatabaseModule } from '@config/typeOrm';

@Module({
  imports: [
        FatherModule, 
        EnvConfigModule,
        ConfigDatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
