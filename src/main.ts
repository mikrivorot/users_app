import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ApplicationLogger } from './logger';
import { metricsMiddleware, register } from './middleware/metrics.middleware';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new ApplicationLogger() });
  // const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Users management")
    .setDescription("Users management application")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  app.use(metricsMiddleware);

  // Expose /metrics endpoint for Prometheus scraping
  app.getHttpAdapter().get('/metrics', async (_, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(8080);
}
bootstrap();
