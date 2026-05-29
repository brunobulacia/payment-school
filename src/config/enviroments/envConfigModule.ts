import { ConfigModule } from "@nestjs/config";
import { EnvConfig } from "./envConfig";
import { Module } from "@nestjs/common";


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      isGlobal: true,
    })
  ]
})
export class EnvConfigModule {}

