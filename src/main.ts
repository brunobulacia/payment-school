import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'payment_queue',
      queueOptions: {
        durable: true,
      },
    }
  });

  await app.startAllMicroservices();
  Logger.log('Microservice is listening', 'Bootstrap');
  
  await app.listen(port, () => {
    Logger.log(`Server is running on port ${port}`, 'Bootstrap');
  });
}
bootstrap();
